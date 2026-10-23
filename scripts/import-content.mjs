import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE = process.env.SOURCE_DIR || path.resolve(ROOT, '../AI-Sharing/docs/从对话到协作-AI大模型三年演进全记录');
const OUT = path.resolve(ROOT, 'src/content/chapters');
const IMG_OUT = path.resolve(ROOT, 'public/images');
const BASE = '/ai-evolution';

const CHAPTERS = [
  {
    file: 'README.md', slug: 'overview', num: 1,
    title: '总览：从对话到协作', subtitle: '三年，五个阶段，一条主线',
    description: '把 2022.11 到 2026.01 的模型、协议与产品放回同一条演进线上，看清每一次能力跃迁解决了什么问题，又留下了什么新问题。',
    part: '序章', partOrder: 0, order: 0, featured: false, kind: 'chapter',
    date: '2026-01-27', updated: '2026-02-24', cover: '/images/evolution-ai-capability.webp',
  },
  {
    file: '00-导读/餐厅类比理解AI系统.md', slug: 'restaurant-analogy', num: 2,
    title: '用一家餐厅，理解 AI 系统', subtitle: '模型是主厨，推理层是领班',
    description: '用「智能餐厅」拆解 AI 系统的四层结构：顾客、服务团队、后厨与工具层。理解推理层为什么是核心差异。',
    part: '导读', partOrder: 1, order: 1, featured: false, kind: 'chapter',
    cover: '/images/restaurant-architecture.webp',
  },
  {
    file: '01-时间线总览/2022-生成式AI觉醒.md', slug: 'year-2022', num: 3,
    title: '2022：生成式 AI 的觉醒', subtitle: 'RLHF 让模型听懂人话',
    description: 'InstructGPT 用 RLHF 把「有能力」变成「听得懂」，ChatGPT 五天破百万，4K 上下文时代开启。',
    part: '时间线', partOrder: 2, order: 2, featured: false, kind: 'year',
  },
  {
    file: '01-时间线总览/2023-长文本元年.md', slug: 'year-2023', num: 4,
    title: '2023：长文本元年与百模大战', subtitle: '100K 上下文与 Prompt 的黄金时代',
    description: 'Claude 2 把上下文推到 100K，GPT-4 与 Plugins 打开工具生态，Prompt 工程师成为年薪 20 万美元的新职业。',
    part: '时间线', partOrder: 2, order: 3, featured: false, kind: 'year',
  },
  {
    file: '01-时间线总览/2024-推理革命.md', slug: 'year-2024', num: 5,
    title: '2024：推理革命与生态标准化', subtitle: 'o1 把「思考」摆上台面',
    description: 'OpenAI o1 打开推理范式，MCP 试图标准化工具调用，Prompt Caching 与 DeepSeek-V3 把成本推向主战场。',
    part: '时间线', partOrder: 2, order: 4, featured: false, kind: 'year',
  },
  {
    file: '01-时间线总览/2025-生态爆发.md', slug: 'year-2025', num: 6,
    title: '2025：生态爆发与范式转移', subtitle: '百万上下文、Skills 与 Agent 落地',
    description: 'DeepSeek-R1 开源推理，Sonnet 4.5 与 Opus 4.5 把上下文和编程能力推到新高度，Agent Skills 成为架构级创新。',
    part: '时间线', partOrder: 2, order: 5, featured: false, kind: 'year',
  },
  {
    file: '01-时间线总览/2026-协作时代.md', slug: 'year-2026', num: 7,
    title: '2026：协作时代的开启', subtitle: '从工具到数字同事',
    description: 'Claude Cowork 与 Clawdbot 把多 Agent 协作推到台前，云本分化与个人 AI 成为新的变量。',
    part: '时间线', partOrder: 2, order: 6, featured: false, kind: 'year',
  },
  {
    file: '02-核心技术演进/3.1-上下文革命.md', slug: 'context-revolution', num: 8,
    title: '上下文革命：从 4K 到 2M', subtitle: '500 倍增长之后，成本才是下一个战场',
    description: '三年 500 倍。长上下文解决了遗忘，也把成本、延迟与信息噪音推到新的量级，并催生缓存、压缩与检索三条优化路径。',
    part: '技术深潜', partOrder: 3, order: 7, featured: true, kind: 'essay', tags: ['深度'],
  },
  {
    file: '02-核心技术演进/3.2-Prompt工程兴衰.md', slug: 'prompt-engineering', num: 9,
    title: 'Prompt 工程的兴衰', subtitle: '它没有死，只是下沉了',
    description: '从年薪 20 万美元到职位缩减 70%，Prompt 工程从用户侧下沉到系统侧：System Prompt、工具描述与 Skills 成为新的载体。',
    part: '技术深潜', partOrder: 3, order: 8, featured: false, kind: 'essay', tags: ['速览'],
  },
  {
    file: '02-核心技术演进/3.3-MCP协议.md', slug: 'mcp', num: 10,
    title: 'MCP 协议：从炒作到现实', subtitle: '800 万次下载之后',
    description: 'MCP 解决了「AI 能连什么」，但 Token 效率、安全边界与企业级治理仍是现实问题。它是能力层，不是智慧层。',
    part: '技术深潜', partOrder: 3, order: 9, featured: false, kind: 'essay', tags: ['速览'],
  },
  {
    file: '02-核心技术演进/3.4-Agent-Skills.md', slug: 'agent-skills', num: 11,
    title: 'Agent Skills：比 MCP 更重要的创新', subtitle: '把领域知识变成可安装的资产',
    description: 'Skills 补的不是模型能力，而是架构：把团队最佳实践沉淀为可复用、可版本化的知识包，Token 更省，边界更清晰。',
    part: '技术深潜', partOrder: 3, order: 10, featured: true, kind: 'essay', tags: ['深度'],
  },
  {
    file: '03-深度洞察/AI进化的新范式.md', slug: 'new-paradigm', num: 12,
    title: 'AI 进化的新范式：推理层才是核心', subtitle: '同样的模型，不同的服务团队',
    description: '参数不是唯一的护城河。推理层决定模型如何被调度、约束与优化，也决定了同样能力下的成本、可靠性与体验差距。',
    part: '洞察', partOrder: 4, order: 11, featured: true, kind: 'essay', tags: ['深度'],
  },
  {
    file: '05-企业案例/RDSec-One平台发展史.md', slug: 'enterprise-case', num: 13,
    title: '企业 AI 平台发展史（2023—2026）', subtitle: '从 POC 到 4000+ 用户',
    description: '一个企业 AI 平台从 POC 走到 4000+ 用户：快速跟进、私有模型、渐进式演进与成本治理，构成一条可复用的落地路径。',
    part: '实践', partOrder: 5, order: 12, featured: false, kind: 'case',
  },
  {
    file: '06-未来展望/未来展望与结论.md', slug: 'outlook', num: 14,
    title: '未来展望与结论', subtitle: '未来三年的五个判断',
    description: 'Skills 生态、云本分化、小模型、开源追赶与 Agent 自主：从演进规律出发，给出未来三年的判断与行动清单。',
    part: '展望', partOrder: 6, order: 13, featured: false, kind: 'chapter',
  },
];

