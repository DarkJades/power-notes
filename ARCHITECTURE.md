# 电源拾光 · 网站架构文件

> **这份文件的用途**：这是网站的可编辑蓝图。你直接在这里改内容，然后告诉我「按 ARCHITECTURE.md 更新」，我会把改动落到代码里并重新部署。
>
> **修改约定**：
> - 需要我改的地方，用 `【待定】` 或 `<!-- 修改：你的想法 -->` 标注
> - 想保留原样就别动，只改你要改的部分
> - 如果要在下面各节里加内容（新页面、新分类、新导航项等），直接加行即可，我会识别

**最后更新**：2026-09-19
**当前线上地址**：https://darkjades.github.io/power-notes/
**目标域名**：https://www.powershiguang.com （待 DNS 修复后切回）

---

## 1. 站点基本信息

> 对应代码：`src/data/site.ts`

| 项目 | 当前值 | 说明 |
| --- | --- | --- |
| 站点名称 | 电源拾光 | 显示在页头、浏览器标题、页脚 |
| 站点简介 | 把电力电子中的原理、设计与工程经验，整理成可检索、可验证、可持续修订的技术笔记。 | meta description，影响搜索引擎摘要 |
| 联系邮箱 | powersg@126.com | 页脚 + 关于页 + 版权页 |
| 目标域名 | https://www.powershiguang.com | 用于 sitemap / RSS 的绝对地址 |
| 品牌副标题 | 记录 · 思考 · 分享<br>让电源技术走得更远 | 页头 logo 右侧两行小字 |

<!-- 修改示例：
- 站点名称改成 XXX
- 联系邮箱改成 YYY
- 简介改成 ZZZ
-->

---

## 2. 页面清单（路由表）

> 对应代码：`src/pages/` 目录

| 路由 | 源文件 | 页面标题 | 内容来源 |
| --- | --- | --- | --- |
| `/` | `src/pages/index.astro` | 电源拾光｜电力电子技术笔记 | 首页，见第 4 节 |
| `/articles/` | `src/pages/articles/index.astro` | 技术文章 | 全部已发布文章列表 |
| `/articles/<slug>/` | `src/pages/articles/[slug].astro` | 文章标题 | 单篇文章，由 slug 动态生成 |
| `/categories/` | `src/pages/categories/index.astro` | 文章分类 | 6 个分类入口 |
| `/categories/<分类>/` | `src/pages/categories/[category].astro` | 分类名 | 该分类下的文章列表 |
| `/tags/` | `src/pages/tags/index.astro` | 文章标签 | 全部标签云 |
| `/tags/<标签>/` | `src/pages/tags/[tag].astro` | 标签 X | 该标签下的文章列表 |
| `/about/` | `src/pages/about.astro` | 关于本站 | 静态页，见第 5 节 |
| `/copyright/` | `src/pages/copyright.astro` | 版权与转载 | 静态页，见第 5 节 |
| `/404.html` | `src/pages/404.astro` | 页面未找到 | 404 提示页 |
| `/rss.xml` | `src/pages/rss.xml.js` | — | RSS 订阅源 |
| `/robots.txt` | `src/pages/robots.txt.ts` | — | 搜索引擎爬虫规则 |
| `/sitemap-index.xml` | 由 `@astrojs/sitemap` 生成 | — | 站点地图 |

**构建产物**：17 个页面（1 首页 + 1 文章 + 6 分类 + 3 标签 + 6 静态/动态）

### 想新增页面？

在 `src/pages/` 下加一个 `.astro` 文件就自动生成路由。例如：
- `src/pages/links.astro` → `/links/`
- `src/pages/series/index.astro` → `/series/`

告诉我你想加什么内容的页面，我来建。

---

## 3. 导航与页脚

> 对应代码：`src/layouts/BaseLayout.astro`

### 页头导航

| 顺序 | 文字 | 链接 |
| --- | --- | --- |
| 1 | 文章 | `/articles/` |
| 2 | 分类 | `/categories/` |
| 3 | 标签 | `/tags/` |
| 4 | 关于 | `/about/` |

<!-- 修改示例：
- 导航改成：文章 / 专题 / 工具 / 关于
- 增加一个「资料下载」指向 /downloads/
-->

