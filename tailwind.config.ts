import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "fall-small-7": "fall-small 7s linear infinite",
        "fall-small-9": "fall-small 9s linear infinite",
        "fall-small-13": "fall-small 13s linear infinite",
        "fall-medium-8": "fall-medium 8s linear infinite",
        "fall-medium-10": "fall-medium 10s linear infinite",
        "fall-medium-6": "fall-medium 6s linear infinite",
        "fall-large-5": "fall-large 5s linear infinite",
        "fall-large-6": "fall-large 6s linear infinite",
        "fall-large-7": "fall-large 7s linear infinite",
      },
      keyframes: {
        "fall-small": {
          "0%": {
            top: "-20px",
          },
          "3%": {
            transform: "translateX(5px)",
          },
          "7%": {
            transform: "translateX(5px)",
          },
          "18%": {
            transform: "translateX(-5px)",
          },
          "22%": {
            transform: "translateX(-5px)",
          },
          "38%": {
            transform: "translateX(13px)",
          },
          "42%": {
            transform: "translateX(13px)",
          },
          "58%": {
            transform: "translateX(-13px)",
          },
          "62%": {
            transform: "translateX(-13px)",
          },
          "78%": {
            transform: "translateX(13px)",
          },
          "82%": {
            transform: "translateX(13px)",
          },
          "100%": {
            top: "calc(100% + 20px)",
          },
        },
        "fall-medium": {
          "0%": {
            top: "-200px",
          },
          "3%": {
            transform: "translateX(5px)",
          },
          "7%": {
            transform: "translateX(5px)",
          },
          "18%": {
            transform: "translateX(-5px)",
          },
          "22%": {
            transform: "translateX(-5px)",
          },
          "38%": {
            transform: "translateX(13px)",
          },
          "42%": {
            transform: "translateX(13px)",
          },
          "58%": {
            transform: "translateX(-13px)",
          },
          "62%": {
            transform: "translateX(-13px)",
          },
          "78%": {
            transform: "translateX(13px)",
          },
          "82%": {
            transform: "translateX(13px)",
          },
          "100%": {
            top: "calc(100% + 20px)",
          },
        },
        "fall-large": {
          "0%": {
            top: "-300px",
          },
          "3%": {
            transform: "translateX(5px)",
          },
          "7%": {
            transform: "translateX(5px)",
          },
          "18%": {
            transform: "translateX(-5px)",
          },
          "22%": {
            transform: "translateX(-5px)",
          },
          "38%": {
            transform: "translateX(13px)",
          },
          "42%": {
            transform: "translateX(13px)",
          },
          "58%": {
            transform: "translateX(-13px)",
          },
          "62%": {
            transform: "translateX(-13px)",
          },
          "78%": {
            transform: "translateX(13px)",
          },
          "82%": {
            transform: "translateX(13px)",
          },
          "100%": {
            top: "calc(100% + 20px)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
