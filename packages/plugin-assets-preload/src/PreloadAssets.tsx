import { Suspense } from 'react'
import { useMemo, Fragment } from 'react'
import useApp from './useApp'
import PreloadImage from './PreloadImage'
import { useLocation } from 'umi'
import { PreloadSuspenseProps, PreloadAssetsProps } from './types'

// TODO CDN
export const generateImageList = (files: string[]) => {
  return files.map(file => `${location.origin}/static/${file}`)
}

export const deviceTypes = {
  MOBILE: 'mobile',
  PC: 'pc'
}

const PreloadAssets = ({ config }: PreloadAssetsProps) => {
  const { isMobile } = useApp()
  const location = useLocation()

  const preloadImages = useMemo(() => {
    try {
      const device = isMobile ? deviceTypes.MOBILE : deviceTypes.PC
      const commonFiles = config[device].common
      const pageFiles = config[device].pages[location.pathname]
      return commonFiles.concat(pageFiles)
    } catch (error) {
      console.warn(error)
      return []
    }
  }, [location])

  const assets = generateImageList(preloadImages)

  return (
    <Fragment>
      {assets.map(url => (
        <PreloadImage key={url} image={url} />
      ))}
    </Fragment>
  )
}

PreloadAssets.Suspense = (props: PreloadSuspenseProps) => {
  const { children, loading } = props

  return <Suspense fallback={<Fragment>{loading}</Fragment>}>{children}</Suspense>
}

export default PreloadAssets
