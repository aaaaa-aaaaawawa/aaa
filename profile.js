const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d'); // 絵を描くための筆と絵の具を用意するよ

// キャンバスの大きさを画面いっぱいに合わせるおまじない
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 画面の大きさが変わったら、キャンバスも合わせるおまじない
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.height; // ここも height に修正したよ！
    // 画面サイズが変わったら、卵型の位置も再計算した方がいいかもしれないね
    // その場合は、shapes の初期設定も resize イベントの中に入れるか、
    // recalculateShapesPosition() のような関数を作って呼び出すといいよ。
    // 今回はシンプルにするために、まずはこのままで試してみてね。
});

// 卵型の丸（楕円）を描く魔法の関数
// x, y は中心の位置、radiusX, radiusY は横と縦の大きさ、rotationは傾き、colorは色
function drawEllipse(x, y, radiusX, radiusY, rotation, color) {
    ctx.beginPath(); // 新しい絵を描き始めるよ
    ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2); // 卵型を描くよ
    ctx.fillStyle = color; // 色を決めるよ
    ctx.fill(); // 塗りつぶすよ
}

// 動く卵型の情報を入れる箱を用意するよ
// 大きな卵型2つと、その中の小さな卵型2つ
const shapes = [
    {
        // 左上の大きな卵型
        x: canvas.width * 0.2, // ちょっと左に
        y: canvas.height * 0.2, // ちょっと上に
        radiusX: 200, radiusY: 150, // 大きさ
        rotation: Math.PI / 4, // 最初はちょっと斜め
        color: 'rgb(236, 229, 224)', // 薄い白
        speed: 0.001, // 回る速さ
        child: { // その中の小さな卵型
            radiusX: 100, radiusY: 80,
            rotation: -Math.PI / 6,
            color: 'rgba(236, 111, 34, 0.72)', // もう少し濃い白
            speed: -0.002 // 逆方向に回る速さ
        }
    },
    {
        // 右下の大きな卵型
        x: canvas.width * 0.8, // ちょっと右に
        y: canvas.height * 0.8, // ちょっと下に
        radiusX: 250, radiusY: 180,
        rotation: -Math.PI / 3,
        color: 'rgba(236, 229, 224)',
        speed: -0.0015,
        child: {
            radiusX: 120, radiusY: 90,
            rotation: Math.PI / 5,
            color: 'rgba(236, 111, 34, 0.72)',
            speed: 0.0025
        }
    }
];

// 絵を動かすアニメーションの魔法！
function animate() {
    // キャンバスを一度きれいに消すよ
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // それぞれの卵型について、絵を描いて回すよ
    shapes.forEach(shape => {
        // 大きな卵型を描く
        drawEllipse(shape.x, shape.y, shape.radiusX, shape.radiusY, shape.rotation, shape.color);
        // 回る魔法
        shape.rotation += shape.speed;

        // その中の小さな卵型を描く
        // 親の回転に子も影響させるために shape.rotation を足しているよ
        drawEllipse(shape.x, shape.y, shape.child.radiusX, shape.child.radiusY, shape.child.rotation + shape.rotation, shape.child.color); 
        // 回る魔法
        shape.child.rotation += shape.child.speed;
    });

    // 次の絵を描く準備をしてね、ってお願いするよ（これでスムーズに動くんだ）
    requestAnimationFrame(animate);
}

// アニメーションを始めるよ！
animate();