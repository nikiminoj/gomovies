"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { dummyMovies } from "@/lib/dummy";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {useState} from "react";
export const Episodes = () => {
    const allMovies = dummyMovies.map(movie => ({
        ...movie,
        id: `${Math.random()}`,
        serieId: "1"
    }));

    function groupBySeason(movies: typeof movies.$inferSelect[]): MovieWithSeason[] {
        const grouped: { [key: string]: typeof movies.$inferSelect[] } = {};
        for (const movie of movies) {
            if (!grouped[movie.season!]) {
                grouped[movie.season!] = [];
            }
            grouped[movie.season!].push(movie);
        }
        return Object.keys(grouped).map(season => ({
            season,
            episodes: grouped[season]
        }));
    }

    const seasons = groupBySeason(allMovies);
    const [selectedSeason, setSelectedSeason] = useState<string | undefined>(seasons.length > 0 ? seasons[0].season : undefined);
    const currentSeason = seasons.find(s => s.season === selectedSeason);
    return <Card>
        <CardContent className="p-4">
            <Select onValueChange={setSelectedSeason} defaultValue={selectedSeason}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                    {seasons.map((item) => (
                        <SelectItem key={item.season} value={item.season}>Season {item.season}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {currentSeason && <div>
                <div className="mt-4">
                    <TypographyH4>Season {currentSeason.season}</TypographyH4>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {currentSeason.episodes.map((episode) => (
                        <div className="border rounded-md p-2" key={episode.id}>
                            <TypographyP>Eps {episode.episode}: {episode.title}</TypographyP>
                        </div>
                    ))}</div></div>}
        </CardContent>
    </Card>
}