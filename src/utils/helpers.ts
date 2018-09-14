import { normalize } from 'normalizr';
import Reactotron from 'reactotron-react-native';
import I18n from 'src/utils/i18n';
import { board, comment, notification, post, profile, tag } from 'src/utils/schemas';

const is400Or401 = res => {
  return (
    res &&
    res.error &&
    res.error.response &&
    (res.error.response.status === 400 || res.error.response.status === 401)
  );
};

const extractError = (res, errorName) => {
  const data = res.error.response.data && res.error.response.data.error;
  const error = data && data[errorName];
  return error;
};

export const extractErrors = (res, errorNames: string[]) => {
  Reactotron.log('Extracting errors:', errorNames, 'for:', res);
  let formHasError = false;
  if (is400Or401(res)) {
    Reactotron.log('Response is 400 || 401');
    const errors = errorNames.reduce((object, errorName) => {
      const error = extractError(res, errorName);
      formHasError = error ? true : formHasError;
      return {
        ...object,
        [errorName]: error
      };
    }, {});
    Reactotron.log('formHasError is:', formHasError);
    Reactotron.log('Errors is', errors);
    if (formHasError) return errors as any;
  }
  Reactotron.log('Unknown form error');
  return {
    RequestError: 'unknownError'
  };
};

export function generateSelector(childSelector, getChildState) {
  return Object.keys(childSelector).reduce((prev, next) => {
    return {
      ...prev,
      [next]: (state, ...props) => childSelector[next](getChildState(state), ...props)
    };
  }, {});
}

export function getReduxAxiosPreviousAction(action) {
  return action.meta && action.meta.previousAction;
}

export function applyNormalizeOnAction(action) {
  let normalizrSchema;
  const dataType = action.dataType;
  switch (dataType) {
    case 'posts':
      normalizrSchema = post;
      break;
    case 'profiles':
      normalizrSchema = profile;
      break;
    case 'borads':
      normalizrSchema = board;
      break;
    case 'tags':
      normalizrSchema = tag;
      break;
    case 'comments':
      normalizrSchema = comment;
      break;
    case 'notifications':
      normalizrSchema = notification;
      break;
    default:
      Reactotron.log('Data type is not supported');
      return action;
  }

  const responseBody = action.payload && action.payload.data;
  let data = responseBody && responseBody.data;

  const dataIsArray = data && Array.isArray(data);
  if (dataIsArray) {
    normalizrSchema = [normalizrSchema];
  } else {
    data = responseBody;
  }

  const normalizedData = normalize(data || [], normalizrSchema);
  const transformedAction = {
    ...action,
    payload: {
      ...action.payload,
      data: { ...responseBody, ...normalizedData }
    }
  };
  return transformedAction;
}

const dateParser = dateString => {
  // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
  let dateParam = dateString.split(/[\s-:\.\+]/);
  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
  dateParam = dateParam.map(d => parseInt(d, 10));
  return new Date(
    dateParam[0],
    dateParam[1],
    dateParam[2],
    dateParam[3],
    dateParam[4],
    dateParam[5],
    dateParam[6]
  );
};

const secondsInYear = 31536000;
const secondsInMonth = 2592000;
const secondsInWeek = 604800;
const secondsInDay = 86400;
const secondsInHour = 3600;
const secondsInMinutes = 60;
export const humanify = dateString => {
  const nowSeconds = new Date().getTime() / 1000;
  const date = dateParser(dateString);
  const dateSeconds = date.getTime() / 1000;
  const secondsElapsed = Math.floor(nowSeconds - dateSeconds);
  if (secondsElapsed > secondsInYear) {
    return date.getFullYear();
  }
  if (secondsElapsed > secondsInMonth) {
    const elapsedMonths = Math.floor(secondsElapsed / secondsInMonth);
    return I18n.t('timeAgo', { unit: I18n.t('month'), value: I18n.t(`${elapsedMonths}`) });
  }
  if (secondsElapsed > secondsInWeek) {
    const elapsedWeeks = Math.floor(secondsElapsed / secondsInWeek);
    return I18n.t('timeAgo', { unit: I18n.t('week'), value: I18n.t(`${elapsedWeeks}`) });
  }
  if (secondsElapsed > secondsInDay) {
    const elapsedDays = Math.floor(secondsElapsed / secondsInDay);
    return I18n.t('timeAgo', { unit: I18n.t('day'), value: I18n.t(`${elapsedDays}`) });
  }
  if (secondsElapsed > secondsInHour) {
    const elapsedHours = Math.floor(secondsElapsed / secondsInHour);
    return I18n.t('timeAgo', { unit: I18n.t('hour'), value: elapsedHours });
  }
  if (secondsElapsed > secondsInMinutes) {
    const elapsedMinutes = Math.floor(secondsElapsed / secondsInMinutes);
    return I18n.t('timeAgo', { unit: I18n.t('minute'), value: elapsedMinutes });
  }
  if (secondsElapsed > 0) {
    return I18n.t('timeAgo', { unit: I18n.t('second'), value: secondsElapsed });
  }
  return I18n.t('timeAgo', { unit: I18n.t('second'), value: 0 });
};
