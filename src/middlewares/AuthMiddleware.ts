import { Path } from "@/config/Path";
import { User } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function AuthMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token: User = await getToken({ req: request }) as any;

  if (pathname == Path('signin').href || pathname == Path('signup').href) {
    if (token) {
      return NextResponse.redirect(new URL(Path('overview').href, request.url));
    }else{
      return NextResponse.next();
    }
  }else{
    if (!token) {
      return NextResponse.redirect(new URL(Path('signin').href, request.url));
    }
  }

  return NextResponse.next();
}