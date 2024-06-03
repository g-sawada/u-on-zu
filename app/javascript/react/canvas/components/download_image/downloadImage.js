export const downloadImage = async (outputHeight, outputWidth, outputFileName) =>  {
  const input = document.querySelector('#main-graph')
  console.log('outputHeight:', outputHeight)
  console.log('outputWidth:', outputWidth)
  console.log('outputFileName:', outputFileName)

  // Google Fontsからフォントを取得してbase64エンコードする関数
  const fetchAndEncodeFont = async (fontUrl) => {
    const response = await fetch(fontUrl);
    const fontBlob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.readAsDataURL(fontBlob);
    });
  };

  const svgData = new XMLSerializer().serializeToString(input)
  const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)))
  const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`

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

    // ダウンロードリンクを作成
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = fileName
    link.click() // ダウンロードを開始
  })
  image.src = svgDataUrl
}

