import {model, models, Schema} from "mongoose";

const UserInfoSchema = new Schema({
  name: { type: String },
  admin: {type: Boolean, default: false},
  solved: [{ type: Schema.Types.ObjectId, ref: 'SolvedProblem', default: [] }]
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);