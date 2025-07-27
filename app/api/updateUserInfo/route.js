import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route.js";
import { UserInfo } from "@/models/UserInfo";
import dbConnect from "@/utils/dbConnect";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    await dbConnect();
    const body = await req.json();

    // Find the user's UserInfo document
    const userInfo = await UserInfo.findOne({ _id: session.user.userInfo });

    if (!userInfo) {
      return new Response(JSON.stringify({ error: "User info not found" }), {
        status: 404,
      });
    }

    // Update the fields
    const updateFields = {
      first_name: body.first_name,
      last_name: body.last_name,
      username: body.username,
      graduation_year: body.graduation_year,
      primary_coding_language: body.primary_coding_language,
      linkedin_profile: body.linkedin_profile,
      contact_number: body.contact_number,
      gender: body.gender,
      company: body.company,
      codeforces_profile: body.codeforces_profile,
      leetcode_profile: body.leetcode_profile,
    };

    // Remove undefined values
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined || updateFields[key] === "") {
        delete updateFields[key];
      }
    });

    const updatedUserInfo = await UserInfo.findByIdAndUpdate(
      session.user.userInfo,
      updateFields,
      { new: true }
    );

    return Response.json(updatedUserInfo);
  } catch (error) {
    console.error("Error updating user info:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update user info" }),
      { status: 500 }
    );
  }
}
