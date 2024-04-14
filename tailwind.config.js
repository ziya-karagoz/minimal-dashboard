/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        '2': '2 2 0%'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      fontSize: {
        xxs: '.5rem',
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          50: "#F6F8FA",
          100: "#EAEEF2",
          200: "#D0D7DE",
          300: "#AFB8C1",
          400: "#8C959F",
          500: "#6E7781",
          600: "#57606A",
          700: "#424A53",
          800: "#32383F",
          900: "#24292F",
        },
        blue: {
          50: "#DDF4FF",
          100: "#B6E3FF",
          200: "#80CCFF",
          300: "#54AEFF",
          400: "#218BFF",
          500: "#0969DA",
          600: "#0550AE",
          700: "#033D8B",
          800: "#0A3069",
          900: "#002155",
        },
        yellow: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        green: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        primary: {
          50: "#F9E9EB",
          100: "#F4D3D7",
          200: "#E9A6AF",
          300: "#DD7A88",
          400: "#D24D60",
          500: "#C72138",
          600: "#B31E32",
          700: "#9F1A2D",
          800: "#771422",
          900: "#64111C",
        },
      },
    }
  },
  plugins: [],
}