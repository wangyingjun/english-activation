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

内置单词、例句和对话的朗读是用 Microsoft 神经网络语音（edge-tts，en-US-Ava / Andrew Multilingual）在构建时预先生成的 MP3。你自己写的句子仍用浏览器语音，并标为「机器朗读」。想听真人发音，可点「听真人」打开 YouGlish。生成音频：`npm run audio:gen`（需本地 Python 虚拟环境 `.venv-audio` 和 edge-tts）。
