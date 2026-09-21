import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const options = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...value] = arg.replace(/^--/, '').split('=');
  return [key, value.join('=')];
}));
const type = options.type || 'component-guide';
const slug = options.slug;
const title = options.title || '【文章标题】';
const validTypes = ['component-guide', 'circuit-design', 'topology-analysis', 'engineering-case', 'design-checklist', 'ai-hardware'];

if (!validTypes.includes(type) || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('用法：npm run article:new -- --type=component-guide --slug=chip-resistor --title=“贴片电阻应用指导”');
  console.error(`可用 type：${validTypes.join('、')}`);
  process.exit(1);
}

const root = process.cwd();
const template = readFileSync(join(root, 'templates/articles', `${type}.mdx`), 'utf8');
const category = (template.match(/^category: "(.+)"$/m) || [])[1];
const targetDir = join(root, 'src/content/blog', category);
const target = join(targetDir, `${slug}.mdx`);
if (existsSync(target)) {
  console.error(`文章已存在：${target}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const content = template
  .replaceAll('【文章标题】', title)
  .replaceAll('【english-slug】', slug)
  .replaceAll('2026-09-21', today);
mkdirSync(targetDir, { recursive: true });
mkdirSync(join(root, 'public/images', slug), { recursive: true });
writeFileSync(target, content);
console.log(`已创建：${target}`);
console.log(`图片目录：public/images/${slug}/`);
