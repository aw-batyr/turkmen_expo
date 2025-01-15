import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        PRIMARY: '#059784',
        SECONDARY_CONTAINER: '#B5C7C5',
        ON_SECONDARY_CONTAINER: '#2A4441',
        ON_SURFACE: '#171C1B',
        ON_SURFACE_VAR: '#5E6E6C',
        OUTLINE: '#758A87',
        OUTLINE_VAR: '#C8D0CF',
        navyBlueBg: '#344350',
        green: '#BCDCD8',
        greenHover: '#A3CCC7',
        red: '#BC213A',
        black: '#0C0C0D',
        gray: '#8D9399',
        gray2: '#474A4D',
        gray3: '#8E9499',
        gray4: '#C2C7CC',
        grayGreen: '#50978E',
        lightGreen: '#06B29C',
        hoverGreen: '#B0E6A1',
        lightRed: '#F06C74',
        lightYellow: '#FFD288',
        lightCyan: '#DFE9F2',
        darkBlue: '#202A33',
        primary: '#202A33',
        blueBg: '#F4F6F6',
        whiteFont: '#F2F9FF',
        blackFont: '#0C0C0D',
        redFont: '#BC213A',
        purpleFont: '#61378A',
        bgWhite: '#F2F9FF',
      },
      fontSize: {
        extraSm: '13px',
        extra: '34px',
      },
      screens: {
        mob: '440px',
        tab: '980px',
        px850: '850px',
      },
    },
  },
  plugins: [],
};
export default config;
