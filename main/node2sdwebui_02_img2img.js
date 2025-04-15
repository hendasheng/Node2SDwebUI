const axios = require("axios");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 创建 output 文件夹（如果不存在）
const outputDir = path.join(__dirname, "..", "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 创建命令行输入接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("请输入参考图路径（例如 ./input.png）：", async (inputPathRaw) => {
  rl.close();
  const inputPath = path.resolve(inputPathRaw.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1"));


  // 检查文件是否存在
  if (!fs.existsSync(inputPath)) {
    console.error("❌ 找不到该文件:", inputPath);
    return;
  }

  console.log("⏳ 正在发送请求到 SD WebUI...");

  try {
    // 读取图片并转为 base64
    const inputImageBase64 = fs.readFileSync(inputPath, { encoding: "base64" });

    const res = await axios.post(
      "http://127.0.0.1:7860/sdapi/v1/img2img",
      {
        init_images: [`data:image/png;base64,${inputImageBase64}`],
        prompt: "cat",
        denoising_strength: 0.6,
        steps: 20,
        width: 1024,
        height: 1024
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // 保存输出图像
    const base64Image = res.data.images[0];
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = path.join(outputDir, `img2img-${timestamp}.png`);
    fs.writeFileSync(filename, Buffer.from(base64Image, "base64"));
    console.log(`✅ 成功生成图像，保存为 ${filename}`);
  } catch (err) {
    console.error("❌ 请求失败:", err.message);
    if (err.response?.data) {
      console.error("详细错误信息:", err.response.data);
    }
  }
});
