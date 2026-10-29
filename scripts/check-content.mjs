#!/usr/bin/env node
/**
 * 内容自检：路径即索引带来的隐含约定，靠这个脚本兜底。
 *
 *   node scripts/check-content.mjs
 *
 * 检查项：
 *   1. 每篇中文都有对应的英文，反之亦然（按 series/slug 配对）
 *   2. 英文正文里不允许出现中文
 *   3. 文章所在的 series 目录必须有 src/content/series/<series>.md
 *   4. 同一语言 + 同一系列内 slug 不能重复
 *   5. 章节型（kind: chapters）的 part 必须能在系列 parts 里找到
 *   6. 必填字段齐全（title / description / readingTime）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLES = path.join(ROOT, 'src/content/articles');
const SERIES_DIR = path.join(ROOT, 'src/content/series');
const LANGS = ['zh', 'en'];

const errors = [];
const warnings = [];

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });

const frontmatter = (file) => {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: text };
  const data = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return { data, body: match[2] };
};

/* ——— 读取系列元数据 ——— */
const series = new Map();
for (const file of fs.readdirSync(SERIES_DIR).filter((name) => name.endsWith('.md'))) {
  const { data } = frontmatter(path.join(SERIES_DIR, file));
  const keys = [...fs.readFileSync(path.join(SERIES_DIR, file), 'utf8').matchAll(/- key:\s*([\w-]+)/g)].map(
    (m) => m[1]
  );
  series.set(file.replace(/\.md$/, ''), { kind: data.kind ?? 'chapters', parts: keys });
}

/* ——— 扫描文章 ——— */
const entries = [];
for (const file of walk(ARTICLES)) {
  const rel = path.relative(ARTICLES, file).split(path.sep);
  const lang = rel[0];
  const slug = path.basename(file, '.md');

  if (!LANGS.includes(lang) || rel.length !== 3) {
    errors.push(`目录结构不符：${path.relative(ROOT, file)}（应为 articles/<zh|en>/<series>/<slug>.md）`);
    continue;
  }

  const key = rel[1];
  const { data, body } = frontmatter(file);
  entries.push({ file, lang, series: key, slug, data, body });

  if (!series.has(key)) {
    errors.push(`缺少系列元数据：src/content/series/${key}.md（被 ${path.relative(ROOT, file)} 引用）`);
  }

  for (const required of ['title', 'description', 'readingTime']) {
    if (!data[required]) errors.push(`缺少必填字段 ${required}：${path.relative(ROOT, file)}`);
  }

  if (lang === 'en' && /[\u3400-\u9fff]/.test(body)) {
    const line = body.split('\n').findIndex((text) => /[\u3400-\u9fff]/.test(text)) + 1;
    errors.push(`英文正文出现中文：${path.relative(ROOT, file)}（正文第 ${line} 行）`);
  }

  const meta = series.get(key);
  if (meta?.kind === 'chapters' && !data.part) {
    warnings.push(`章节缺少 part：${path.relative(ROOT, file)}`);
  }
  if (meta?.kind === 'chapters' && data.part && !meta.parts.includes(data.part)) {
    errors.push(`part "${data.part}" 不在 ${key} 的分卷里：${path.relative(ROOT, file)}`);
  }
}

/* ——— slug 唯一性 ——— */
const seen = new Map();
for (const entry of entries) {
  const id = `${entry.lang}/${entry.series}/${entry.slug}`;
  if (seen.has(id)) errors.push(`slug 重复：${id}（${path.relative(ROOT, entry.file)} 与 ${path.relative(ROOT, seen.get(id))}）`);
  else seen.set(id, entry.file);
}

/* ——— 中英配对 ——— */
const pairs = new Map();
for (const entry of entries) {
  const id = `${entry.series}/${entry.slug}`;
  pairs.set(id, { ...(pairs.get(id) ?? {}), [entry.lang]: entry.file });
}
for (const [id, pair] of pairs) {
  if (!pair.zh) warnings.push(`缺中文版：${id}（只有 en）`);
  if (!pair.en) warnings.push(`缺英文版：${id}（只有 zh）`);
}

/* ——— 输出 ——— */
const rel = (file) => path.relative(ROOT, file);

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} 条提醒`);
  for (const message of warnings) console.log('   ' + message);
}

if (errors.length) {
  console.log(`\n✖  ${errors.length} 个错误`);
  for (const message of errors) console.log('   ' + message);
  console.log('');
  process.exit(1);
}

console.log(
  `\n✔ 检查通过：${entries.length} 篇 · ${pairs.size} 组中英配对 · ${series.size} 个系列` +
    (warnings.length ? `（${warnings.length} 条提醒，见上）` : '') +
    '\n'
);
