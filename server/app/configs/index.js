'use strict';

import * as db from './database.config';

const config = {
  'development': {
    db
  }
};

console.log(config)

export default function (env) {
  return config[env];
}