### 页脚

| 位置 | 内容 |
| --- | --- |
| 左侧 | 电源拾光 · 2026（年份自动取当前年） |
| 右侧 | powersg@126.com ／ 版权与转载 ／ RSS |

### 顶部跳转链接

`跳到正文`（无障碍功能，键盘 Tab 时出现）

---

## 4. 首页结构

> 对应代码：`src/pages/index.astro`

首页分两个区域：

### 区域一：Hero 主视觉

| 元素 | 当前内容 |
| --- | --- |
| 小标签 | POWER ELECTRONICS · ENGINEERING NOTES |
| 主标题 | 把复杂的电源设计，<br>讲清楚，也做扎实。 |
| 分隔线文字 | 卷一 · 工程笔记 |
| 段落 | 专注电源电子技术的学习、实践与分享，从原理到工程，从芯片到系统，构建可落地的知识体系。 |
| 三条特色 | 01 深入的技术文章／从原理走到实践<br>02 工程化经验总结／少走弯路<br>03 开放的交流成长／与同行一起进步 |
| 右侧图 | SVG 绘制的开关电源链路示意图（整流 → 功率变换 → 隔离 → 滤波 + 反馈环路） |
| 图纸标题 | 电源变换系统 · 原理图版 ／ 图 01 / 修订 A |
| 图纸底部 | 从电路原理到工程实现 ／ 稳定 · 高效 · 可靠 |

### 区域二：内容区（左右两栏）

**左栏：最近更新**
- 显示最新 3 篇文章（标题 + 摘要 + 分类 + 日期）
- 右上角「查看全部 →」指向 `/articles/`
- 无文章时显示占位卡片

**右栏：从专题进入**
- 6 个分类卡片，2 列网格
- 每张卡：序号 + 分类名 + 副标题

| 序号 | 分类 | 副标题 |
| --- | --- | --- |
| 01 | 电力电子 | 拓扑 / 原理 / 变换器 |
| 02 | 元器件 | MOSFET / SiC / 磁性器件 |
| 03 | 模拟电路 | 采样 / 驱动 / 信号链 |
| 04 | PCB | 布局布线 / EMI / 测试 |
| 05 | 工程经验 | 调试 / 热设计 / 可靠性 |
| 06 | AI 与硬件 | 工具 / 方法 / 新实践 |

<!-- 修改示例：
- 主标题改成 XXX
- 首页改成显示最新 5 篇
- 特色三条改成 XXX / YYY / ZZZ
- 增加一个「热门文章」区块
-->

---

## 5. 静态页内容

### 5.1 关于页 `/about/`

> 对应代码：`src/pages/about.astro`

| 段落 | 当前内容 |
| --- | --- |
| 页面标题 | 关于电源拾光 |
| 副标题 | 把工作和学习中真正弄懂的内容，整理成经得起复查的技术笔记。 |
| 为什么建立这个网站 | 电力电子知识散落在数据手册、应用笔记、论文、标准和工程现场中。电源拾光希望把这些信息按问题重新组织，并补上适用条件、推导过程和验证方法。 |
| 内容原则 | 文章会区分资料结论、仿真结果、实测数据与个人经验。关键参数尽量给出来源，发现实质性错误时记录更正。AI 可以协助整理表达，但技术结论需要人工核查。 |
| 关于作者 | 硬件工程师，从事电力电子与电源设计相关工作，关注变换器拓扑、功率器件应用、驱动与采样电路、EMI 与热设计等方向。文章多来自实际项目中的问题复盘与器件验证。 |
| 联系与勘误 | 技术讨论、资料纠错或转载授权，请发邮件至 powersg@126.com。若你发现文章中的技术问题，欢迎提供具体章节、数据来源和修正建议，核实后会更新文章并记录更正说明。 |

### 5.2 版权页 `/copyright/`

> 对应代码：`src/pages/copyright.astro`

