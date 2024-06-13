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
      
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png')
    })

    image.src = svgDataUrl
  })
}

