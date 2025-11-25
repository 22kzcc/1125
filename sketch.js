let spriteSheet;
let leftSprite; // 來自資料夾 2/all.png 的精靈表
// 單一幀寬度為 整張圖寬 255 / 5 幀 = 51
const FRAME_W = 51;
const FRAME_H = 47;
const TOTAL_FRAMES = 5;
// 左向精靈（2/all.png）參數：每格 35x44，共 3 幀
const LEFT_FRAME_W = 45;
const LEFT_FRAME_H = 45;
const LEFT_TOTAL_FRAMES = 3;

// 角色座標與速度
let playerX;
let playerY;
const MOVE_SPEED = 4;

const FRAME_DELAY = 7; // 切換間隔（以 draw() 的 frame 計數為單位）

function preload() {
  spriteSheet = loadImage('1/all.png');
  // 載入位於資料夾 2 的 all.png（按左鍵時使用）
  leftSprite = loadImage('4/all.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  // 初始位置置中
  playerX = width / 2;
  playerY = height / 2;
}
function draw() {
  // 背景色：#cea395ff
  background('#f5c9eaff');

  // 選擇要顯示的精靈表與參數：按住左箭鍵時使用 leftSprite
  let img = spriteSheet;
  let fw = FRAME_W;
  let fh = FRAME_H;
  let tf = TOTAL_FRAMES;

  if (keyIsDown(LEFT_ARROW) && leftSprite) {
    img = leftSprite;
    fw = LEFT_FRAME_W;
    fh = LEFT_FRAME_H;
    tf = LEFT_TOTAL_FRAMES;
  }

  // 計算目前幀
  const idx = floor(frameCount / FRAME_DELAY) % tf;
  const sx = idx * fw;
  const sy = 0;

  // 放大三倍
  const SCALE = 3;
  const drawW = fw * SCALE;
  const drawH = fh * SCALE;

  // 按住左鍵時移動
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= MOVE_SPEED;
  }

  // 邊界限制（確保不會移出畫面）
  playerX = constrain(playerX, drawW / 2, width - drawW / 2);

  // 繪製在 playerX/playerY（靠左下對齊改為置中）
  const dx = playerX - drawW / 2;
  const dy = playerY - drawH / 2;

  // 使用 image(img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight)
  image(img, dx, dy, drawW, drawH, sx, sy, fw, fh);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
