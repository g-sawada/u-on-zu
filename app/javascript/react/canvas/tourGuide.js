import { TourGuideClient } from "@sjmc11/tourguidejs/src/Tour" 

export const tourGuide = () => {
  const tg = new TourGuideClient({
    steps: tourSteps,
    showStepProgress: false,
    exitOnClickOutside: false,
    dialogWidth: 500,
    dialogMaxWidth: 500,
    targetPadding: 20,
    nextLabel: "次へ",
    prevLabel: "戻る",
    finishLabel: "終了",
  });
  tg.start();
  console.log("TourGuide started successfully");
}

const tourSteps = [
  {
    title: "「U-ON-ZU!」へようこそ！",
    content: "ここはグラフを作成するメイン画面です。<br> 使い方を簡単にご説明します！",
    order: 1
  },
  {
    title: "操作パネル",
    content: "この操作パネルから、様々な機能を呼び出しましょう！",
    target: "#tour-two",
    order: 2,
  },
  {
    title: "デザインバーを開く",
    content: "ここをクリックすると右側に<strong>デザインバー</strong>が開き、グラフの見た目やレイアウトを細かく調整できます。<br>ログインすると、<strong>テンプレート機能</strong>も使えるようになります！",
    target: "#tour-three",
    order: 3,
  },
  {
    title: "都市データを呼び出す",
    content: "下パネルを開いて、都市データを呼び出しましょう！<br><strong>都市名を入力して検索</strong>したり、<strong>地図から選択</strong>することもできます。",
    target: "#tour-four",
    order: 4,
  },
  {
    title: "マイグラフに保存する",
    content: "気に入ったグラフは、<strong>マイグラフに保存</strong>しましょう<br>保存したマイグラフは、左上のメニューからアクセスできます。<br><strong>（こちらはログイン限定機能です。ぜひご登録を！）</strong>",
    target: "#tour-five",
    order: 5,
  },
  {
    title: "画像ファイルに出力する",
    content: "このボタンから、作成したグラフを<strong>画像ファイル（png）で簡単に出力できます！</strong><br>画質をよくしたい場合は、出力時のサイズを大きくして下さい",
    target: "#tour-six",
    order: 6,
  },
  {
    title: "レッツ U-ON-ZU! ",
    content: "<strong>さっそくグラフを作成してみましょう！</strong><br>このメイン画面には、左上のロゴ<strong> U-ON-ZU! </strong>からいつでも戻ってくることができます。",
    order: 7,
  },
]

export const tourOptions = {
  dialogWidth: 600,
  dialogMaxWidth: 600,
  dialogPlacement: "right",
}
