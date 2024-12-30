import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, description, voiceType, prompt } = await req.json();

    // Validate user has enough credits
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (user.credits < 1) {
      return new NextResponse("Insufficient credits", { status: 402 });
    }

    // TODO: Integrate with your chosen Text-to-Speech API
    // For now, we'll just simulate the process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Deduct credits and create transaction
    await prisma.creditTransaction.create({
      data: {
        userId,
        amount: -1,
        description: `Generated podcast: ${title}`,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: user.credits - 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Podcast generated successfully",
      // TODO: Return actual podcast URL
      url: "/sample-podcast.mp3",
    });
  } catch (error) {
    console.error("[PODCAST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
