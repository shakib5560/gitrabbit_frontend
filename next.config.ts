import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disables the default "X-Powered-By: Next.js" header
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Cloudflare Edge Fingerprints (Detected by Wappalyzer as "Cloudflare")
          { key: "Server", value: "cloudflare" },
          { key: "cf-ray", value: "8f9a2b1c3d4e5f60-IAD" },
          { key: "cf-cache-status", value: "DYNAMIC" },

          // AWS Core Fingerprints (Detected by Wappalyzer as "Amazon Web Services")
          { key: "x-amz-request-id", value: "3F8A7D9B2E1C40A5" },
          { key: "x-amz-id-2", value: "s8Y9zK1p3L4m7N5o9Q1r4S8t0U3v6W9x2Y5z8A1b4C7d0E3f6G9h2I5j8K1l4M7n" },
          { key: "x-amzn-trace-id", value: "Root=1-6789abcd-ef0123456789abcdef012345;Sampled=1" },

          // Amazon CloudFront Fingerprints (Detected by Wappalyzer as "Amazon CloudFront")
          { key: "Via", value: "1.1 9c42b10a51e604f8e.cloudfront.net (CloudFront)" },
          { key: "X-Amz-Cf-Id", value: "4_nE3Wp9L8ZqV1sB2c3D4e5F6g7H8i9J0k1L2m3N4o5P6==" },
          { key: "X-Amz-Cf-Pop", value: "IAD89-P1" },
          { key: "X-Cache", value: "Miss from cloudfront" },

          // Microservices Mesh (Detected by Wappalyzer as "Envoy" - AWS App Mesh / Istio standard)
          { key: "x-envoy-upstream-service-time", value: "18" },
          { key: "x-envoy-decorator-operation", value: "gateway-service.production" },

          // Enterprise Microservices Distributed Tracing (OpenTelemetry & B3 Zipkin)
          { key: "x-request-id", value: "req-aws-us-east-1-b94f107c" },
          { key: "x-correlation-id", value: "corr-8f4b-4a3d-9d7a-ec894120f" },
          { key: "x-b3-traceid", value: "4bf92f3577b34da6a3ce929d0e0e4736" },
          { key: "x-b3-spanid", value: "00f067aa0ba902b7" },
          { key: "x-b3-sampled", value: "1" },

          // Custom Backend Disguise
          { key: "X-Powered-By", value: "AWS-ECS-Fargate/Microservices" },
        ],
      },
    ];
  },
};

export default nextConfig;
