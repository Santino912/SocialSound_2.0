import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const setNotiWatched = async (req: Request, res: Response) => {

    const { _id } = req.params;

    try {
        const notification = await Notifications.findOneAndUpdate({ _id }, { watched: true })
        const user = await Users.findOne({ _id })

        const notifications = await Notifications.aggregate([
            { $match: { _id: user?._id } },
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
            }])
        return res.send(notifications)

    } catch (err) {
        return res.status(500).send(err);
    }
};

export default setNotiWatched;