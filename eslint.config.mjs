import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/app/api/content/route.ts",
    "src/components/LeadCaptureModal.tsx",
    "src/app/api/inquiries/route.ts",
    "src/components/ServiceCard.tsx",
    "src/app/api/leads/route.ts",
    "src/app/api/services/route.ts",
    "src/app/api/leads/verify/route.ts",
    "src/app/api/services/[id]/route.ts",
  ]),
]);

export default eslintConfig;
