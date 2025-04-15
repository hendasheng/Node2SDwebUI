# NODE2SDwebUI

[简体中文](README.md) | [English](README_EN.md)

## Install Stable Diffusion Web UI  
`https://github.com/AUTOMATIC1111/stable-diffusion-webui`

### Make sure the API mode of SD Web UI is enabled  
- Open the `webui-user.bat` file  
- Locate the line: `set COMMANDLINE_ARGS=`  
- Modify it to: `set COMMANDLINE_ARGS=--api`

## Install NODE2SDwebUI  
`git clone https://github.com/hendasheng/Node2SDwebUI.git`

## Run  
- Start Stable Diffusion Web UI in API mode:  
    - `cd A1111_stable-diffusion-webui`  
    - `cd webui`  
    - `.\webui-user.bat --api`

- Run NODE2SDwebUI:  
    - `cd NODE2SDWEBUI`  
    - `cd main`  
    - `node node2sdwebui_01_tex2img.js`
