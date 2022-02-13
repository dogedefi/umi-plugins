export default () => `
import { useState, useEffect } from 'react';
import { Models } from '../../plugin-model/useModel';
import { chainLocalKey, setupNetwork, Chain as DataType, chains } from '@big3lib/dapp-connector'
export type Chain = Models<'@@chain'>;
const defaultChain = { name: 'BSC', config: chains.BSC }
export default () => {
  const [chain, setChain] = useState<DataType | undefined>()

  // initial chain config
  useEffect(() => {
    let chainConfig = localStorage.getItem(chainLocalKey)

    if (!chainConfig) {
      setChain(defaultChain)
      setupNetwork(defaultChain)
    }
    // must be a json object
    else if (chainConfig.startsWith('{') && chainConfig.endsWith('}')) {
      const cachedChain = JSON.parse(chainConfig)
      setChain(cachedChain)
      setupNetwork(cachedChain)
    } else {
      localStorage.clear()
      location.reload()
    }
  }, [])

  return { chain, setChain }
}
`;
