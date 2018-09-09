import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import env from '@utils/env';

const reactotron = Reactotron.configure({
  host: env.REACTOTRON_HOST,
  port: env.REACTOTRON_PORT
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

export default reactotron;
