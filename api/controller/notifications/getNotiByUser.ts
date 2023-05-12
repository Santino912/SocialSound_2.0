import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const getNotiByUser = async (req: Request, res: Response) => {
    const { _id } = req.params;

    try {
        const user = await Users.findOne({ _id })

        const notifications = await Notifications.aggregate([{ $match: { to: user?._id } }, {
            $lookup: {
                from: "users",
                localField: "fromUser",
                foreignField: "_id",
                as: "fromUser",
            }
        }, {
            $set: { fromUser: { $arrayElemAt: ["$fromUser", 0] } }
        }, { $sort: { watched: true ? 1 : -1 } }])

        return res.send(notifications)
    } catch (error) {

        return res.status(500).send(error);
    };
};

export default getNotiByUser;