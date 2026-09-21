import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const contentRoot = join(root, 'src/content/blog');
const publicRoot = join(root, 'public');
const categories = new Set(['power-electronics', 'components', 'analog', 'pcb', 'engineering', 'ai-hardware']);
const templates = new Set(['component-guide', 'circuit-design', 'topology-analysis', 'engineering-case', 'design-checklist', 'ai-hardware']);
const requiredHeadings = {
  'component-guide': ['一、基本原理', '二、关键特性与参数', '三、选型与应用指导', '四、降额规范', '五、使用注意事项', '六、常见失效与对策', '七、总结与核心建议', '八、经验案例总结'],
  'circuit-design': ['一、应用目标与边界条件', '二、工作原理与关键公式', '三、典型电路与参数计算'],
  'topology-analysis': ['一、应用场景与设计指标', '二、拓扑结构与工作过程', '三、关键参数与设计推导'],
  'engineering-case': ['一、问题背景与影响范围', '二、现象、工况与复现条件', '三、分析路径与证据'],
  'design-checklist': ['本文解决的问题', '静态均流检查', '动态均流检查', '测试与验证方法'],
  'ai-hardware': ['一、要解决的问题', '二、适用边界与输入要求', '三、工作流程'],
};

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : /\.(md|mdx)$/.test(name) ? [path] : [];
  });
}

function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;
  const fields = Object.fromEntries([...match[1].matchAll(/^(\w+):\s*(.+)$/gm)].map(([, key, value]) => [key, value.trim().replace(/^['"]|['"]$/g, '')]));
  return { fields, body: source.slice(match[0].length) };
}

const errors = [];
for (const path of files(contentRoot)) {
  const display = relative(root, path);
  const source = readFileSync(path, 'utf8');
  const parsed = frontmatter(source);
  if (!parsed) { errors.push(`${display}: 缺少 YAML frontmatter。`); continue; }
  const { fields, body } = parsed;
  for (const key of ['title', 'slug', 'description', 'publishedAt', 'category', 'draft']) if (!fields[key]) errors.push(`${display}: 缺少 ${key}。`);
  if (fields.category && !categories.has(fields.category)) errors.push(`${display}: category 不在允许列表中。`);
  const template = fields.template || 'component-guide';
  if (!templates.has(template)) errors.push(`${display}: template 不在允许列表中。`);
  if (body.includes('/power-notes/')) errors.push(`${display}: 禁止写死 /power-notes/ 路径，请使用 Figure 组件的 images/<slug>/ 文件路径。`);
  if (/^### /m.test(body) && !/^## /m.test(body)) errors.push(`${display}: 标题层级不能从正文直接跳到三级标题。`);
  for (const heading of requiredHeadings[template] || []) if (!body.includes(`## ${heading}`)) errors.push(`${display}: 缺少模板章节“${heading}”。`);
  for (const [, src] of body.matchAll(/<Figure[^>]*\ssrc=["']([^"']+)["']/g)) {
    if (!src.startsWith(`images/${fields.slug}/`)) errors.push(`${display}: 图片应放在 images/${fields.slug}/ 下。`);
    if (!existsSync(join(publicRoot, src))) errors.push(`${display}: 图片不存在：public/${src}`);
  }
}

if (errors.length) {
  console.error(`文章规范检查失败（${errors.length} 项）：`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`文章规范检查通过：${files(contentRoot).length} 篇文章。`);
