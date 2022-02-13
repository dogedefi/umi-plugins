// @ts-ignore
export default (modelPath: string) => `
// @ts-ignore
import { Chain as ChainType } from '../${modelPath}';
export type Chain = ChainType;
export const __PLUGIN_INITIAL_STATE = 1;
`;
