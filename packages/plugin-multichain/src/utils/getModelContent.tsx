// TODO extra these code as a hook to web3-connector
export default () => `
import { useState, useEffect } from 'react';
import { Models } from '../../plugin-model/useModel';
import { initChainModel } from 'web3-connector'
export type Chain = Models<'@@chain'>;
export default () => {
  return initChainModel();
}
`
