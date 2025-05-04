import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Episode = {
  season: number;
  number: number;
  name: string;
};

type EpisodeListProps = {
  episodes: Episode[];
};

export const EpisodeList = ({ episodes }: EpisodeListProps) => {
  const groupedEpisodes = episodes.reduce<Record<number, Episode[]>>((acc, episode) => {
    if (!acc[episode.season]) {
      acc[episode.season] = [];
    }
    acc[episode.season].push(episode);
    return acc;
  }, {});

  return (
    <Accordion type="multiple" className="w-full">
      {Object.entries(groupedEpisodes).map(([season, seasonEpisodes]) => (
        <AccordionItem key={season} value={season}>
          <AccordionTrigger>Season {season}</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-5 gap-2">
              {seasonEpisodes.map((episode) => (
                <div key={`${season}-${episode.number}`} className="rounded-md border p-2">
                  <p className="text-sm font-medium">
                    Eps {episode.number}: {episode.name}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};