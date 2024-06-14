export const createThumbnail = async () =>  {
  return new Promise((resolve) => {
    const input = document.querySelector('#main-graph')

    const height = input.getAttribute('height')
    const width = input.getAttribute('width')

    const svgData = new XMLSerializer().serializeToString(input)
    const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)))
    const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`
    
    const image = new Image()

    image.addEventListener('load', () => {    

      const canvas = document.createElement('canvas')

      canvas.setAttribute('height', height)
      canvas.setAttribute('width', width)

      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, width, height)

      const dataUrl = canvas.toDataURL('image/png', 1) // 1は画質の設定の最高値
      resolve(dataUrl)
    })
    
    image.src = svgDataUrl
  })
}
