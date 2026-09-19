# 电源拾光

面向电力电子工程师的静态技术博客。

- 线上地址：<https://www.powershiguang.com>
- 联系邮箱：powersg@126.com

## 技术栈

Astro 5（静态输出）+ TypeScript + KaTeX 数学公式 + RSS + Sitemap。

## 本地使用

1. 安装依赖：`npm install`
2. 本地预览：`npm run dev`
3. 正式构建：`npm run build`
4. 检查构建结果：`npm run preview`

## 发布文章

复制 `templates/article.md` 到 `src/content/blog/` 的相应分类目录。写作期间保留 `draft: true`；完成技术审核并确认公开后，改成 `draft: false`。

生产构建会统一排除草稿，草稿不会进入文章列表、分类、标签、RSS、站点地图或文章路由。敏感资料仍应放在网站工程之外。

分类取值限定为：`power-electronics`、`components`、`analog`、`pcb`、`engineering`、`ai-hardware`。

## 部署

推送到 `main` 分支会触发 `.github/workflows/deploy.yml`，由 GitHub Actions 构建并发布到 GitHub Pages。

自定义域名由 `public/CNAME` 声明为 `www.powershiguang.com`。DNS 需要在域名服务商处配置：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| CNAME | `www` | `darkjades.github.io` |

同时在仓库 `Settings → Pages` 中确认自定义域名已生效并启用 HTTPS。

## 上线前检查清单

- [x] `astro.config.mjs` 的 `site` 已设为真实域名
- [x] `src/data/site.ts` 的联系邮箱已替换
- [x] 版权与转载规则已确认
- [ ] 用目标设备检查移动端、公式、图片和深层链接
