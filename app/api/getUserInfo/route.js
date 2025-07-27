import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route.js";
import { UserInfo } from "@/models/UserInfo.js";
import { User } from "@/models/User";
import { SolvedProblem } from "@/models/SolvedProblem";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return new Response(JSON.stringify({ error: "User not logged in" }), {
        status: 401,
      });
    }

    // Use userInfo from session if available, otherwise fetch from User
    let userInfoId = session.user.userInfo;
    if (!userInfoId) {
      const user = await User.findById(session.user._id);
      if (!user?.userInfo) {
        return new Response(JSON.stringify({ error: "User info not found" }), {
          status: 404,
        });
      }
      userInfoId = user.userInfo;
    }

    const data = await UserInfo.findById(userInfoId).populate("solved");
    if (!data) {
      return new Response(JSON.stringify({ error: "User info not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
