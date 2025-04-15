const axios = require("axios");
const fs = require("fs");
const path = require("path");

// 确保 output 文件夹存在
const outputDir = path.join(__dirname, "..", "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function txt2img() {
  console.log("⏳ 正在发送请求到 SD WebUI...");
  try {
    const res = await axios.post(
      "http://127.0.0.1:7860/sdapi/v1/txt2img",
      {
        prompt: "cat",
        steps: 20,
        width: 512,
        height: 512
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const base64Image = res.data.images[0];
    
    // 生成带时间戳的文件名
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").replace(/\s/g, "").trim();
    const filename = path.join(outputDir, `output-${timestamp}.png`);
    console.log("📝 即将保存到路径：", filename);

    fs.writeFileSync(filename, Buffer.from(base64Image, "base64"));
    console.log(`✅ 成功生成图像，保存为 ${filename}`);
  } catch (err) {
    console.error("❌ 请求失败:", err.message);
    if (err.response?.data) {
      console.error("详细错误信息:", err.response.data);
    }
  }
}

txt2img();
