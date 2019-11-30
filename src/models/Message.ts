import mongoose, {Document, Schema} from 'mongoose';

export interface IMessage extends Document {
    dialog: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    text: {
        type: string;
        require: boolean;
    };
    unread: {
        type: boolean;
        default: boolean;
    };
}

const MessageSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        text: {
            type: String,
            require: Boolean
        },
        dialog: {
            type: Schema.Types.ObjectId,
            ref: 'Dialog',
            require: true
        },
        unread: {
            type: Boolean,
            default: false
        },
    }
);

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;