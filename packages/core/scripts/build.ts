import { execSync as exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const FILES_COPY_ROOT = ['LICENSE'];

const README_ROOT = ['README.md'];

const TYPES_ROOT = ['types.d.ts'];

// update the package.json file
async function updatePackageJson() {
  // Read the package.json file under the meta folder
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../meta/package.json')).toString());
  // update version number
  const version = packageJson.version; // like 0.0.1
  const newVersion = version.split('.');
  newVersion[2] = (parseInt(newVersion[2]) + 1).toString();
  packageJson.version = newVersion.join('.');
  // update meta package.json
  fs.writeFileSync(path.join(__dirname, '../meta/package.json'), JSON.stringify(packageJson, null, 2));

  // write the new package.json file to the dist folder
  fs.writeFileSync(path.join(__dirname, '../dist/package.json'), JSON.stringify(packageJson, null, 2));

  console.log('Updated package.json');
}

async function build() {
  console.log('Building core...');

  exec('npm run build', { stdio: 'inherit' });

  console.log('Copying files...');
  // Copy root files
  FILES_COPY_ROOT.forEach((file) => {
    exec(`cp ${path.join(__dirname, '../', file)} ${path.join(__dirname, '../dist')}`);
  });

  console.log('Copying types...');
  // Copy types
  TYPES_ROOT.forEach((file) => {
    exec(`cp ${path.join(__dirname, '../types/', file)} ${path.join(__dirname, '../dist', 'index.d.ts')}`);
  });

  // Copy package.json
  updatePackageJson();
  // Copy README
  README_ROOT.forEach((file) => {
    exec(`cp ${path.join(__dirname, '../../../', file)} ${path.join(__dirname, '../dist')}`);
  });

  console.log('Done!');
}

build();
export { build };
