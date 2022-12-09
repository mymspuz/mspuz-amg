import { LocalStorageAdapter } from './LocalStorageAdapter'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => new LocalStorageAdapter()