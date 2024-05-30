import { Roboto, Montserrat } from "next/font/google";

export const roboto = Roboto({
  preload: true,
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
  weight: ["300", "400", "500", "700"],
});

export const montserrat = Montserrat({
  preload: true,
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
