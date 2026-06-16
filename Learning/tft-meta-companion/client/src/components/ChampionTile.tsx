type ChampionTileItem = {
  id: string;
  name: string;
  imageUrl?: string;
};

type ChampionTileProps = {
  name: string;
  cost: number;
  imageUrl?: string;
  items?: ChampionTileItem[];
};

const costClasses: Record<number, string> = {
  1: "border-slate-500 bg-slate-800",
  2: "border-green-500 bg-green-950/40",
  3: "border-blue-500 bg-blue-950/40",
  4: "border-purple-500 bg-purple-950/40",
  5: "border-yellow-400 bg-yellow-950/40",
};

function ChampionTile({ name, cost, imageUrl, items = [] }: ChampionTileProps) {
  const costClass = costClasses[cost] ?? "border-slate-600 bg-slate-800";

  return (
    <div className="w-14 text-center">
      <div
        className={`relative h-12 w-12 overflow-hidden rounded-md border ${costClass}`}
        title={name}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-300">
            {name.slice(0, 2)}
          </div>
        )}

        {items.length > 0 && (
          <div className="absolute -bottom-1 left-0 flex gap-0.5">
            {items.slice(0, 3).map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                title={item.name}
                className="h-4 w-4 overflow-hidden rounded-sm border border-slate-900 bg-amber-500 text-[8px]"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  item.name.slice(0, 1)
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-1 truncate text-[11px] text-slate-300">{name}</p>
    </div>
  );
}

export default ChampionTile;