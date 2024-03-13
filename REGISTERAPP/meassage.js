const l10n = require('jm-ez-l10n');
const { join } = require('path');
const fs = require('fs');
const lang = process.env.TRANSLATE_LANG || 'en';
let path = join(__dirname, `/locales/translate.${lang}.json`);

if (!fs.existsSync(path)) {
  console.error(`Translate file not found: ${path}`);
  path = join(__dirname, '/locales/translate.en.json');
  console.dir(`Default translate used : ${path}`);
}

l10n.setTranslationsFile(lang, path);

module.exports = l10n;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./config/winston');
const l10n = require('./lang/l10n');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');
const { badJsonFormatErrorHandler } = require('./helper/error.handler');
// create express app
const app = express();

global.logger = logger;
global.translate = l10n.t;

app
  .disable('x-powered-by')
  .use(l10n.enableL10NExpress)
  .set('trust proxy', true)
  .use(bodyParser.json())
  .use(express.static('assets'))
  .use(cors())
  .use(helmet())
  .use(morgan('dev'))
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) //* api docs
  .use(badJsonFormatErrorHandler) // bad json format handler
  .use('/api', require('./routes'))
  .use(require('./defaultRoutes'));

module.exports = app;
