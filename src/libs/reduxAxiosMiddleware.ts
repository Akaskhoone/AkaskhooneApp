import Reactotron from 'reactotron-react-native';

const defaultOptions = {
  returnRejectedPromiseOnError: false,

  defaultClientName: 'default',

  isAxiosRequest: action => action.payload && action.payload.request,

  getRequestConfig: action => action.payload.request,

  getClientName: action => action.payload.client,

  getRequestOptions: action => action.payload.options,

  onSuccess: ({ action, next, response }, options) => {
    const nextAction = {
      ...action,
      type: getActionTypes(action, options)[1],
      payload: response,
      meta: {
        previousAction: action
      }
    };
    next(nextAction);
    return nextAction;
  },

  onError: ({ action, next, error }, options) => {
    let errorObject;
    if (!error.response) {
      errorObject = {
        data: error.message,
        status: 0
      };
      Reactotron.log('HTTP Failure in Axios', error);
    } else {
      errorObject = error;
    }
    const nextAction = {
      ...action,
      type: getActionTypes(action, options)[2],
      error: errorObject,
      meta: {
        previousAction: action
      }
    };

    next(nextAction);
    return nextAction;
  },

  onComplete: () => {
    /* 
  // Fill in case you need this
  // (onComplete will invoke after dispatching action
  // so you can't edit action being dispatched in any way)
  */
  }
};

const SUCCESS_SUFFIX = '_SUCCESS';
const ERROR_SUFFIX = '_FAIL';

const getActionTypes = (
  action,
  { errorSuffix = ERROR_SUFFIX, successSuffix = SUCCESS_SUFFIX } = {}
) => {
  let types;
  if (typeof action.type !== 'undefined') {
    const { type } = action;
    types = [type, `${type}${successSuffix}`, `${type}${errorSuffix}`];
  } else if (typeof action.types !== 'undefined') {
    types = action.types;
  } else {
    throw new Error(
      'Action which matched axios middleware needs to have "type" or "types" key which is not null'
    );
  }
  return types;
};

function addInterceptor(target, candidate, injectedParameters) {
  if (!candidate) return;
  const successInterceptor = typeof candidate === 'function' ? candidate : candidate.success;
  const errorInterceptor = candidate && candidate.error;
  target.use(
    successInterceptor && successInterceptor.bind(null, injectedParameters),
    errorInterceptor && errorInterceptor.bind(null, injectedParameters)
  );
}

function bindInterceptors(
  client,
  injectedParameters,
  middlewareInterceptors: any = {},
  clientInterceptors: any = {}
) {
  [...(middlewareInterceptors.request || []), ...(clientInterceptors.request || [])].forEach(
    interceptor => {
      addInterceptor(client.interceptors.request, interceptor, injectedParameters);
    }
  );
  [...(middlewareInterceptors.response || []), ...(clientInterceptors.response || [])].forEach(
    interceptor => {
      addInterceptor(client.interceptors.response, interceptor, injectedParameters);
    }
  );
}

function getSourceAction(config) {
  return config.reduxSourceAction;
}

export const multiClientMiddleware = (clients, customMiddlewareOptions) => {
  const middlewareOptions = { ...defaultOptions, ...customMiddlewareOptions };
  const setupedClients = {};

  return ({ getState, dispatch }) => next => action => {
    if (!middlewareOptions.isAxiosRequest(action)) {
      return next(action);
    }

    const clientName =
      middlewareOptions.getClientName(action) || middlewareOptions.defaultClientName;

    if (!clients[clientName]) {
      throw new Error(`Client with name "${clientName}" has not been defined in middleware`);
    }

    if (!setupedClients[clientName]) {
      const clientOptions = { ...middlewareOptions, ...clients[clientName].options };

      if (clientOptions.interceptors) {
        const middlewareInterceptors = middlewareOptions.interceptors;
        const clientInterceptors =
          clients[clientName].options && clients[clientName].options.interceptors;
        const injectToInterceptor = { getState, dispatch, getSourceAction };
        bindInterceptors(
          clients[clientName].client,
          injectToInterceptor,
          middlewareInterceptors,
          clientInterceptors
        );
      }

      setupedClients[clientName] = {
        client: clients[clientName].client,
        options: clientOptions
      };
    }

    const setupedClient = setupedClients[clientName];
    const actionOptions = {
      ...setupedClient.options,
      ...setupedClient.options.getRequestOptions(action)
    };
    const [REQUEST] = getActionTypes(action, actionOptions);
    next({ ...action, type: REQUEST });

    const requestConfig = {
      ...actionOptions.getRequestConfig(action),
      reduxSourceAction: action
    };
    return setupedClient.client.request(requestConfig).then(
      response => {
        const newAction = actionOptions.onSuccess(
          { action, next, response, getState, dispatch },
          actionOptions
        );
        actionOptions.onComplete({ next, getState, dispatch, action: newAction }, actionOptions);
        return newAction;
      },
      error => {
        const newAction = actionOptions.onError(
          { action, next, error, getState, dispatch },
          actionOptions
        );
        actionOptions.onComplete({ next, getState, dispatch, action: newAction }, actionOptions);
        return actionOptions.returnRejectedPromiseOnError ? Promise.reject(newAction) : newAction;
      }
    );
  };
};

export default (client, customMiddlewareOptions, customClientOptions?) => {
  const middlewareOptions = { ...defaultOptions, ...customMiddlewareOptions };
  const options = customClientOptions || {};
  return multiClientMiddleware(
    { [middlewareOptions.defaultClientName]: { client, options } },
    middlewareOptions
  );
};
