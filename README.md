# 听说激活

一份 12 周英语听说激活训练站。面向「阅读词汇有底子、听说长期脱节」的学习者：绕过应试语法，每天 90 分钟，分三个阶段打通声音与意义。

- 阶段一（1–4 周）：语音重塑与耳朵唤醒
- 阶段二（5–8 周）：语块积累与思维直连
- 阶段三（9–12 周）：实战脱敏与即时反应

界面为简体中文，练习内容为英语。进度保存在浏览器 `localStorage`，录音保存在 `IndexedDB`，无后端、无账号。

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 构建

```bash
npm run lint
npm run build
```

## 说明

站内朗读使用浏览器 `speechSynthesis`（优先 en-US），只是随时可练的替代。连读、气口和情绪请回到 Rachel's English、ESL Pod、BBC 6 Minute English、All Ears English 等原声材料。
