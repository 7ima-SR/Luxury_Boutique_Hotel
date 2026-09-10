/**
 * LUMA brand lockup — architectural "L" monogram with sun + horizon accents.
 * Strokes inherit `currentColor` so the logo adapts to light/dark surfaces;
 * the terracotta accents stay constant per the brand system.
 */
export function LogoMark({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M14.5 6.5V29.5H30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <circle cx="24" cy="12" r="3.4" fill="#A65D43" />
      <line
        x1="8"
        y1="34"
        x2="32"
        y2="34"
        stroke="#A65D43"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function Logo({
  markSize = 28,
  textSize = 24,
  showWordmark = true,
  className = "",
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={markSize} />
      {showWordmark && (
        <span
          className="serif font-medium"
          style={{
            fontSize: textSize,
            letterSpacing: "0.28em",
            lineHeight: 1,
          }}
        >
          LUMA
        </span>
      )}
    </span>
  );
}
