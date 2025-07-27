import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema(
  {
    name: { type: String },
    admin: { type: Boolean, default: false },
    solved: [
      { type: Schema.Types.ObjectId, ref: "SolvedProblem", default: [] },
    ],
    // Profile settings fields
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    email: { type: String },
    college: { type: String },
    graduation_year: { type: String },
    primary_coding_language: { type: String },
    linkedin_profile: { type: String },
    contact_number: { type: String },
    gender: { type: String },
    company: { type: String },
    codeforces_profile: { type: String },
    leetcode_profile: { type: String },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
