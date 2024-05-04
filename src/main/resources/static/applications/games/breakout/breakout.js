const ball = document.querySelector('.ball'); // ボール要素を取得
const paddle = document.querySelector('.paddle'); // パドル要素を取得
const blocksContainer = document.querySelector('.blocks'); // ブロックの親要素を取得
const blocks = []; // ブロック要素を格納する配列

// ブロックを生成
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 8; j++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.top = `${i * 30}px`;
    block.style.left = `${j * 70}px`;
    blocksContainer.appendChild(block);
    blocks.push(block);
  }
}

let ballX = 300; // ボールのx座標
let ballY = 200; // ボールのy座標
let ballSpeedX = 2; // ボールのx方向の速度
let ballSpeedY = 2; // ボールのy方向の速度

// メインのゲームループ
function update() {
  // ボールを移動させる
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // 壁との衝突判定
  if (ballX < 0 || ballX > 580) {
    ballSpeedX *= -1; // x方向の速度を反転
  }
  if (ballY < 0) {
    ballSpeedY *= -1; // y方向の速度を反転
  }

  // パドルとの衝突判定
  if (ballY > 380 && ballX > paddle.offsetLeft && ballX < paddle.offsetLeft + 100) {
    ballSpeedY *= -1; // y方向の速度を反転
  }

  // ブロックとの衝突判定
  blocks.forEach(block => {
    if (ballY < block.offsetTop + 20 && ballY > block.offsetTop &&
        ballX > block.offsetLeft && ballX < block.offsetLeft + 50) {
      const index = blocks.indexOf(block);
      blocks.splice(index, 1); // 衝突したブロックを配列から削除
      block.style.display = 'none'; // 衝突したブロックを非表示にする
      ballSpeedY *= -1; // y方向の速度を反転
    }
  });

  // ゲームオーバー判定
  if (ballY > 400) {
    alert('ゲームオーバー！');
    document.location.reload(); // ゲームをリロードして再開
  }

  // ボールの位置を更新
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  requestAnimationFrame(update); // 次のフレームをリクエスト
}

update(); // ゲームループを開始

// マウスでパドルを移動させる
document.addEventListener('mousemove', e => {
  paddle.style.left = `${e.clientX - 50}px`; // マウスのx座標からパドルの位置を設定
});
