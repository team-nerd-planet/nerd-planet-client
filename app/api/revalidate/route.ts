import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export const GET = async (request: NextRequest) => {
  const tags = request.nextUrl.searchParams.getAll("tag");

  tags.forEach(revalidateTag);

  return Response.json({ revalidated: true, now: Date.now() });
};
