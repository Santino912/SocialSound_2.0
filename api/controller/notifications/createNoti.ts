import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";
import Posts from "../../models/Posts";

const createNoti = async (req: Request, res: Response) => {

    const { title, content, fromUserId, idToUser, idPost } = req.body;

    try {

        const fromUser = await Users.findOne({ _id: fromUserId })
        const to = await Users.findOne({ _id: idToUser })
        if (idPost?.name) {
            await Notifications.create({
                title,
                content,
                fromUser,
                to,
            });

        } else {
            const post = await Posts.findOne({ _id: idPost })
            await Notifications.create({
                title,
                content,
                fromUser,
                to,
                post
            });
        }

        return res.send("notification Created");
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export default createNoti;