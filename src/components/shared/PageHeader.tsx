export function PageHeader({ title, description, actions }: { title: string; description: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-3xl font-display font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-2 text-base text-slate-500 max-w-2xl">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}
