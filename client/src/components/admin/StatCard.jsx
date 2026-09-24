export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-sand-dark bg-white p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-wood">
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <p className="text-2xl font-bold text-wood">{value}</p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  )
}