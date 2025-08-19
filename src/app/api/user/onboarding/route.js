import { verifyToken } from "@clerk/backend"; // ✅ use backend package
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth header" }), { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    // ✅ verify with your Clerk secret key
    const { sub: userId } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const user = await User.findOneAndUpdate(
      { userId },
      { ...body, userId },
      { new: true, upsert: true }
    );

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
