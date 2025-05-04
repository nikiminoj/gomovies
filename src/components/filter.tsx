"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox"; import { useSearchParams, useRouter } from "next/navigation";

type FILTER_TYPE_TYPES = 'all' | 'movies' | 'series';
type FILTER_QUALITY_TYPES = 'all' | 'hd' | 'sd' | 'cam';
type FILTER_ACTION_TYPES = 'action' | 'action-and-adventure' | 'adventure' | 'animation' | 'biography' | 'comedy' | 'crime' | 'documentary' | 'drama' | 'family' | 'fantasy' | 'history' | 'horror' | 'kids' | 'music' | 'mystery' | 'news' | 'reality' | 'romance' | 'sci-fi & fantasy' | 'science fiction' | 'soap' | 'talk' | 'thriller' | 'tv movie' | 'war' | 'war & politics' | 'western';
type FILTER_COUNTRY_TYPES =
  | "argentina" | "australia" | "austria" | "belgium" | "brazil"
  | "canada" | "china" | "czech republic" | "denmark" | "finland"
  | "france" | "germany" | "hong kong" | "hungary" | "india"
  | "ireland" | "israel" | "italy" | "japan" | "luxembourg"
  | "mexico" | "netherlands" | "new zealand" | "norway" | "poland"
  | "romania" | "russia" | "south africa" | "south korea" | "spain"
  | "sweden" | "switzerland" | "taiwan" | "thailand"
  | "united kingdom" | "united states of america";

interface FilterValues {
  type: FILTER_TYPE_TYPES;
  quality: FILTER_QUALITY_TYPES;
  released: string;
  genres: FILTER_ACTION_TYPES[];
  countries: FILTER_COUNTRY_TYPES[];
}

