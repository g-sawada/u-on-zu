# U-ON-ZU!

**雨温図を自由に簡単に作成できるアプリです。**  
**作成したグラフは画像ファイルで保存したり，マイページに登録して管理することができます。**

**雨温図とは？**  
中学校社会・高校地理で学習に必ず用いられる，都市の気候の特徴をとらえるためのシンプルなグラフです。
<br>
<br>
### 例
| 札幌 | イスタンブール |
| ---- | ----|
|<img src="https://github.com/g-sawada/u-on-zu/assets/118000212/528d003d-67a8-4464-abd1-61be52460315" width=300px height=300px>|<img src="https://github.com/g-sawada/u-on-zu/assets/118000212/b1aef61c-ab2e-4a47-a396-a66a0f0e35c8" width=300px height=300px>|

<br>
<br>

## 開発背景
- 開発者は，高校で地理を専門に４年間教えてきました。
- 中学・高校を問わず，地理という科目において，**気候分野の学習は大変重要です**。都市や地域の気候的特徴の理解は，その土地の農業や衣食住，文化など，生活のおよそ全般を捉えるための重要な基盤となるためです。
- **「雨温図」** は，**この気候分野の学習において最も頻繁に用いられるグラフです。** あらゆる教科書・資料において，世界各国の都市の雨温図が掲載され，生徒たちはこのグラフからその都市・地域の気候的特徴を読み解きます。入試問題等でも頻繁に用いられるグラフです。
- 一方で，**指導する教員の視点では，教科書や資料集などの図版に頼るだけでは，量やバリエーションに不足を感じることが多くありました。**
  - 教科書や資料集に掲載されているグラフは，1つの気候パターンにつきせいぜい2都市ほどです。その少なさから，例えば，授業で使用したグラフを，そのまま演習プリントやテストで使用せざるを得ない現状がありました。使いまわしばかりしてしまうと，生徒が「グラフそのもの」を暗記してしまい，地理の本当の力を養うことにつながりません。
  - また，様々な資料からコピーをとって引用している先生もいらっしゃいましたが，出版社によってフォーマットが異なるため，見た目がそろわず，不格好な教材になってしまうケースがみられました。
- 開発者は在職中，雨温図作成ツールをMicrosoft Excelで開発し，教科の先生方に共有したところ，高く評価をしていただきました。
  - しかし，データを都度加工して貼り付けを行わなければならず煩雑であった点と，教員の平均的なICTスキルでは，デザインの調整の難易度が高く感じられた点が，解決の難しい課題として残っていました。
- **もっと様々な都市の雨温図を自由に，簡単に作成できれば，教員の準備負担は軽減され，何より，生徒たちにもっと高い地理力をつけることができる。** このように常々感じてきた私だからこそ，雨温図の作成に特化したWebアプリケーションを開発できると思いました。
<br>
<br>
<br>

## 想定するユーザー層
- 中学校・高校や，塾・予備校の先生方と，それらを志望する方々を想定しています。
- **教材準備のストレスを低減することと，教材研究のお手伝いをすること**が，このアプリの主な目的です。  
- 現場の先生方に直接お願いをして使用感を確かめてもらい，教員間の口コミやSNS等を通じて，利用者を拡大していきたいと考えています。
<br>
<br>
<br>

## 主な機能

