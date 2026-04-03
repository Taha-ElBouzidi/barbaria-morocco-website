export default function ProductPlaceholder({
  name,
  size = "full",
}: {
  name: string;
  size?: "full" | number;
}) {
  const isFixed = typeof size === "number";
  const containerClass = isFixed ? "" : "absolute inset-0";
  const style = isFixed ? { width: size, height: size } : undefined;

  return (
    <div
      className={`${containerClass} flex flex-col items-center justify-center bg-[#EAD9C0]/60 rounded overflow-hidden`}
      style={style}
    >
      <svg
        className="absolute opacity-[0.06] w-3/4 h-3/4"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke="#2C1A0E" strokeWidth="2" fill="none" />
        <polygon points="50,18 82,34.5 82,65.5 50,82 18,65.5 18,34.5" stroke="#2C1A0E" strokeWidth="1.5" fill="none" />
        <polygon points="50,31 69,41.5 69,58.5 50,69 31,58.5 31,41.5" stroke="#2C1A0E" strokeWidth="1" fill="none" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="#2C1A0E" strokeWidth="0.5" />
        <line x1="5" y1="27.5" x2="95" y2="72.5" stroke="#2C1A0E" strokeWidth="0.5" />
        <line x1="5" y1="72.5" x2="95" y2="27.5" stroke="#2C1A0E" strokeWidth="0.5" />
      </svg>
      <span className="relative font-playfair italic text-[#2C1A0E]/30 text-center px-2 text-[10px] leading-relaxed">
        {name}
      </span>
    </div>
  );
}
