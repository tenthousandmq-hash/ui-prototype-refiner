const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const url = process.argv[2];
const outPath = process.argv[3];
const width = process.argv[4] || 1440;
const height = process.argv[5] || 900;

if (!url || !outPath) {
  console.log('Usage: node capture_screenshot.js <url> <outPath> [width] [height]');
  process.exit(1);
}

let edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
if (!fs.existsSync(edgePath)) {
  edgePath = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
}

const outDir = path.dirname(path.resolve(outPath));
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const cmd = `"${edgePath}" --headless=new --disable-gpu --disable-software-rasterizer --disable-extensions --disable-background-networking --disable-default-apps --disable-sync --no-sandbox --no-first-run --window-size=${width},${height} --screenshot="${path.resolve(outPath)}" "${url}"`;

try {
  execSync(cmd, { stdio: 'pipe' });
  if (fs.existsSync(outPath)) {
    const size = fs.statSync(outPath).size;
    console.log(`[Success] 截图成功: ${outPath} (${size} 字节)`);
  } else {
    console.error(`[Error] 截图文件未生成: ${outPath}`);
    process.exit(1);
  }
} catch (err) {
  if (fs.existsSync(outPath)) {
    const size = fs.statSync(outPath).size;
    console.log(`[Success] 截图成功: ${outPath} (${size} 字节)`);
  } else {
    console.error('[Error] 截屏失败:', err.message);
    process.exit(1);
  }
}
