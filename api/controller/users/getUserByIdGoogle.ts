import { Request, Response } from "express"
import Users from "../../models/Users"

const getUserByidGoogle = async (req: Request, res: Response) => {
    const { idGoogle } = req.params
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
        return res.send(user[0])
    } catch (err) {
        return console.log(err)
    }
}
export default getUserByidGoogle