| 段落 | 当前内容 |
| --- | --- |
| 页面标题 | 版权与转载 |
| 副标题 | 本站尊重原创、授权范围和资料来源。 |
| 本站原创内容 | 除另有说明外，本站文章、图表和原创图片的版权归作者所有。**欢迎非商业转载**：请注明作者、文章标题，并保留原文链接，不要修改技术结论。商业用途或整站转载请先通过 powersg@126.com 取得授权。 |
| 第三方资料 | 数据手册、标准、论文、厂商图片和其他第三方资料的权利归原权利人所有。本站引用它们是为了说明来源，不会将第三方资料统一声明为本站原创。引用时会尽量标注器件型号、文档版本与页码。 |
| 技术内容的边界 | 本站内容用于技术交流与学习，**不构成任何产品设计、选型或安全认证的最终依据**。电力电子设计涉及高压、大电流与储能器件，实际项目请以器件厂商最新数据手册、适用标准和企业内部评审结论为准。因直接套用本站内容造成的损失，作者不承担责任。 |
| 资料纠错与下架 | 如内容涉及权利或公开范围问题，或你发现技术性错误，请通过 powersg@126.com 提出，并附上具体章节、数据来源和相关依据。核实后会及时更正或下架，实质性更正会在文末记录。 |

---

## 6. 内容模型（文章）

> 对应代码：`src/content.config.ts`

文章放在 `src/content/blog/<分类>/<文件名>.md`。

### 元数据字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | 字符串 | 是 | 文章标题 |
| `slug` | 字符串 | 是 | URL 地址，英文，如 `sic-mosfet-parallel-design` |
| `description` | 字符串 | 是 | 摘要，显示在列表页和搜索结果 |
| `publishedAt` | 日期 | 是 | 发布日期，格式 `2026-09-19` |
| `updatedAt` | 日期 | 否 | 更新日期 |
| `category` | 枚举 | 是 | 6 个分类之一（见下方） |
| `tags` | 字符串数组 | 否 | 标签，如 `["SiC", "MOSFET", "并联"]` |
| `draft` | 布尔 | 否 | `true` = 草稿，不公开；默认 `true` |

**分类枚举值**（只能填这些）：
`power-electronics` ｜ `components` ｜ `analog` ｜ `pcb` ｜ `engineering` ｜ `ai-hardware`

### 文章模板

`templates/article.md`，结构为四段：

1. 本文解决的问题
2. 原理与分析
3. 工程检查要点
4. 参考资料

### 现有文章

| 文件 | 标题 | 分类 | 状态 |
| --- | --- | --- | --- |
| `src/content/blog/components/sic-mosfet-parallel-design.md` | SiC MOSFET 并联设计检查要点 | 元器件 | 已发布 |

### 草稿机制

`draft: true` 的文章**完全不会出现**在：文章列表、分类页、标签页、首页、RSS、sitemap、以及文章路由。想私密存放素材，放网站工程目录之外。

---

## 7. 样式与设计令牌

> 对应代码：`src/styles/global.css`（264 行）

### 设计风格

**中国传统技术书卷风**：宋体标题 + 米色纸底 + 砖红强调色 + 细线框。

### 核心色彩

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `--ink` | `#1b1a18` | 正文主色 |
| `--muted` | `#706d68` | 次要文字 |
| `--line` | `#d8d4cd` | 分割线 |
| `--paper` | `#fbfaf6` | 页面底色（米色纸） |
| `--surface` | `#fffefa` | 卡片底色 |
| `--accent` | `#985744` | 强调色（砖红） |
| `--accent-soft` | `#f3e9e3` | 强调色浅底 |
| `--max` | `1180px` | 内容最大宽度 |

### 字体

| 用途 | 字体栈 |
| --- | --- |
| 标题 | `"Songti SC", STSong, SimSun, serif`（宋体） |
| 正文 | `"PingFang SC", "Microsoft YaHei", system-ui, sans-serif` |
| 代码/标签 | `ui-monospace, Consolas, monospace` |
| 数字 | `Georgia, "Times New Roman", serif` |

### 响应式断点

| 断点 | 布局变化 |
| --- | --- |
| `> 900px` | 桌面双栏 |
| `≤ 900px` | Hero 改单栏，内容区改单栏 |
| `≤ 760px` | 导航改纵向，分类索引 3 列 |
| `≤ 480px` | 隐藏品牌副标题，分类索引 2 列，标签卡单列 |

### 主要样式类

