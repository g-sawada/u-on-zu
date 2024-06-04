import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.addEventListener('click', this.handleClick.bind(this))
  }

  handleClick(event) {
    if (!confirm('新規グラフを作成しますか？')) {
      event.preventDefault()
    } else {
      // ここに実行したいJavaScriptのコードを書く
    }
  }
}