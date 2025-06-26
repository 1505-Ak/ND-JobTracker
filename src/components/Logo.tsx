const Logo = () => (
  <svg
    width="200"
    height="60"
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Employed logo"
    className="select-none"
  >
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <text
      x="0"
      y="45"
      fontFamily="'Poppins', sans-serif"
      fontWeight="800"
      fontSize="42"
      letterSpacing="1px"
      fill="url(#grad)"
    >
      Employed
    </text>
  </svg>
);

export default Logo; 