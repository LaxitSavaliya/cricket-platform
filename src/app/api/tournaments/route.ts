import { env } from "@/config/env";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const url = new URL(request.url);

  const backendResponse = await fetch(
    `${env.API_BASE_URL}/tournaments${url.search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader
          ? {
              cookie: cookieHeader,
            }
          : {}),
      },
      cache: "no-store",
    },
  );

  const responseBody = await backendResponse.text();

  return new Response(responseBody, {
    status: backendResponse.status,
    headers: {
      "Content-Type":
        backendResponse.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const body = await request.text();

  const backendResponse = await fetch(`${env.API_BASE_URL}/tournaments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader
        ? {
            cookie: cookieHeader,
          }
        : {}),
    },
    body,
  });

  const responseBody = await backendResponse.text();

  return new Response(responseBody, {
    status: backendResponse.status,
    headers: {
      "Content-Type":
        backendResponse.headers.get("content-type") ?? "application/json",
    },
  });
}
