export const userError = (userUsername: string | undefined, userName: string | undefined): String => {
    if (userUsername !== undefined && userName !== undefined) {
        return "This username and name already exist"
    }
    if (userUsername !== undefined) {
        return "This username already exist"

    } if (userName !== undefined) {
        return "This name already exist"
    }
    return ""
}