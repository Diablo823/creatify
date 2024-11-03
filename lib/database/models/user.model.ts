import { model, models, Schema } from "mongoose";


const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    planId: { type: Number, default: 1 },
    creditBalance: { type: Number, default: 10 },  
});

// UserSchema.index({ clerkId: 1 });
// UserSchema.index({ email: 1 });
// UserSchema.index({ username: 1 });

const User = models?.User || model("User", UserSchema);

export default User;