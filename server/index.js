import * as config from './app/configs';
import { default as http } from 'http';
import { default as chalk } from 'chalk';
// import {default as express} from 'express';

const app = config.expressConfig(process.env.NODE_ENV);

const server = http.createServer(app);

function handleError (error) {
  const bind = typeof port === 'string' ? `Pipe ${app.get('port')}` : `Port ${app.get('port')}`;

  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(chalk.red(`${bind} requires elevated privileges`));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(chalk.red(`${bind} is already in use`));
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function handleListening () {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(chalk.green(`Listening on ${bind}`));
}

server.listen(app.get('port'));
server.on('error', handleError);
server.on('listening', handleListening);