const IMAGE_NAMES = {
  '餐厅架构图-黑板版.png': 'restaurant-architecture.webp',
  '餐厅架构图.png': 'restaurant-architecture-color.webp',
};

const LINK_MAP = Object.fromEntries(CHAPTERS.map((c) => [path.basename(c.file), c.slug]));

function desensitize(text) {
  return text
    .replaceAll('趋势科技（Trend Micro）', '所在企业')
    .replaceAll('趋势科技', '所在企业')
    .replaceAll('Trend Micro', '所在企业')
    .replaceAll('Trend团队', '团队')
    .replaceAll('Trend Team', 'Team')
    .replaceAll('（Trend私有模型）', '（私有模型）')
    .replaceAll('Trend', '团队')
    .replaceAll('Enterprise订阅制', '企业订阅制')
    .replaceAll('RDSec One平台', '企业 AI 平台')
    .replaceAll('RDSec One', '企业 AI 平台')
    .replaceAll('RDSec项目', '企业 AI 平台项目')
    .replaceAll('RDSec', '企业 AI 平台')
    .replaceAll('Cybertron私有模型', '私有模型')
    .replaceAll('（趋势私有模型）', '')
    .replaceAll('Cybertron-0429', '私有模型 v1')
    .replaceAll('Cybertron-0906', '私有模型 v2')
    .replaceAll('Cybertron', '私有模型')
    .replaceAll('从$465成本教训到订阅制', '从早期成本教训到订阅制')
    .replaceAll('从$465教训到订阅制', '从早期成本教训到订阅制')
    .replaceAll('$465', '一次成本超支')
    .replaceAll('福冈决赛', '年度决赛')
    .replaceAll('企业 AI 平台是所在企业内部AI服务平台', '这是所在企业内部的一个 AI 服务平台')
    .replaceAll('所在企业AI平台', '所在企业的 AI 平台');
}

function readingTime(text) {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (text.replace(/[\u4e00-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(2, Math.ceil(cjk / 380 + latin / 220));
}

function stripBackLinks(md) {
  let out = md;
  out = out.replace(/^\s*\[← 返回主目录\]\([^)]*\)\s*\n+(?:---\s*\n+)?/, '');
  out = out.replace(/\n+\s*---\s*\n+\s*\[← 返回主目录\]\([^)]*\)\s*$/, '');
  out = out.replace(/\n+\s*\[← 返回主目录\]\([^)]*\)\s*$/, '');
  return out;
}

function rewriteLinks(md) {
  return md.replace(/\[([^\]]+)\]\(([^)\s]+?\.md)(#[^)]+)?\)/g, (m, label, target, anchor) => {
    const name = path.basename(target);
    const slug = LINK_MAP[name];
    if (!slug) return label;
    return '[' + label + '](' + BASE + '/read/' + slug + '/' + (anchor || '') + ')';
  });
}

