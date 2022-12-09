import { makeLocalStorageAdapter } from '../LocalStorageAdapter'
import { TAuthLocalstorage } from '../../AuthTypes'

export const setCurrentAccountAdapter = (token: TAuthLocalstorage): void => {
    makeLocalStorageAdapter().set('auth', token)
}

export const getCurrentAccountAdapter = (): TAuthLocalstorage => {
    return makeLocalStorageAdapter().get('auth')
}