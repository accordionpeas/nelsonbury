const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const destPath = path.resolve(__dirname, '../build/public');

if (!fs.existsSync(path.resolve(__dirname, '../build'))) {
  fs.mkdirSync(path.resolve(__dirname, '../build'));
}

if (!fs.existsSync(path.resolve(__dirname, '../build/public'))) {
  fs.mkdirSync(path.resolve(__dirname, '../build/public'));
}

const output = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/asset-manifest.json'), { encoding: 'utf-8' }));

const filenames = [
  'app.min.css',
  'index.js',
];

filenames.forEach(filename => {
  const file = fs.readFileSync(path.resolve(destPath, filename));
  const hash = crypto.createHash('md5').update(file).digest('hex');
  const hashedFilename = filename.replace(/\.([^.]+)$/, `.${hash}.$1`);
  fs.copyFileSync(path.resolve(destPath, filename), path.resolve(destPath, hashedFilename));
  output[filename] = hashedFilename;
});

fs.writeFileSync(path.resolve(__dirname, '../build/asset-manifest.json'), JSON.stringify(output, null, 2), { encoding: 'utf-8' });
