import { Request, Response } from "express"
import Users from "../../models/Users"
import { userError } from "./utils"

const updateUser = async (req: Request, res: Response) => {
    const { _id } = req.params
    const { avatar, banner, name, username } = req.body
    try {
        const nameExist = await Users.findOne({ name })
        const usernameExist = await Users.findOne({ username })
        const userToUpdate = await Users.findOne({ _id })
        await Users.findOneAndUpdate({ _id }, { avatar, banner })

        if (nameExist?._id !== userToUpdate?._id && nameExist?.name !== undefined || usernameExist?.username !== undefined) {
            const string = userError(usernameExist?.username, nameExist?.name)
            return res.send(string)
        }

        const user = await Users.findOneAndUpdate({ _id }, { name, username })

        console.log(user)

        return res.send("User Updated")
    } catch (err) {
        console.log(err)
    }
}

export default updateUser