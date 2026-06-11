
type StatsCardProps = {
  label: string;
  value: string | number;
};

export default function StatsCard({
  label,
  value,
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-cyan-500/10">
      {/* Glow Effect */}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-400/20" />

      {/* Label */}
      <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>

      {/* Value */}
      <p className="mt-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-5xl font-extrabold text-transparent">
        {value}
      </p>

      {/* Bottom Accent */}
      <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
    </div>
  );
}

