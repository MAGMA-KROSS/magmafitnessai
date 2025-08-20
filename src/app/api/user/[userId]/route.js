import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { userId } = params;

    // Find the user in the database by their userId
    const user = await User.findOne({ userId });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}