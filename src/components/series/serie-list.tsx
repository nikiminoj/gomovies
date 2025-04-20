import type { DB_MovieType, DB_SerieType } from "@/server/db/schema";
import SerieCard from "./serie-card";

interface SerieListProps {
  onSelectSerie: (id: DB_SerieType) => void;
  series: DB_SerieType[]
}

const SerieList: React.FC<SerieListProps> = ({ series, onSelectSerie }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {series.map((serie) => (
        <div onClick={() => onSelectSerie(serie)}>
          <SerieCard key={serie.id} serie={serie} />
        </div>
      ))}
    </div>
  );
}

export default SerieList;