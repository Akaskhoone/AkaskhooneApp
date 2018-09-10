import env from '@utils/env.json';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({
  host: env.REACTOTRON_HOST,
  port: Number(env.REACTOTRON_PORT)
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

export default reactotron;
