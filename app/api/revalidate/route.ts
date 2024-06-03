import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const authorization = headers().get("Authorization");

  if (process.env.REVALIDATE_SECRET !== authorization) {
    return new Response("Unauthorized", { status: 401 });
  }

  const tags = request.nextUrl.searchParams.getAll("tag");

  tags.forEach(revalidateTag);

  return Response.json({ revalidated: true, now: Date.now() });
};
