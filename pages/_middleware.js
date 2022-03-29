import { NextResponse } from "next/server";
import decodeTokenFunction from "../lib/utils/decodeToken";

export default async function middleware(req) {
  const token = req ? req.cookies?.token : null;
  const userId = await decodeTokenFunction(token);
  const pathName = req.page.name;
  const res = NextResponse.next();

  if ((token && userId) || pathName.includes("/login")) {
    return res;
  }
  if (!token && pathName !== "/login") {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
}
