import { logger } from 'react-native-logs';

const log = logger.createLogger({
  severity: 'debug',
  transport: console.log,
});

export default log;