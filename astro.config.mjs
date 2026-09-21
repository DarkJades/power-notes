import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** 把 Markdown 生成的 <table> 包进 .table-wrap，便于横向滚动而不是撑破栏宽 */
function rehypeWrapTables() {
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrap'] },
          children: [child],
        };
      }
      walk(child);
      return child;
    });
  };
  return (tree) => walk(tree);
}

/** 把 ```mermaid 代码块转换为浏览器端可渲染的 Mermaid 容器。 */
function rehypeMermaid() {
  const getText = (node) => (node.children || [])
    .map((child) => child.type === 'text' ? child.value : getText(child))
    .join('');

  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'pre') {
        const code = child.children?.find((item) => item.type === 'element' && item.tagName === 'code');
        const classNames = code?.properties?.className || [];
        const language = child.properties?.dataLanguage ?? child.properties?.['data-language'];
        if (code && (classNames.includes('language-mermaid') || language === 'mermaid')) {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['mermaid'] },
            children: [{ type: 'text', value: getText(code) }],
          };
        }
      }
      walk(child);
      return child;
    });
  };

  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://darkjades.github.io',
  base: '/power-notes',
  output: 'static',
  integrations: [sitemap(), mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeWrapTables, rehypeMermaid],
  },
});
