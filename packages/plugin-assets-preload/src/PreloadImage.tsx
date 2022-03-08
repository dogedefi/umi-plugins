// new a image instance by memory way
import { useImage } from 'react-image'
import { PreloadImageProps } from './types'

const PreloadImage = ({ image }: PreloadImageProps) => {
  image && useImage({ srcList: image })
  return null
}
PreloadImage.defaultProps = {
  imageList: []
}

export default PreloadImage
