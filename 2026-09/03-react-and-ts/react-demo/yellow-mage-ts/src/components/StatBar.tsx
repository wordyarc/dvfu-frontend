type StatBarProps = {
  label: string;
  value: number;
  max: number;
};

export default function StatBar({ label, value, max }: StatBarProps) {
  return (
    <div className="stat">
      <span>
        {label}: {value} / {max}
      </span>
      <progress value={value} max={max} />
    </div>
  );
}
