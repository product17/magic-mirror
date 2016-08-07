import { default as path } from 'path';
import { default as express } from 'express';
import { settings as config } from './settings.config';
import { default as compress } from 'compression';
import { default as morgan } from 'morgan';
import { default as methodOverride } from 'method-override';
import { default as helmet } from 'helmet';
import { default as bodyParser } from 'body-parser';
import { default as cookieParser } from 'cookie-parser';
import { general as logger } from '../../logger';

export default function (env) {
  const app = express();

  // Set the port from the config file
  app.set('port', config[env].port);

  // Passing the request url to environment locals
  app.use((req, res, next) => {
    res.locals.url = `${req.protocol}://${req.headers.host}${req.url}`;
    next();
  });

  // Should be placed before express.static
  app.use(compress({
    filter: function filter (req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9,
  }));

  // Set to show stack errors
  app.set('showStackError', true);

  // Set default views
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, '../../views'));

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));

    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // CookieParser should be above session
  app.use(cookieParser());

  // SET this up later
  // Express MongoDB session storage
  // app.use(session({
  //   saveUninitialized: false,
  //   resave: false,
  //   secret: config.sessionSecret,
  //   cookie: {
  //     secure: 'auto',
  //     maxAge: 2628000000,
  //   },
  //   // store: new MongoStore({
  //   //   url: config.app.db_path,
  //   // }),
  // }));

  // Use helmet to secure Express headers
  app.use(helmet());

  // Setting the static folder
  app.use('/public', express.static(path.join(__dirname, '../../../public')));

  // Include Routes here


  // Need to setup error module
  app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }

    // Log it
    logger.error(err.stack);

    // Error page
    res.status(500).render('error', {
      error: err.stack,
      url: req.originalUrl,
      status: 500,
    });

    return null;
  });

  // Assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).render('error', {
      url: req.originalUrl,
      error: 'Not Found',
      satus: 404,
    });
  });

  return app;
}
