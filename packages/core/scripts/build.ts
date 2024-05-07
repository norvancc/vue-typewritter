import { execSync as exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const FILES_COPY_ROOT = ['LICENSE'];

const README_ROOT = ['README.md'];

const TYPES_ROOT = ['types.d.ts'];

const META_ROOT = ['package.json'];

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

  // Copy meta
  META_ROOT.forEach((file) => {
    exec(`cp ${path.join(__dirname, '../meta/', file)} ${path.join(__dirname, '../dist')}`);
  });

  // Copy README
  README_ROOT.forEach((file) => {
    exec(`cp ${path.join(__dirname, '../../../', file)} ${path.join(__dirname, '../dist')}`);
  });

  console.log('Done!');
}

build();
export { build };
