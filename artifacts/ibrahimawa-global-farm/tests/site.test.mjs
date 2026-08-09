import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const siteRoot = resolve(import.meta.dirname, '..');
const appSource = readFileSync(resolve(siteRoot, 'src', 'App.tsx'), 'utf8');
const page = readFileSync(resolve(siteRoot, 'index.html'), 'utf8');

test('site assets referenced by the app are present', () => {
  for (const asset of [
    'hero-farm.jpg',
    'workshop-machinery.jpg',
    'power-tiller-field.jpg',
    'igaf-mark.svg',
  ]) {
    assert.equal(existsSync(resolve(siteRoot, 'public', asset)), true, `${asset} is missing`);
  }
});

test('primary navigation targets exist', () => {
  for (const id of ['about', 'products', 'why', 'gallery', 'contact']) {
    assert.match(appSource, new RegExp(`id="${id}"`));
    assert.match(appSource, new RegExp(`\\['[^']+', '${id}'\\]`));
  }
});

test('published contact details and favicon are configured', () => {
  assert.match(appSource, /\+234 810 080 9016/);
  assert.match(appSource, /ibrahimawafarms@gmail\.com/);
  assert.match(appSource, /https:\/\/wa\.me\/2347047197737/);
  assert.match(appSource, /https:\/\/maps\.app\.goo\.gl\/HQAMXdP8y18sVP3h9/);
  assert.match(page, /href="\/igaf-mark\.svg"/);
});
