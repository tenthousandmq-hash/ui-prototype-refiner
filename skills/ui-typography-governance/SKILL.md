---
name: ui-typography-governance
description: 【排印与阅读人体工学治理】面向专业设计师与工程流水线的文本视觉工程基线。融合 Robert Bringhurst 经典排印学与 Google Material Design 3 (M3) 工业体系，严格针对 Windows/macOS 系统字体进行跨平台稳健适配。统一管理双轨语义角色 (Body vs Label)、字重双锚点 (400 vs 600)、4px固定行高模数、逆向 Tracking 光学补偿与 65ch 黄金行宽。支持事前只读诊断、代码原子装配、事后红线终审三模式。
---

# ui-typography-governance (排印与阅读人体工学治理)

面向专业设计师与工程流水线的纯代码/视觉排印工程基线。
排除了任何主观审美形容词，将文本排版彻底转化为**眼动工学物理常数、M3 工业角色契约与系统字体可执行公式**。

---

## 一、 核心物理常数与 M3 工业法则

```
                     【排印双轨语义体系 (Dual-Track System)】
                                        │
           ┌────────────────────────────┴────────────────────────────┐
           ▼                                                         ▼
【长文阅读轨道: Body Text (AI问答/论文)】                 【界面交互轨道: Label / UI (导航/按钮/标签)】
• 字号基准: 16px (大屏沉浸阅读)                         • 字号基准: 14px / 12px (高密紧凑交互)
• 行高模数: 24px (1.50x，对齐4px网格)                    • 行高模数: 20px / 16px (对齐4px网格)
• 字重约束: 严格 400 (Regular，杜绝大段加粗)             • 字重约束: 统一 600 (Semibold，建立实体感)
• 容器上限: max-width: 65ch (30~45汉字)                  • 容器上限: 随组件包裹，不受 65ch 限制
```

### 1. 跨平台系统字体栈声明（System Font Stack）
国内 Web/客户端生产环境严禁依赖体积庞大的专有可变网络字体，统一声明**跨平台高表现力系统字体降级栈**：
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif;
```

### 2. M3 双轨语义角色体系（Body vs Label 解耦）
严禁通篇混用单一的 `--font-size`，必须物理切分为长文阅读轨道与界面交互轨道：
* **`Body`（长文连续阅读轨道）**：
  * **Body Large (16px / 行高 24px)**：AI 问答区正文、论文核心长文；
  * **Body Medium (14px / 行高 20px)**：常规说明文本、次级长文段落；
  * **字重强制锁死在 `400 (Regular)`**：长文阅读严禁加粗，依靠字号和明度区分，杜绝眼动压迫。
* **`Label`（界面控件交互轨道）**：
  * **Label Large (14px / 行高 20px)**：操作按钮文字、Tab 标签、侧边栏核心导航；
  * **Label Medium (12px / 行高 16px)**：状态 Badge 胶囊、辅助时间戳、表单 Field Label；
  * **字重统一采用 `600 (Semibold)`**：赋予按钮与控件明确的“可点击/可交互”实体边界。

### 3. 字重双锚点法则（Weight Two-Anchor Rule · 跨平台防翻车）
* **物理事实**：Windows 微软雅黑本质上仅有 400 与 700 两个物理字重，写 500 会回落为 400 或触发边缘发虚的伪粗体；macOS 苹方具备原生 500/600。
* **工程铁律**：**全系统严格收敛为 400 与 600 两个离散字重锚点，严禁使用 500/550/800 等模糊值**：
  * **`Regular (400)`**：承担 100% 的阅读内容与常规正文；
  * **`Semibold (600)`**：承担 100% 的交互标签、高密条目标题与关键状态（在 Win 上安全触发真实加粗，在 Mac 上精准命中 Semibold，两端落差皆清晰）。

### 4. 4px 乘数固定行高模数（Fixed Line-Height Tokens）
摒弃不可控的任意浮点行高，所有行高必须整除 **4px**，使文本外边框天然咬合 4px/8px 空间网格：
* `font-size: 16px` $\to$ `line-height: 24px` ($1.50\times$)
* `font-size: 14px` $\to$ `line-height: 20px` ($1.43\times$)
* `font-size: 12px` $\to$ `line-height: 16px` ($1.33\times$)
* `font-size: 24px` (Headline) $\to$ `line-height: 32px` ($1.33\times$)

### 5. 逆向 Tracking 光学补偿曲线（Letter Spacing）
依据 M3 光学补偿公理，消除“大字松散、小字糊死”的光学错觉：
* **大标题（$\ge 20$px）**：字母/汉字天然外轮廓留白放大，强制设置微紧字间距：
  `letter-spacing: -0.01em ~ -0.02em`（防止大字散架）；
* **小尺寸标签（$\le 12$px）**：像素网格导致笔画粘连，强制追加微正间距：
  `letter-spacing: 0.02em ~ 0.04em`（撑开负空间，保证低点阵下清晰可读）；
* **常规正文（14~16px）**：`letter-spacing: 0`（保持自然字偶距）。

### 6. 黄金行长（Measure）与垂直节拍
* **Measure 黄金带**：长文本阅读容器强制 `max-width: 65ch`（约 640px~760px / 30~45 汉字），杜绝宽屏拉通；
* **段落节拍**：段落底部留白强制为相对单位 `margin-block-end: 0.85em`，严禁小于行距。

---

## 二、 三阶段工作模式契约

### 模式 1：`--mode=diagnostic`（事前排查 / 截图初评）
* **定位**：纯只读静态分析器。**严禁修改任何代码。**
* **扫描项目**：
  1. 扫描长文文本容器是否缺失 65ch 宽度上限；
  2. 扫描是否出现 10px、11px、13px、13.5px、15px 等脱离 M3 双轨制的非标字号；
  3. 扫描是否在长文本正文中滥用了加粗（字重 $>400$）；
  4. 扫描行高是否违背 4px 乘数（出现非标浮点导致网格抖动）。
* **输出**：结构化的《排印病灶清单》。

---

### 模式 2：`--mode=patch`（设计执行 / 规范化补丁）
* **定位**：原子级补丁生成器。
* **执行逻辑**：
  1. 在全局 CSS 注入标准 M3 双轨与行高变量：
     ```css
     :root {
       --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif;
       
       /* 阅读轨道 (Body) */
       --body-large-size: 16px;
       --body-large-lh: 24px;
       --body-medium-size: 14px;
       --body-medium-lh: 20px;
       
       /* 界面控件轨道 (Label) */
       --label-large-size: 14px;
       --label-large-lh: 20px;
       --label-large-weight: 600;
       --label-medium-size: 12px;
       --label-medium-lh: 16px;
       --label-medium-weight: 600;
       
       /* 测度与节拍 */
       --measure-body: 65ch;
       --rhythm-paragraph: 0.85em;
     }
     ```
  2. 针对主问答正文容器注入 `max-width: var(--measure-body)`，挂载 16px/24px 变量；
  3. 针对按钮、Tab 标签挂载 Label 变量（14px/20px/600字重）；
  4. 针对 $\le 12$px 胶囊自动追加 `letter-spacing: 0.02em`。

---

### 模式 3：`--mode=verification`（事后审核 / 终审门禁）
* **定位**：交付前客观硬红线闸门。
* **执行逻辑**：
  * [ ] 全屏长文本单行字符是否超过 75 字符（Measure 逃逸）；
  * [ ] 是否残留非标奇数字号；
  * [ ] 行高是否偏离 4px 模数（导致垂直网格错位）；
* **主观裁决移交**：排版微调后的整体语感、气质与行文舒适度，**100% 移交设计师肉眼终审**。
