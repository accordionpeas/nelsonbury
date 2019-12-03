const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const sourcePath = path.resolve(__dirname, '../app/public/assets');
const destPath = path.resolve(__dirname, '../build/public/assets');

if (!fs.existsSync(path.resolve(__dirname, '../build'))) {
  fs.mkdirSync(path.resolve(__dirname, '../build'));
}

if (!fs.existsSync(path.resolve(__dirname, '../build/public'))) {
  fs.mkdirSync(path.resolve(__dirname, '../build/public'));
}

if (!fs.existsSync(path.resolve(__dirname, '../build/public/assets'))) {
  fs.mkdirSync(path.resolve(__dirname, '../build/public/assets'));
}

const output = {};

const ignore = [
  'lavanderia-regular.otf',
];

fs.readdirSync(sourcePath).forEach(filename => {
  const shouldIgnore = !ignore.some(ignoreFilename => filename.includes(ignoreFilename));

  if (shouldIgnore) {
    const file = fs.readFileSync(path.resolve(sourcePath, filename));
    const hash = crypto.createHash('md5').update(file).digest('hex');
    const hashedFilename = filename.replace(/\.([^.]+)$/, `.${hash}.$1`);
    fs.copyFileSync(path.resolve(sourcePath, filename), path.resolve(destPath, hashedFilename));
    output[filename] = hashedFilename;
  } else {
    fs.copyFileSync(path.resolve(sourcePath, filename), path.resolve(destPath, filename));
    output[filename] = filename;
  }
});

fs.writeFileSync(path.resolve(__dirname, '../build/asset-manifest.json'), JSON.stringify(output, null, 2), { encoding: 'utf-8' });
