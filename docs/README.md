# NODE2SDwebUI

[简体中文](README.md) | [English](README_EN.md)

## 安装 Stable Diffusion web UI
`https://github.com/AUTOMATIC1111/stable-diffusion-webui`

### 确保 SD web UI AIP 模式正确启用
- 打开 webui-user.bat 文件；
- 找到 `set COMMANDLINE_ARGS=`;
- 修改为 `set COMMANDLINE_ARGS=--api`;

## 安装 NODE2SDwebUI
`git clone https://github.com/hendasheng/Node2SDwebUI.git`

## 运行
- 启动 Stable Diffusion web UI API 模式：
    - `cd A1111_stable-diffusion-webui`
    - `cd webui`
    - `.\webui-user.bat --api`
    
- 运行 NODE2SDwebUI：
    - `cd NODE2SDWEBUI`
    - `cd main`
    - `node node2sdwebui_01_tex2img.js`