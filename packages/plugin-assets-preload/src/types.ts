import { ReactNode } from 'react'

export interface PreloadImageProps {
  image: string
}

export interface PreloadSuspenseProps {
  children: ReactNode
  loading: ReactNode
}

export interface PreloadAssetsProps {
  config: any
}
