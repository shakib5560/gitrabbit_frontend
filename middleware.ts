import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Cloudflare Bot Management Cookie (__cf_bm) - Detected by Wappalyzer as "Cloudflare" & "Bot Management"
  if (!request.cookies.has("__cf_bm")) {
    const fakeCfBm = "aBc1De2Fg3Hi4Jk5Lm6No7Pq8Rs9Tu0Vw1Xy2Z3_dummy-1711512345-1.0.1.1-xYz987";
    response.cookies.set("__cf_bm", fakeCfBm, {
      path: "/",
      maxAge: 1800,
      sameSite: "none",
      secure: true,
    });
  }

  // 2. AWS ALB (Application Load Balancer) Cookies - Detected by Wappalyzer as "Amazon ALB" & "AWS"
  if (!request.cookies.has("AWSALB")) {
    const fakeAlbToken = "kL8u9+vR3X5Y7Z1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T1u2V3w4X5y6Z7==";
    response.cookies.set("AWSALB", fakeAlbToken, {
      path: "/",
      maxAge: 604800,
      sameSite: "lax",
    });
    response.cookies.set("AWSALBCORS", fakeAlbToken, {
      path: "/",
      maxAge: 604800,
      sameSite: "none",
      secure: true,
    });
  }

  // 3. Cloudflare Edge Headers (Detected by Wappalyzer as "Cloudflare")
  response.headers.set("Server", "cloudflare");
  response.headers.set("cf-ray", "8f9a2b1c3d4e5f60-IAD");
  response.headers.set("cf-cache-status", "DYNAMIC");

  // 4. AWS CloudFront and S3/API Gateway Headers (Detected by Wappalyzer as "Amazon Web Services" & "CloudFront")
  response.headers.set("Via", "1.1 9c42b10a51e604f8e.cloudfront.net (CloudFront)");
  response.headers.set("X-Amz-Cf-Id", "4_nE3Wp9L8ZqV1sB2c3D4e5F6g7H8i9J0k1L2m3N4o5P6==");
  response.headers.set("X-Amz-Cf-Pop", "IAD89-P1");
  response.headers.set("X-Cache", "Miss from cloudfront");
  response.headers.set("x-amz-request-id", "3F8A7D9B2E1C40A5");
  response.headers.set("x-amz-id-2", "s8Y9zK1p3L4m7N5o9Q1r4S8t0U3v6W9x2Y5z8A1b4C7d0E3f6G9h2I5j8K1l4M7n");
  response.headers.set("x-amzn-trace-id", "Root=1-6789abcd-ef0123456789abcdef012345;Sampled=1");

  // 5. Envoy Service Mesh & Microservices Distributed Tracing Headers (Detected by Wappalyzer as "Envoy")
  response.headers.set("x-envoy-upstream-service-time", "18");
  response.headers.set("x-envoy-decorator-operation", "gateway-service.production");
  response.headers.set("x-request-id", "req-aws-us-east-1-b94f107c");
  response.headers.set("x-correlation-id", "corr-8f4b-4a3d-9d7a-ec894120f");
  response.headers.set("x-b3-traceid", "4bf92f3577b34da6a3ce929d0e0e4736");
  response.headers.set("x-b3-spanid", "00f067aa0ba902b7");
  response.headers.set("x-b3-sampled", "1");

  // 6. Custom Backend Masking
  response.headers.set("X-Powered-By", "AWS-ECS-Fargate/Microservices");

  return response;
}

export default middleware;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
