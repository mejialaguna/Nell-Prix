import { NextResponse } from "next/server";
import decodeTokenFunction from "../lib/utils/decodeToken";

export async function middleware(req) {
  const token = req ? req.cookies.token : null;
  const userId = await decodeTokenFunction(token);
  const pathName = req.url;

  if ((token && userId) || pathName.includes("/login")) {
    return NextResponse.next();
  }
  if (!token && pathName !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
}