- **ブラウザ上で簡単かつ自由にグラフを作成し，画像ファイルとしてダウンロードすることができます。**
- 都市の気候データは，気象庁のオープンデータ（[日本](https://www.data.jma.go.jp/stats/etrn/index.php)・[世界](https://www.data.jma.go.jp/cpd/monitor/climatview/list.php?r=0&y=2024&m=3&s=1&e=0&k=0)）を加工して提供します。**ユーザーは，一覧や地図から都市を選択するだけで利用できます。**
- 会員登録を行うことで，作成したグラフに名前をつけて**マイグラフに保存**することができます。マイグラフ一覧から，過去に作成したグラフを簡単に再利用できます。
- 会員登録すると，さらに，**独自のテンプレートを登録**することができます。
    - テンプレートは，例えば目盛り幅や色，サイズを「授業用」や「プリント用」などで切り替えたい場合にも便利です。


### ※ MVPリリース段階で実装したい機能
- グラフ作成機能（データは日本国内の都市のみ）
- データ検索・呼び出し機能（検索バーのみ）
- 画像保存機能
- 会員登録機能
- Google認証機能
- マイグラフ保存・管理機能
- マイテンプレート保存・管理機能

### ※ 本リリース段階で実装したい機能
- データを世界各地の都市に対応
- 地図からデータを呼び出す機能
- 作成したグラフをX（Twitter）に投稿できる機能
<br>
<br>
<br>

## 本アプリの強み
- 「開発背景」で述べたように，開発者自身が，Microsoft Excelを使って雨温図のためのグラフ作成ツールを開発した経験があり，グラフの作成と画像ファイル保存という機能に関しては，そちらでも実現可能です。また，他の有志の方で，雨温図作成のためのWebサイトを公開されている方が，わずかながらいらっしゃいます。
- その中で，本アプリの強みは，**①デザインの自由度と操作性の高さ，②APサーバーやDBサーバーを活用した本格的なWebアプリケーションとして，雨温図を作成・管理するユーザー一人一人のプラットフォームとなり得る点**です。
  - 従来のExcelファイルや既存のWebサイトでは，データの値を手作業で入力，または貼り付けしなくてはならないものが多く，作業が煩雑で，ヒューマンエラーも起こりやすい現状がありました。
  - また，ユーザーが自由にデザインを整えることができるWebサイトは，開発者の知る限りでは公開されておらず，またExcelのグラフデザインは，教員の平均的なICTスキルではやや難しいと感じられる部分がありました。
  - 本アプリは，予め気象庁のオープンデータを読み込ませておくことで，**都市のグラフを作成する際に，ユーザーがデータを直接入力する作業をカットしています。**また，フロントエンドの設計の工夫により，**快適なデータ検索をユーザーに提供できます。**
  - そして，グラフ作成ページのフロントエンドにReactと関連ライブラリを導入することにより，**ユーザーの求めるグラフを高い操作性で実現できます。**
  - また，会員登録することによって利用できるマイグラフ，マイテンプレート機能によって，**ユーザーは自身のローカルフォルダで画像ファイルをこまめに管理する必要がなくなります。** グラフや，グラフデザインの使いまわしが簡単にできることは，先生方の授業準備の負担をさらに下げるために重要です。
- これらの機能を備えた本アプリが，**「雨温図はこのサイトを頼れば間違いない！」** と，全国の先生方に認知して頂けるようになればよいと思います。  
<br>
<br>
<br>

## 画面詳細イメージ
[画面詳細_Figma](https://www.figma.com/file/tm5kt6WWiwtdMiF32TNVsF/U-ON-ZU-!-%E7%94%BB%E9%9D%A2%E8%A9%B3%E7%B4%B0?type=design&node-id=5%3A73&mode=design&t=aKWBFsUafU9xPbnW-1)
<br>
<br>
<br>

## 画面遷移図
[画面遷移図_Figma](https://www.figma.com/file/puS7wVPJZwSIEd4E0x9y94/U-ON-ZU!_%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3?type=design&node-id=0%3A1&mode=design&t=aKWBFsUafU9xPbnW-1)
<br>
<br>
<br>

## ER図
[ER図_draw.io](https://drive.google.com/file/d/1aweIviD0D0Oh7D-vAtwClrNGuOkHscD4/view?usp=sharing)
<br>
<br>
<br>

## 使用技術（予定）
| カテゴリ | 技術 | バージョン |
| ---- | ---- | ----|
| バックエンド | Ruby, Ruby on Rails | 3系 / 7系
| フロントエンド | Ruby on Rails / React / TypeScript | 7系 / 18.1.0 / 5.4 |
| CSSフレームワーク | TailwindCSS + daisyUI | ? |
| WebAPI | Google API |  |
| データベース | MySQL / AWS S3 | ? |
| 認証 | Devise ? Sorcery ? |
| 環境構築 | Docker |
| インフラ | Heroku |
| その他 | [Recharts](https://recharts.org/en-US/) |

