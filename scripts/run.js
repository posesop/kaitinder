/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const glob = require('glob');
const path = require('path');

const log = require('../app/lib/log');
const mongo = require('../app/services/mongo');

(async () => {
  log.info('Starting scripts..-');
  try {
    await mongo.connect();
    log.info('Connected to MONGODB');
    const files = glob(path.join(__dirname, 'src/*.js'), { sync: true });
    for (const file of files) {
      log.info(`Executing script ${file}...`);
      await require(path.resolve(file))();
    }
    log.info('End of script. MONGODB closed');
    process.exit(0);
  } catch (err) {
    log.error(`End of script. MONGODB  connection fails ${err}`);
    process.exit(1);
  }
})();
