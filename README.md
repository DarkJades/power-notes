# 电源拾光

面向电力电子工程师的静态技术博客。

- 线上地址（当前）：<https://darkjades.github.io/power-notes/>
- 目标域名（待 DNS 修复后）：<https://www.powershiguang.com>
- 联系邮箱：powersg@126.com

## 技术栈

Astro 5（静态输出）+ TypeScript + MDX 内容组件 + KaTeX 数学公式 + RSS + Sitemap。

## 本地使用

1. 安装依赖：`npm install`
2. 本地预览：`npm run dev`
3. 检查文章格式和代码：`npm run check:all`
4. 正式构建：`npm run build`
5. 检查构建结果：`npm run preview`

推荐使用 VS Code 打开项目。首次打开时，请按提示安装项目推荐的扩展：Astro、Markdown All in One、Markdown Mermaid 和 Markdownlint。文章实时预览以 `npm run dev` 启动后的浏览器页面为准。

## 发布文章

新建文章使用统一命令，例如：

```bash
npm run article:new -- --type=component-guide --slug=chip-resistor --title="贴片电阻应用指导"
```

它会自动创建标准 MDX 文章和对应图片目录。可用的文章类型为：`component-guide`、`circuit-design`、`topology-analysis`、`engineering-case`、`design-checklist`、`ai-hardware`。模板位于 `templates/articles/`。

写作期间保留 `draft: true`；完成技术审核并确认公开后，改成 `draft: false`。图片统一写为 `<Figure src="images/<slug>/文件名.jpg" ... />`，组件会自动处理 GitHub Pages 子目录和将来的自定义域名路径。

生产构建会统一排除草稿，草稿不会进入文章列表、分类、标签、RSS、站点地图或文章路由。敏感资料仍应放在网站工程之外。

分类取值限定为：`power-electronics`、`components`、`analog`、`pcb`、`engineering`、`ai-hardware`。

`npm run article:check` 会自动检查元数据、模板章节、图片路径、图片文件和写死的部署路径。GitHub Actions 也会在发布前执行同一检查。

### Mermaid 框图

文章正文可以直接使用 Mermaid 代码块，无需导入组件：

````mdx
```mermaid
flowchart LR
  A[输入电压] --> B[功率变换级]
  B --> C[输出滤波]
  C --> D[负载]
```
````

本地执行 `npm run dev` 后即可在浏览器实时查看框图效果。

## 部署

推送到 `main` 分支会触发 `.github/workflows/deploy.yml`，由 GitHub Actions 构建并发布到 GitHub Pages。

日常发布可使用一条命令。它会检查远端是否已有新提交、运行完整校验、暂存所有变更、创建提交并推送：

```bash
npm run site:publish -- --message="新增文章：开关电源小信号建模"
```

若提示本地落后于远端，先执行 `git pull --rebase origin main`，再重新运行发布命令。

当前站点挂在 GitHub Pages 的**子目录** `darkjades.github.io/power-notes/` 下，因此 `astro.config.mjs` 设置了 `base: '/power-notes'`，并使用 `src/data/site.ts` 中的 `resolveUrl()` 为所有内部链接自动加上前缀。

### 自定义域名（DNS 修复后切回）

等 `www.powershiguang.com` 的 DNS 正确指向 GitHub 后，需要改回根域名模式：

1. `astro.config.mjs`：`site` 改回 `https://www.powershiguang.com`，**删除** `base: '/power-notes'`
2. 恢复 `public/CNAME`，内容 `www.powershiguang.com`
3. 仓库 `Settings → Pages` 中重新添加自定义域名，并勾选 **Enforce HTTPS**

DNS 配置：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| CNAME | `www` | `darkjades.github.io` |

注意：若使用 Cloudflare，必须把 `www` 记录设为 **DNS only（灰云）**，否则 GitHub 无法完成 ACME 验证签发证书。

## 上线前检查清单

- [x] `src/data/site.ts` 的联系邮箱已替换
- [x] 版权与转载规则已确认
- [x] 文章已正式发布（`draft: false`）
- [x] 子目录部署下的 CSS 与内部链接已修复
- [ ] 用目标设备检查移动端、公式、图片和深层链接
- [ ] DNS 切回自定义域名后重新验证 HTTPS