const COUNTRIES_NAMES: FILTER_COUNTRY_TYPES[] = ["argentina", "australia", "austria", "belgium", "brazil", "canada", "china", "czech republic", "denmark", "finland", "france", "germany", "hong kong", "hungary", "india", "ireland", "israel", "italy", "japan", "luxembourg", "mexico", "netherlands", "new zealand", "norway", "poland", "romania", "russia", "south africa", "south korea", "spain", "sweden", "switzerland", "taiwan", "thailand", "united kingdom", "united states of america"];
export const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialType = searchParams.get("type") ?? "all";
  const initialQuality = searchParams.get("quality") ?? "all";
  const initialReleaseYear = searchParams.get("release_year") ?? "all";
  const initialGenres = searchParams.get("genre")?.split(",") ?? [];
  const initialCountries = searchParams.get("country")?.split(",") ?? [];


  const [filterValues, setFilterValues] = useState<FilterValues>({
    type: initialType as FILTER_TYPE_TYPES,
    quality: initialQuality as FILTER_QUALITY_TYPES,
    released: initialReleaseYear,
    genres: initialGenres as FILTER_ACTION_TYPES[],
    countries: initialCountries as FILTER_COUNTRY_TYPES[],
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filterValues.type !== "all") params.append("type", filterValues.type);
    if (filterValues.quality !== "all") params.append("quality", filterValues.quality);
    if (filterValues.released !== "all") params.append("release_year", filterValues.released);
    if (filterValues.genres.length > 0) params.append("genre", filterValues.genres.join(","));
    if (filterValues.countries.length > 0) params.append("country", filterValues.countries.join(","));

    router.push(`?${params.toString()}`);
  }, [filterValues]);

  const handleChange = (
    name: keyof FilterValues,
    value: string[] | string,
  ) => {
    setFilterValues((prevFilterValues: FilterValues) => ({
      ...prevFilterValues,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    router.push(`/filter?type=${filterValues.type}&quality=${filterValues.quality}&released=${filterValues.released}&genre=${filterValues.genres.join(",")}&country=${filterValues.countries.join(",")}`);
    // setFilterValues(tempFilterValues)
  };

  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm font-medium">Type:</label>
          <RadioGroup

            value={filterValues.type}
            onValueChange={(value: string) => {
              handleChange("type", value);
            }}
            className="flex gap-2"
          >
            <RadioGroupItem value="all" id="type-all" />
            <label htmlFor="type-all" className="text-sm font-medium" id="type-all">
              All
            </label>
            <RadioGroupItem value="movies" id="type-movies" />
            <label htmlFor="type-movies" className="text-sm font-medium">
              Movies
            </label>
            <RadioGroupItem value="series" id="type-series" />
            <label htmlFor="type-series" className="text-sm font-medium">
              TV Shows
            </label>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm font-medium">Quality:</label>

          <RadioGroup
            value={filterValues.quality}
            onValueChange={(value: string) => {
              handleChange("quality", value);
            }}
            className="flex gap-2"
          >
            <RadioGroupItem value="all" id="quality-all" />
            <label htmlFor="quality-all" className="text-sm font-medium" id="quality-all">
              All
            </label>
            <RadioGroupItem value="hd" id="quality-hd" />
            <label htmlFor="quality-hd" className="text-sm font-medium">
              HD
            </label>
            <RadioGroupItem value="sd" id="quality-sd" />
            <label htmlFor="quality-sd" className="text-sm font-medium">
              SD
            </label>
            <RadioGroupItem value="cam" id="quality-cam" />
            <label htmlFor="quality-cam" className="text-sm font-medium">
              CAM
            </label>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm font-medium">Released:</label>

          <RadioGroup
            value={filterValues.released}
            onValueChange={(value: string) => {
              handleChange("released", value)
            }}
            className="flex gap-2"
          >
            <RadioGroupItem value="all" id="released-all" />
            <label htmlFor="released-all" className="text-sm font-medium" >
              All
            </label>
            <RadioGroupItem value="2025" id="released-2025" />
            <label htmlFor="released-2025" className="text-sm font-medium">
              2025
            </label>
            <RadioGroupItem value="2024" id="released-2024" />
            <label htmlFor="released-2024" className="text-sm font-medium">
              2024
            </label>
            <RadioGroupItem value="2023" id="released-2023" />
            <label htmlFor="released-2023" className="text-sm font-medium">
              2023
            </label>
            <RadioGroupItem value="2022" id="released-2022" />
            <label htmlFor="released-2022" className="text-sm font-medium">
              2022
            </label>
            <RadioGroupItem value="2021" id="released-2021" />
            <label htmlFor="released-2021" className="text-sm font-medium">
              2021
            </label>
            <RadioGroupItem value="older" id="released-older" />
            <label htmlFor="released-older" className="text-sm font-medium">
              Older
            </label>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <label className="text-sm font-medium col-span-3">Genre:</label>

          <div className="flex items-center space-x-2"> <Checkbox
            id="genre-action"
            checked={filterValues.genres.includes("action")}
            onCheckedChange={(checked) => {
              handleChange(
                "genres",
                checked
                  ? [...filterValues.genres, "action"]
                  : filterValues.genres.filter((g) => g !== "action"),
              );
            }}
          />
            <label
              htmlFor="genre-action" className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70" id="genre-action">
              Action
            </label>
          </div>
          <div className="flex items-center space-x-2" >
            <Checkbox id="genre-action-adventure" />
            <label
              htmlFor="genre-action-adventure"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Action & Adventure
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-adventure" />
            <label
              htmlFor="genre-adventure"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Adventure
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-animation" />
            <label
              htmlFor="genre-animation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Animation
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-biography" />
            <label
              htmlFor="genre-biography"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Biography
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-comedy" />
            <label
              htmlFor="genre-comedy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Comedy
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-crime" />
            <label
              htmlFor="genre-crime"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Crime
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-documentary" />
            <label
              htmlFor="genre-documentary"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Documentary
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-drama" />
            <label
              htmlFor="genre-drama"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Drama
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-family" />
            <label
              htmlFor="genre-family"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Family
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-fantasy" />
            <label
              htmlFor="genre-fantasy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Fantasy
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-history" />
            <label
              htmlFor="genre-history"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              History
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-horror" />
            <label
              htmlFor="genre-horror"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Horror
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-kids" />
            <label
              htmlFor="genre-kids"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Kids
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-music" />
            <label
              htmlFor="genre-music"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Music
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-mystery" />
            <label
              htmlFor="genre-mystery"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mystery
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-news" />
            <label
              htmlFor="genre-news"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              News
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-reality" />
            <label
              htmlFor="genre-reality"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Reality
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-romance" />
            <label
              htmlFor="genre-romance"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Romance
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-sci-fi-fantasy" />
            <label
              htmlFor="genre-sci-fi-fantasy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sci-Fi & Fantasy
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-science-fiction" />
            <label
              htmlFor="genre-science-fiction"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Science Fiction
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-soap" />
            <label
              htmlFor="genre-soap"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Soap
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-talk" />
            <label
              htmlFor="genre-talk"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Talk
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-thriller" />
            <label
              htmlFor="genre-thriller"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Thriller
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-tv-movie" />
            <label
              htmlFor="genre-tv-movie"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              TV Movie
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-war" />
            <label
              htmlFor="genre-war"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              War
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-war-politics" />
            <label
              htmlFor="genre-war-politics"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              War & Politics
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="genre-western" />
            <label
              htmlFor="genre-western"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Western
            </label>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          <label className="text-sm font-medium col-span-5">Country:</label>{COUNTRIES_NAMES.map((country) => (
            <div
              key={`country-${country}`}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`country-${country}`}
                checked={filterValues.countries.includes(country)}
                onCheckedChange={(checked) => {
                  handleChange(
                    "countries",
                    checked
                      ? [...filterValues.countries, country]
                      : filterValues.countries.filter((g) => g !== country),
                  );
                }}
              />
              <label
                htmlFor={`country-${country}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {country.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </label>
            </div>
          ))}
        </div>
      </div>
      <Button variant="default" onClick={handleConfirm}
        className="col-span-5"
      >
        Confirm
      </Button>
    </div>
  );
};