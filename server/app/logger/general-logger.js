import { default as bunyan } from 'bunyan';
import { settings } from '../configs/lib/settings.config';

const configDetails = settings[process.env.NODE_ENV];

const logger = bunyan.createLogger({
  name: configDetails.app,
  streams: [
    {
      level: 'info',
      stream: configDetails.logging.info,
      period: '1d',
      count: 3,
    },
    {
      level: 'error',
      path: configDetails.logging.error,
      period: '1d',
      count: 3,
    },
  ],
});

export { logger as default };
