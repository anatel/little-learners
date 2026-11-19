This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Landscape and install

- `app/manifest.ts` makes the app installable. On Android Chrome ("Install app"), the installed app opens full screen and is locked to landscape. Its icons are `public/icons/icon-192.png` and `icon-512.png` (maskable: the owl from `app/icon.svg` on a full sand square).
- Browsers can't lock orientation in a plain tab or on iPhone/iPad, so in portrait the root layout shows a "turn your device" screen (`app/components/RotateDevice.tsx`, pure CSS). Turning the device back shows the app again, with no reload.
- Installing on a real device over plain `http://` may only work as a shortcut; use the HTTPS setup below.

## HTTPS on the home Wi-Fi (tablet and iPhone)

Chrome only installs a real app (full screen, landscape lock) from a secure origin, and the iPhone's "Open as web app" needs HTTPS too. This sets up a locally trusted certificate with [`mkcert`](https://github.com/FiloSottile/mkcert).

1. **Find the laptop's Wi-Fi address**, e.g. `ipconfig getifaddr en0` on macOS (like `192.168.1.140`). The tablet and phone must be on the same Wi-Fi.
2. **Install mkcert** and create its local certificate authority (once per laptop):
   ```bash
   brew install mkcert
   mkcert -install
   ```
3. **Create the certificate** for that address (from `client/`; `certs/` is git-ignored, never commit it):
   ```bash
   mkdir -p certs
   mkcert -cert-file certs/cert.pem -key-file certs/key.pem 192.168.1.140 localhost
   ```
   Re-run this if the laptop's address changes.
4. **Install the root certificate on the Android tablet.** Find the file with `mkcert -CAROOT`, and send `rootCA.pem` from that folder to the tablet (USB, Drive, email). On the tablet: Settings → Security (or "Security & privacy") → More security settings → Encryption & credentials → Install a certificate → CA certificate → pick the file. (Menu names vary by Android version.)
5. **Install the root certificate on the iPhone.** AirDrop or email `rootCA.pem` to the iPhone and open it → "Profile Downloaded". Then Settings → General → VPN & Device Management → tap the profile → Install. Finally switch it on in Settings → General → About → Certificate Trust Settings → enable full trust for the mkcert root.
6. **Start the server** (from `client/`), with your address:
   ```bash
   DEV_HOST=192.168.1.140 npm run dev:https
   ```
   `DEV_HOST` lets the dev server accept requests from that address (`allowedDevOrigins`).
7. **Open** `https://192.168.1.140:3000` on the tablet or iPhone. There should be no certificate warning.
   - Android Chrome: menu → "Install app".
   - iPhone Safari: Share → "Add to Home Screen" → keep "Open as web app" on.

Keep `rootCA-key.pem` (in the `mkcert -CAROOT` folder) on the laptop only: anyone holding it can issue certificates your devices trust.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
