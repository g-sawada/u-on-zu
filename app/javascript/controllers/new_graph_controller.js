import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.addEventListener('click', this.handleClick.bind(this))
  }

  handleClick(event) {
    if (!confirm('新しくグラフを作成しますか？\n（保存していない内容は失われます）')) {
      event.preventDefault()
    } else {
      // ここに実行したいJavaScriptのコードを書く
      localStorage.removeItem('cityId');
      localStorage.removeItem('settingValues');
    }
  }
}