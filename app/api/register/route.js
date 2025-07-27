import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();

    const { email, password } = body;

    // Validate email and password
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    if (!password?.length || password.length < 5) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 5 characters" }),
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User with this email already exists" }),
        { status: 409 }
      );
    }

    const notHashedPassword = password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);

    // Create UserInfo first
    const userInfo = new UserInfo({
      email: email,
      name: email.split("@")[0], // Default name from email
    });
    const savedUserInfo = await userInfo.save();

    // Create User with reference to UserInfo
    const createdUser = await User.create({
      email: email,
      password: hashedPassword,
      userInfo: savedUserInfo._id,
    });

    return Response.json(createdUser);
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Registration failed" }),
      { status: 500 }
    );
  }
}
