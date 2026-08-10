interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

const Icon = ({ name, className = "", filled = false }: IconProps) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}
    >
      {name}
    </span>
  );
};

export default Icon;
