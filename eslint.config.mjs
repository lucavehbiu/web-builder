import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable img element warning for static export builds
      // Next.js Image component provides no benefits when using static export + unoptimized: true
      // This is intentionally disabled for Cloudflare Pages deployment compatibility
      "@next/next/no-img-element": "off",
      
      // React Hooks rules (explicit enforcement)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/interactive-supports-focus": "error",
      
      // Mobile-first development guidelines
      "prefer-const": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
      
      // Performance considerations
      "react/jsx-no-bind": "warn",
      "react/no-array-index-key": "warn",
    },
  },
];

export default eslintConfig;
