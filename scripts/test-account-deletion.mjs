import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page = slug => readFileSync(new URL(`../dist/apps/${slug}/remove-account/index.html`, import.meta.url), 'utf8');

test('AnimalDex deletion describes animal data without running-shoe boilerplate', () => {
  const html = page('animaldex');
  for (const text of ['explorer profile', 'avatar, XP, badges', 'animal captures', 'capture locations associated with your account', 'friend code', 'friendships']) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /runner profile|shoe size|favorite shoes|shoe ratings|shoe popularity|questionnaire answers|recommendation results/);
  assert.ok(html.includes('AnimalDex%20account%20deletion%20request'));
});

test('SoleMate retains its existing deletion categories and retention description', () => {
  const html = page('solemate-run');
  for (const text of ['runner profile', 'shoe size', 'favorite shoes', 'questionnaire answers', 'shoe ratings', 'shoe popularity', 'aggregate community rating data']) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /animal captures|explorer profile|friendships/);
});
