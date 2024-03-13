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