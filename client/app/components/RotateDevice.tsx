import styles from "./RotateDevice.module.css";

// Shown only when the device is held in portrait (see the CSS module).
// Browsers can't lock the screen orientation in a plain tab or on
// iPhone/iPad, so we ask the player, without words, to turn the device.
// Pure CSS: no JavaScript, no reload when the device is turned back.
export default function RotateDevice() {
  return (
    <div className={styles.screen} role="img" aria-label="סובבו את המכשיר">
      <svg viewBox="0 0 200 200" className={styles.art} aria-hidden="true">
        {/* A tablet, drawn upright, that turns on its side. */}
        <g className={styles.tablet}>
          <rect x="62" y="30" width="76" height="120" rx="12" fill="#2b2b2b" />
          <rect x="70" y="40" width="60" height="100" rx="4" fill="#ffe2b8" />
          <circle cx="100" cy="145" r="2.5" fill="#fff8ec" />
        </g>
        {/* Arrow showing the turn. */}
        <path
          d="M40 50 A70 70 0 0 1 160 50"
          fill="none"
          stroke="#e86a33"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path d="M168 32 L172 66 L140 54 Z" fill="#e86a33" />
      </svg>
    </div>
  );
}
