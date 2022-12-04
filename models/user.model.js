import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "usuário"],
            default: "usuário"
        }
    },
    {
        timestamps: true
    }
)

const UserModel = model("User", userSchema)

export default UserModel