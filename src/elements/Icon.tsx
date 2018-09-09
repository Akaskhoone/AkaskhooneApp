// Configuring icomoon for using custom fonticons
import icoMoonConfig from '@utils/icomoon/selection.json';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);
export default Icon;
