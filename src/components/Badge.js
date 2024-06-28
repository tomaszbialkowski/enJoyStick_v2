export default function Badge({ text = "New", variant = "" }) {
  return <div className={`badge ${variant}`}>{text}</div>;
}
