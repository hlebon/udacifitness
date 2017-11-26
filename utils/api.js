import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY } from './_calendar'

export function submitEntry({ entry, key }){
    AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]:  entry
    }))
}

export function removeEntry(key){
    return AsyncStorage.getItem(ca.CALENDAR_STORAGE_KEY)
        .then(result => {
            const data = JSON.parse(result)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY)
        })
}