type StatEntityCellProps = {
  name: string;
  imageUrl?: string;
};

function StatEntityCell({ name, imageUrl }: StatEntityCellProps) {
  const fallback = name.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-800 text-xs font-semibold text-slate-200 ring-1 ring-slate-700">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-9 w-9 object-contain" />
        ) : (
          fallback
        )}
      </div>

      <span className="font-medium text-white">{name}</span>
    </div>
  );
}

export default StatEntityCell;