| 类名 | 作用 |
| --- | --- |
| `.container` | 内容容器（最大 1180px，居中） |
| `.hero` `.hero-grid` `.hero-copy` | 首页主视觉 |
| `.blueprint` | 右侧原理图卡片 |
| `.nav` `.nav-links` `.brand-lockup` | 页头导航 |
| `.article-row` `.article-summary` | 文章列表行 |
| `.topic-cards` `.topic-icon` | 分类卡片 |
| `.prose` | 文章正文排版（含表格、代码块、引用） |
| `.section-head` `.section-number` `.rule` | 章节标题栏 |
| `.site-footer` `.footer-grid` | 页脚 |

<!-- 修改示例：
- 强调色从砖红改成墨绿 #2f5d50
- 正文最大宽度从 1180px 改成 1280px
- 首页字体改用黑体
-->

---

## 8. 部署配置

> 对应代码：`astro.config.mjs`、`.github/workflows/deploy.yml`

### 当前状态：子目录模式

| 配置项 | 值 |
| --- | --- |
| `site` | `https://darkjades.github.io` |
| `base` | `/power-notes` |
| 访问地址 | `https://darkjades.github.io/power-notes/` |
| `public/CNAME` | 已删除 |
| 部署方式 | GitHub Actions，push 到 `main` 自动触发 |

因为挂在子目录下，所有内部链接通过 `src/data/site.ts` 的 `resolveUrl()` 自动加 `/power-notes` 前缀。

### 切换回自定义域名（DNS 修好后）

需要改四处：

1. `astro.config.mjs`：`site` 改回 `https://www.powershiguang.com`，**删除** `base: '/power-notes'`
2. 恢复 `public/CNAME`，内容 `www.powershiguang.com`
3. 仓库 `Settings → Pages` 重新添加自定义域名，勾选 **Enforce HTTPS**
4. 重新推送

**DNS 记录**：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| CNAME | `www` | `darkjades.github.io` |

⚠️ 若用 Cloudflare，`www` 必须设为 **DNS only（灰云）**，否则 GitHub 无法完成证书验证。

### 技术栈

| 项目 | 版本/说明 |
| --- | --- |
| Astro | 5.13（静态输出） |
| 数学公式 | KaTeX + remark-math + rehype-katex |
| RSS | @astrojs/rss |
| 站点地图 | @astrojs/sitemap |
| 包管理 | npm（已统一，pnpm 文件已删除） |
| Node | 22 |

---

## 9. 修改对照表（改哪里 → 影响什么）

| 你想改的东西 | 改这份文件哪一节 | 对应代码文件 |
| --- | --- | --- |
| 站点名称、邮箱、简介 | 第 1 节 | `src/data/site.ts` |
| 页头导航项 | 第 3 节 | `src/layouts/BaseLayout.astro` |
| 页脚内容 | 第 3 节 | `src/layouts/BaseLayout.astro` |
| 首页标题、文案、特色 | 第 4 节 | `src/pages/index.astro` |
| 首页右栏分类卡片 | 第 4 节 | `src/pages/index.astro` + `src/data/site.ts` |
| 关于页文字 | 第 5.1 节 | `src/pages/about.astro` |
| 版权页文字 | 第 5.2 节 | `src/pages/copyright.astro` |
| 文章分类（增删改） | 第 6 节 | `src/content.config.ts` + `src/data/site.ts` + 所有页面 |
| 文章元数据字段 | 第 6 节 | `src/content.config.ts` |
| 配色、字体、间距 | 第 7 节 | `src/styles/global.css` |
| 部署域名、路径 | 第 8 节 | `astro.config.mjs` + `public/CNAME` |
| 新增页面 | 第 2 节 | 新建 `src/pages/xxx.astro` |

---

## 10. 待办清单

- [ ] 用目标设备检查移动端、公式、图片和深层链接
- [ ] DNS 修复后切回自定义域名并启用 HTTPS

---

## 附：如何让我按这份文件更新

改完后跟我说任意一句即可：

- 「按 ARCHITECTURE.md 更新网站」
- 「架构文件第 4 节我改了，同步一下」
- 「我把强调色改成墨绿了，改代码」

我会：
1. 读取这份文件，对比当前代码
2. 只改你动过的部分
3. 本地构建验证
4. 推送到 GitHub 并确认部署成功
5. 告诉你线上地址可以刷新了
