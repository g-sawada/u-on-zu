import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.addEventListener('click', this.handleClick.bind(this))
  }

  handleClick(event) {
    if (!confirm('一時的に保存されている内容があります。\n新しくグラフを作成しますか？')) {
      event.preventDefault()
    } else {
      // ここに実行したいJavaScriptのコードを書く
      localStorage.removeItem('cityId');
      localStorage.removeItem('settingValues');
    }
  }
}