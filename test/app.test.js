const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Weather application files exist', () => {
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'server.js')));
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', 'index.html')));
});

test('Weather API route is defined', () => {
  const server = fs.readFileSync(
    path.join(__dirname, '..', 'server.js'),
    'utf8'
  );
  assert.ok(server.includes('/api/weather'));
});