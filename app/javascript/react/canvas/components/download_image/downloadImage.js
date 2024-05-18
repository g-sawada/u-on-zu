export const downloadImage = (outputHeight, outputWidth, outputFileName) =>  {
  const input = document.querySelector('#main-graph')
  const output = document.querySelector('#output')
  console.log('outputHeight:', outputHeight)
  console.log('outputWidth:', outputWidth)
  console.log('outputFileName:', outputFileName)
  

  const svgData = new XMLSerializer().serializeToString(input)
  const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)))
  const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`

  // console.log(svgData)
  // console.log(encodeURIComponent(svgData))
  // console.log(unescape(encodeURIComponent(svgData)))
  // console.log(btoa(unescape(encodeURIComponent(svgData))))

  const image = new Image()

  image.addEventListener('load', () => {
    //空欄の場合の初期化
    if (outputHeight === '' || outputHeight <= 0) {
      outputHeight = input.getAttribute('height')
    }
    if (outputWidth === '' || outputWidth <= 0) {
      outputWidth = input.getAttribute('width')
    }
    if (outputFileName === '') {
      outputFileName = 'image.png'
    }
    
    const width = outputWidth
    const height = outputHeight
    const fileName = outputFileName

    const canvas = document.createElement('canvas')

    canvas.setAttribute('height', height)
    canvas.setAttribute('width', width)

    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, width, height)

    const dataUrl = canvas.toDataURL('image/png', 1) // 1は画質の設定の最高値
    output.src = dataUrl

    // ダウンロードリンクを作成
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = fileName
    link.click() // ダウンロードを開始
  })
  image.src = svgDataUrl
}

