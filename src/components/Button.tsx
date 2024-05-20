import "./button.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Button({ onClick, children, style = {} }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="button"
      style={{
        ...style,
      }}
    >
      {children}
    </button>
  );
}
