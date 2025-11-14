import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules
  {
    rules: {
      // Allow explicit `any` in TypeScript
      "@typescript-eslint/no-explicit-any": "off",

      // Optional: allow unused variables
      "@typescript-eslint/no-unused-vars": "off",

      // Optional: disable prop-types check (if using TS)
      "react/prop-types": "off",

      // Optional: allow console.log
      "no-console": "off",

      // Optional: turn off React hook exhaustive deps warnings
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
