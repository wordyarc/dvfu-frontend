export default function StatBar({ label, value, max }) {
  return (
    <div className="stat">
      <span>
        {label}: {value} / {max}
      </span>
      <progress value={value} max={max} />
    </div>
  );
}
