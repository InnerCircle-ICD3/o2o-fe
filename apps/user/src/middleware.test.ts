import { NextRequest, NextResponse } from "next/server";
import { describe } from "vitest";
import { middleware } from "./middleware";

function createRequest(path: string, token?: string) {
  const url = `http://localhost:3000${path}`;
  const headers: Record<string, string> = {};
  if (token) {
    headers.cookie = `access_token=${token}`;
  }
  return new NextRequest(url, { headers });
}

describe("middleware", () => {
  it("token이 없고 matcher 경로로 접근하면 /login으로 리다이렉트 된다.", () => {
    const req = createRequest("/orders/123");
    const res = middleware(req);
    expect(res instanceof NextResponse).toBe(true);
    expect(res.headers.get("location")).toContain("/login");
  });

  it("token이 있고 matcher 경로로 접근하면 해당 경로로 접근할 수 있다.", () => {
    const req = createRequest("/orders/123", "test-token");
    const res = middleware(req);
    expect(res instanceof NextResponse).toBe(true);
    expect(res.headers.get("location")).toBeNull();
  });
});
