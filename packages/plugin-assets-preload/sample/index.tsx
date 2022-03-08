import './index.less'

import { IRouteComponentProps } from 'umi'
import PreloadAssets from '@dogedefi/plugin-assets-preload'
import Loading from '@/components/Loading'
import preImages from './preload.hash.json'

export default function Layout({ children, location }: IRouteComponentProps) {
  return (
    <PreloadAssets.Suspense
      loading={
        <div className="entrance-loading">
          <Loading />
        </div>
      }
    >
      <PreloadAssets config={preImages} />
    </PreloadAssets.Suspense>
  )
}
