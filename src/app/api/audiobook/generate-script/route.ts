import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, description, duration } = await req.json();

    if (!title || !description) {
      return new NextResponse("Title and description are required", { status: 400 });
    }

    const prompt = `Generate an audiobook script for a book with the following details:
Title: ${title}
Description: ${description}
Duration: ${duration || 'medium'}

Please write a well-structured, engaging narrative that:
1. Has clear chapter breaks
2. Uses descriptive language that works well when spoken
3. Maintains a consistent tone and pace
4. Includes natural transitions between sections
5. Is optimized for audio narration

Format the output with proper paragraph breaks and chapter headings.`;

    const response = await replicate.run(
      "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
      {
        input: {
          prompt,
          system_prompt: "You are an expert audiobook writer specializing in creating engaging, well-structured narratives optimized for audio format. Focus on clear storytelling, natural pacing, and vivid descriptions.",
          max_new_tokens: duration === 'short' ? 1000 : duration === 'medium' ? 2000 : 3000,
          temperature: 0.7,
          top_p: 0.9,
          top_k: 50,
        }
      }
    );

    const scriptContent = Array.isArray(response) ? response.join('') : response.toString();

    return NextResponse.json({ script: scriptContent });

  } catch (error) {
    console.error("[SCRIPT_GENERATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
