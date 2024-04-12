import type { colors } from './colors';

export type ColorTypes = keyof typeof colors;
export type ColorValuesTypes = (typeof colors)[ColorTypes];