function rewriteImages(md) {
  return md.replace(/!\[([^\]]*)\]\(([^)]+?\.(?:png|jpg|jpeg|webp))\)/g, (m, alt, src) => {
    const name = path.basename(src);
    const file = IMAGE_NAMES[name] || name.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return '![' + alt + '](' + BASE + '/images/' + file + ')';
  });
}

const DUAL_TRACK = [
  '| 年份 | 全球技术演进 | 企业平台实践 |',
  '| :--- | :--- | :--- |',
  '| 2023 | RLHF、GPT-4、Plugins、Claude 2（100K）、GPT-4 Turbo（128K） | 项目 POC 启动、API Gateway v1.0 |',
  '| 2024 | GPT Store、Claude 3（200K）、GPT-4o、o1、MCP、Sora、DeepSeek-V3 | Portal 开放（4000+ 用户）、AI Endpoint、私有模型集成、OIDC、Token 追踪与限流 |',
  '| 2025 | DeepSeek-R1、Codex CLI、GPT-5、Sonnet 4.5、Agent Skills、Gemini 3、Opus 4.5 | R1 集成（17 天）、Dify 生产部署、10+ MCP Servers、Playground MCP、企业订阅制 |',
  '| 2026 | Cowork、Clawdbot | Skills ROI 验证（每周节省 10—15 小时） |',
  '',
  '',
].join('\n');

function transform(md, chapter) {
  let out = md.replace(/\r\n/g, '\n');
  out = stripBackLinks(out);

  if (chapter.slug === 'overview') {
    out = out.replace(/^# .*\n\n(?:> .*\n)+\n---\n+/, '');
    out = out.replace(/## 📑 目录导航[\s\S]*?\n---\n\n(?=## 引言)/, '');
    out = out.replace(/\n!\[我们与AI的故事\]\(00-导读\/our-ai-story\.png\)\n\n\*图：[^\n]*\*\n/g, '\n');
    out = out.replace(/\*\*对比图\*\*：[\s\S]*?(?=\*\*关键启示\*\*：)/, DUAL_TRACK);
  } else {
    out = out.replace(/^# .*\n+/, '');
  }

  out = out.replace(/\n?<details>[\s\S]*?<\/details>\n?/g, '\n');
  out = out.replace(/\n?\x60\x60\x60mermaid[\s\S]*?\x60\x60\x60\n?/g, '\n');
  out = out.replace(/^\s*\[← 返回主目录\][^\n]*$/gm, '');
  if (chapter.slug === 'restaurant-analogy') {
    out = out.replace(/\n## 目录\n[\s\S]*?\n---\n\n/, '\n');
  }
  out = rewriteImages(out);
  out = rewriteLinks(out);
  out = desensitize(out);
  out = out.replace(/\n## 章节导航[\s\S]*$/, '\n');
  out = out.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  return out;
}

function yaml(chapter, body) {
  const data = {
    title: chapter.title,
    subtitle: chapter.subtitle,
    description: chapter.description,
    part: chapter.part,
    partOrder: chapter.partOrder,
    order: chapter.order,
    num: chapter.num,
    readingTime: readingTime(body),
    featured: !!chapter.featured,
    kind: chapter.kind,
    tags: chapter.tags || [],
    cover: chapter.cover,
    date: chapter.date,
    updated: chapter.updated,
  };
  const lines = Object.entries(data)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => k + ': ' + JSON.stringify(v));
  return '---\n' + lines.join('\n') + '\n---\n\n';
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(IMG_OUT, { recursive: true });

  const results = [];
  for (const chapter of CHAPTERS) {
    const src = path.join(SOURCE, chapter.file);
    let raw;
    try {
      raw = await fs.readFile(src, 'utf8');
    } catch (err) {
      console.error('MISSING', chapter.file, err.message);
      process.exitCode = 1;
      continue;
    }
    const body = transform(raw, chapter);
    await fs.writeFile(path.join(OUT, chapter.slug + '.md'), yaml(chapter, body) + body, 'utf8');
    results.push({ slug: chapter.slug, minutes: readingTime(body), chars: body.length });
  }

  const imgSrc = path.join(SOURCE, '00-导读');
  const inputs = (await fs.readdir(imgSrc)).filter((f) => /\.(png|jpe?g)$/i.test(f));
  for (const file of inputs) {
    if (file === 'our-ai-story.png' || file === 'dual-track-comparison.png') continue;
    if (file === '餐厅架构图.png') continue;
    const outName = IMAGE_NAMES[file] || file.replace(/\.(png|jpe?g)$/i, '.webp');
    const info = await sharp(path.join(imgSrc, file))
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 84, effort: 5 })
      .toFile(path.join(IMG_OUT, outName));
    console.log('image', outName, Math.round(info.size / 1024) + 'KB');
  }

  console.table(results);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
