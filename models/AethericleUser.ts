import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    profile: {
        avatar: String,
        nickname: String,
        username: String,
    }
})

export const User = model('User', UserSchema)