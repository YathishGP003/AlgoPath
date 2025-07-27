import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const pass = body.password;
    if (!pass?.length || pass.length < 5) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 5 characters" }),
        { status: 400 }
      );
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);
    const userInfo = new UserInfo();
    const userInfod = await userInfo.save();
    body.userInfo = userInfod._id;
    const createdUser = await User.create(body);

    return Response.json(createdUser);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Registration failed" }),
      { status: 500 }
    );
  }
}
