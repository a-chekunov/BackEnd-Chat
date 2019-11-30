import express from "express";
import {UserModel} from '../models'

class UserController {
    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            res.json(user)
        })
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({_id: id})
            .then((user) => {
                if (user) {
                    console.log(user.fullName);
                    res.json({
                        message: `User ${user.fullName} deleted`
                    })
                }
            })
            .catch(() => {
                res.json({
                    message: `User not found`
                })
            })
    }

    getMe() {
        // Сделать возвращение инфі о самом себе
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password
        };
        const user = new UserModel(postData);
        user.save().then((obj: any) => {
            res.json(obj)
        }).catch(reason => {
            res.json(reason)
        })
    };
}

export default UserController;