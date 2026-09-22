# 电源拾光

面向电力电子工程师的静态技术博客。

- 线上地址（当前）：<https://darkjades.github.io/power-notes/>
- 目标域名（待 DNS 修复后）：<https://www.powershiguang.com>
- 联系邮箱：powersg@126.com

## 技术栈

Astro 5（静态输出）+ TypeScript + MDX 内容组件 + KaTeX 数学公式 + RSS + Sitemap。

## 在线发文（推荐）

日常发布文章不需要 VS Code、终端或 Git 命令。网站已配置为使用 [Pages CMS](https://app.pagescms.org/) 作为在线写作后台：它会把保存的内容直接写入本仓库，并自动触发 GitHub Pages 发布。

首次使用：

1. 打开 <https://app.pagescms.org/>，选择 **Sign in with GitHub**。
2. 按页面提示安装 Pages CMS GitHub App，并授权仓库 `DarkJades/power-notes`。
3. 进入仓库后，左侧选择 **在线文章**，点击 **New**。
4. 填写标题、网页地址英文名、摘要、分类和标签；正文可直接在线排版、粘贴文字、插入表格和拖拽上传图片。
5. 默认打开 **保持为草稿**。草稿不会出现在公开网站；确认文章可以公开时关闭此开关并保存。
6. 保存后，GitHub Actions 会自动构建网站，通常 1～3 分钟后在 <https://darkjades.github.io/power-notes/> 可见。

图片会自动保存到 `public/images/online/`，可下载的 PDF、Word、Excel、PPT 或 ZIP 文件可在底部的 **可下载资料附件** 上传，网站会自动显示下载入口。

### 自动归档与技术资料库

网站会自动生成 **归档、分类、标签、专题系列、技术资料库** 页面，无需再手工维护菜单或文章列表：

- 文章填写分类和标签后，对应页面自动更新；填写相同的 **所属系列** 与系列内序号，可把多篇文章组织成连续专题。
- 在后台左侧的 **技术资料库** 点击 **New**，上传一份可公开的资料文件，并填写资料类型、摘要、分类和标签；资料会自动显示在网站的“资料库”页面。
- **归档** 页面会按年份自动整理所有已发布文章，并同时列出已经建立的专题系列。

公式和 Mermaid 框图仍然支持：在正文编辑器切到 **Source** 模式后，按 Markdown 写法插入即可。在线编辑器的排版视图可用于写作过程中的格式预览；发布前请确认标题、图片、表格与附件名称。由于仓库是公开仓库，草稿和上传文件虽然不会显示在网站上，但仍不应包含公司机密或未授权资料。

现有的 MDX 技术文章保持不变。在线后台只管理 `src/content/blog/online/` 中的新文章，避免误改已发布文章中的专用图表和公式组件。

## 本地高级功能（可选）

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
