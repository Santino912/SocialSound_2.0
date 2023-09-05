import { Request, Response } from "express"
import Users from "../../models/Users"

const getUserByidGoogle = async (req: Request, res: Response) => {
    const { idGoogle } = req.params

    if (idGoogle === undefined) return res.send({ err: 4000, msg: "idGoogle is undefined" })

    try {
        const user = await Users.aggregate([
            { $match: { idGoogle } },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "user",
                    as: "likedPosts",
                },
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "user",
                    as: "likedVideo",
                    pipeline: [{ $match: { type: "video" } }]
                },
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "user",
                    as: "likedAudio",
                    pipeline: [{ $match: { type: "audio" } }]
                },
            },
            {
                $lookup: {
                    from: "notifications",
                    localField: "_id",
                    foreignField: "to",
                    as: "notifications",
                    pipeline: [{
                        $lookup: {
                            from: "users",
                            localField: "fromUser",
                            foreignField: "_id",
                            as: "fromUser",
                        }
                    }, { $set: { fromUser: { $arrayElemAt: ["$fromUser", 0] } } }]
                }
            },
        ])

        if (user[0] === undefined) return res.send({
            err: 4001, msg: "there is no user with this google id"
        })

        return res.send(user[0])
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}
export default getUserByidGoogle