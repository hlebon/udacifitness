export const ADD_ENTRY = "ADD_ENTRY" 
export const RECIEVE_ENTRIES = "RECIEVE_ENTRIES"


export function addEntry(entry){
    return {
        type: ADD_ENTRY,
        entry
    }
}

export function recieveEntries(entries){
    return {
        type: RECIEVE_ENTRIES,
        entries
    }
}