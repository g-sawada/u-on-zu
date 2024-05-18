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
    const width = input.getAttribute('width')
    const height = input.getAttribute('height')
    const canvas = document.createElement('canvas')

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, width, height)

    const dataUrl = canvas.toDataURL('image/png', 0.2) // 1は画質の設定の最高値
    output.src = dataUrl
  })
  console.log(svgDataUrl)
  image.src = svgDataUrl
}