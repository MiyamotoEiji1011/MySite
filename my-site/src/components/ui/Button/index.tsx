import "./Button.css";

type ButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({ label, href, onClick, className = "" }: ButtonProps) {
  const classes = `uiBtn ${className}`.trim();

  // ルーティングが必要なら Link に置換してOK
  if (href) {
    return (
      <a className={classes} href={href} aria-label={label}>
        <span className="uiBtn__label">{label}</span>
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      <span className="uiBtn__label">{label}</span>
    </button>
  );
}
