export enum MessageActions {
    SIGN = "SIGN",
    EDIT = "EDIT",
    DELETE = "DELETE",
    SHOW_DETAIL = "SHOW_DETAIL",
    CHECK_OPTIONS = "CHECK_OPTIONS",
    PRINT = "PRINT",
    DUPLICATE = "DUPLICATE",
    SEND = "SEND",
}

export function displayActions(actions: string): string[] {
    // Split actions 
    let splitActions = actions.split(",")
    
    if (splitActions === undefined || splitActions.length === 0) {
        return []
    }

    return splitActions
}