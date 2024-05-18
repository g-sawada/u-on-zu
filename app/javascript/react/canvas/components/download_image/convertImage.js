export const convertImage = () =>  {
  const input = document.querySelector('#main-graph')
  const output = document.querySelector('#output')
  console.log(output)

  const svgData = new XMLSerializer().serializeToString(input)
  const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)))
  const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`

  // console.log(svgData)
  // console.log(encodeURIComponent(svgData))
  // console.log(unescape(encodeURIComponent(svgData)))
  // console.log(btoa(unescape(encodeURIComponent(svgData))))

  const image = new Image()

  image.addEventListener('load', () => {
    // const width = 1000
    // const height = 1000
    const width = input.getAttribute('width')
    const height = input.getAttribute('height')
    const canvas = document.createElement('canvas')

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, width, height)

    const dataUrl = canvas.toDataURL('image/png', 1) // 1は画質の設定の最高値
    output.src = dataUrl

    // ダウンロードリンクを作成
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'image.png' // デフォルトのファイル名を設定
    link.click() // ダウンロードを開始
  })
  console.log(svgDataUrl)
  image.src = svgDataUrl
}



// export const convertImage = () => {
//   const input = document.querySelector('#main-graph')
//   const output = document.querySelector('#output')

//   const svgData = new XMLSerializer().serializeToString(input)
//   const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)))
//   const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`

//   const image = new Image()

//   image.addEventListener('load', () => {
//     const width = input.getAttribute('width')
//     const height = input.getAttribute('height')
//     const canvas = document.createElement('canvas')

//     canvas.setAttribute('width', width)
//     canvas.setAttribute('height', height)

//     const context = canvas.getContext('2d')
//     context.drawImage(image, 0, 0, width, height)

//     canvas.toBlob((blob) => {
//       const dataUrl = URL.createObjectURL(blob)
//       output.src = dataUrl

//       // ダウンロードリンクを作成
//       const link = document.createElement('a')
//       link.href = dataUrl
//       link.download = 'image.png' // デフォルトのファイル名を設定
//       link.style.display = 'none'
//       document.body.appendChild(link)
//       link.click() // ダウンロードを開始
//       document.body.removeChild(link)
//     }, 'image/png', 0.2) // 1は画質の設定の最高値
//   })

//   image.src = svgDataUrl
// }









// export const convertImage = async () => {
//   const input = document.querySelector('#main-graph')
//   const output = document.querySelector('#output')

//   const svgData = new XMLSerializer().serializeToString(input)
//   const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)))
//   const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`

//   const image = new Image()

//   image.addEventListener('load', async () => {
//     const width = input.getAttribute('width')
//     const height = input.getAttribute('height')
//     const canvas = document.createElement('canvas')

//     canvas.setAttribute('width', width)
//     canvas.setAttribute('height', height)

//     const context = canvas.getContext('2d')
//     context.drawImage(image, 0, 0, width, height)

//     const dataUrl = canvas.toDataURL('image/png', 1) // 1は画質の設定の最高値
//     output.src = dataUrl

//     // ダウンロードリンクを作成
//     const opts = {
//       suggestedName: 'image.png',
//       types: [{
//         description: 'PNG file',
//         accept: {'image/png': ['.png']},
//       }],
//     };
//     const handle = await window.showSaveFilePicker(opts);
//     const writable = await handle.createWritable()
//     await writable.write(dataUrl)
//     await writable.close()
//   })

//   image.src = svgDataUrl
// }