import { Link } from "@/i18n/navigation";
import type { DB_SerieType } from "@/server/db/schema";

interface SerieCardProps {
  serie: DB_SerieType
}

const MovieCard: React.FC<SerieCardProps> = ({ serie }) => {
  return (
    <Link href={`/serie/${serie.id}`}>
      <div className="overflow-clip p-4">
        <div className="border rounded-lg h-56"></div>
        <div className="">
          <div className="font-medium text-nowrap text-ellipsis overflow-hidden">{serie.title}</div>
          <div className="grid grid-cols-3">
            <div>{serie.releaseDate?.getFullYear()}</div>
            <div></div>
            <div className="border text-center text-sm rounded text-neutral-500">Serie</div>
          </div>
        </div>
      </div>
    </Link >
  );
};

export default MovieCard;