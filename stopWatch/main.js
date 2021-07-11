//htmlのclassを取得
//取得したデータに変数を代入
let time =document.querySelector('.time');
let start =document.querySelector('.start');
let stop =document.querySelector('.stop');
let reset =document.querySelector('.reset');

//スタート時刻
let startTime;
//経過時間 
let elapsedTime = 0;
//ストップ後再開するとき0にならないための変数
let timeToadd = 0;
//ストップボタンを押してclearTimeoutを使うときの引数を渡すための変数
let timeId;
//秒数
let sc;

//ミリ秒を分と秒に直すための関数
function timeDisplay(){
  
//math.floor（数値）で小数点以下の切り捨て
//m(分) = elapsedTime / 60000ミリ秒で割った数の商　
let m = Math.floor(elapsedTime / 60000);

//s(秒) = elapsedTime % 60000ミリ秒 / 1000 (ミリ秒なので1000で割ってやる)
if(elapsedTime >= 60000){
sc = Math.floor(elapsedTime % 60000 / 1000);
}else{
sc = Math.floor(elapsedTime / 1000);
}
// ミリ秒まで求める場合
//ms(ミリ秒) = elapsedTime % 100;  1000ミリ秒で割った数の余り×10の整数部分がms
let ms = Math.floor((elapsedTime % 1000) / 100) ;

//秒数は二桁にしたので末尾二桁を取得する
sc = ('0' + sc).slice(-2);
 
 //HTMLのclass　time部分に表示させる　
 time.textContent = m + ':' + sc + ':' + ms;
}

//
function countUp(){
 timeId = setTimeout(function(){
//経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
 elapsedTime = Date.now() - startTime + timeToadd; 
 timeDisplay();
//countUp関数自身を呼ぶことで100ミリ秒毎に以下の計算を始める
countUp();

},100);
}


//startボタンにclickイベントを追加
start.addEventListener("click",function(){
//条件分岐、スタートボタンを連続で押した時のエラーを防ぐ
  if(elapsedTime===timeToadd){ 
//startTimeに現在時刻（Date.now）を代入
startTime = Date.now();

//経過時間を計測する関数を呼び出す
countUp();
}
 else{
 
 }
});

//stopボタンにclickイベントを追加
stop.addEventListener("click",function(){
  
//setTimeoutを終了する
clearTimeout(timeId);

//先に定義したelapsedtimeは現在時刻からスタートボタンを押した時刻を引いたものなので
//スタートボタンを押した時点で0になってしまう
//なのでスタート時間からストップ時間までの経過時間を足してあげなければならない。
//elapsedTime = Date.now - startTime + timeToadd 
//(timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
timeToadd += Date.now() - startTime;
});

//resetボタンにclickイベントを追加
reset.addEventListener("click",function(){

//リセットするのでelapsedTimeは0にする
elapsedTime = 0;

//ここも0に初期化
timeToadd = 0;

//0になったタイムを表示する
timeDisplay();
})

