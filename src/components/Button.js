export default function Button({ text, onClick, style, className, children }) {
  return (
    <button onClick={onClick} style={style} className={className}>
      {text} {children}
    </button>
  );
}
