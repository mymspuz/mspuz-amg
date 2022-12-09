import {TAuthLocalstorage} from "../../AuthTypes";

interface IGetStorage {
    get: (key: string) => TAuthLocalstorage
}

interface ISetStorage {
    set: (key: string, value: TAuthLocalstorage) => void
}

export class LocalStorageAdapter implements IGetStorage, ISetStorage {
    set(key: string, value: TAuthLocalstorage): void {
        if (Object.keys(value).length !== 0 && value.token) {
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            localStorage.removeItem(key)
        }
    }

    get(key: string): TAuthLocalstorage {
        const candidate = JSON.parse(String(localStorage.getItem(key)))
        const temp: TAuthLocalstorage = {
            token: ''
        }
        return candidate ? candidate : temp
    }
}