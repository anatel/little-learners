import type { MetadataRoute } from "next";

// Makes the app installable ("Add to Home screen" / "Install app").
// On Android the installed app opens full screen and stays in landscape.
// Colors match globals.css (--background and --accent).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "למדנים קטנים",
    short_name: "למדנים קטנים",
    description: "משחק לימוד אותיות לגיל הרך",
    lang: "he",
    dir: "rtl",
    start_url: "/",
    display: "fullscreen",
    orientation: "landscape",
    background_color: "#fff8ec",
    theme_color: "#e86a33",
    // Chrome needs at least one "any" icon (>= 144px) to offer installing.
    // The same PNGs also serve as "maskable" for Android's circle/rounded
    // crop, so each file is listed once per purpose.
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
