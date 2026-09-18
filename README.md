# 电源拾光

面向软件初学者维护的静态技术博客。

## 本地使用

1. 安装依赖：`npm install`
2. 本地预览：`npm run dev`
3. 正式构建：`npm run build`
4. 检查构建结果：`npm run preview`

## 发布文章

复制 `templates/article.md` 到 `src/content/blog/` 的相应分类目录。写作期间保留 `draft: true`；完成技术审核并确认公开后，改成 `draft: false`。

生产构建会统一排除草稿，草稿不会进入文章列表、分类、标签、RSS、站点地图或文章路由。敏感资料仍应放在网站工程之外。

## 上线前必须修改

- 把 `astro.config.mjs` 中的 `site` 改为真实域名。
- 把 `src/data/site.ts` 中的示例邮箱改为真实联系方式。
- 确认版权与转载规则。
- 用目标设备检查移动端、公式、图片和深层链接。
