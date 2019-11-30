import express from "express";
import {MessageModel} from '../models'

class MessageController {
    show(req: express.Request, res: express.Response) {
        const dialogId: string = req.query.dialog;

        MessageModel
            .find({dialog: dialogId})
            .populate(['dialog'])
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Messages not found'
                    })
                }
                return res.json(messages)
            })
    }

    create(req: express.Request, res: express.Response) {
        const userId = '5de2cf73776209220c7aa834';

        const postData = {
            user: userId,
            text: req.body.text,
            dialog: req.body.dialog_id
        };

        const message = new MessageModel(postData);

        message
            .save()
            .then((obj: any) => {
                res.json(obj)
            })
            .catch(reason => {
                res.json(reason)
            })
    };

    // delete(req: express.Request, res: express.Response) {
    //     const id: string = req.params.id;
    //
    //     MessageModel
    //         .findOneAndRemove({_id: id})
    //         .then((dialog) => {
    //             if (dialog) {
    //                 res.json({
    //                     message: `Message deleted`
    //                 })
    //             }
    //         })
    //         .catch(() => {
    //             res.json({
    //                 message: `Message not found`
    //             })
    //         })
    // }
}

export default MessageController;