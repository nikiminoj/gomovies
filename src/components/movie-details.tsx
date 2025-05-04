"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ReactStars from "react-rating-stars-component";

export default function MovieDetails({ movie, onClose }) {
  const details = {
    description: "A detailed description of the movie goes here.",
    rating: 9.3,
  };
  const [error, setError] = useState<string | null>(null);

  const handleRate = async (newRating: number) => {
    try {
      setError(null);
      const response = await fetch("/api/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: movie.id,
          type: "movie",
          rating: newRating,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to rate movie. Please try again."
        );
      }
      // Optionally, you can update the UI to reflect the new rating
      // For example:
      // setMovieRating(rating)
    } catch (err) {
      const error = err as Error;
      console.error("Error rating movie:", error.message);
      setError(error.message);
    }
  };

  const RatingComponent = ({ onRate }) => {
    return (
      <div>
        <ReactStars
          count={5}
          onChange={onRate}
          size={24}
          activeColor="#ffd700"
        />
      </div>
    );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <RatingComponent onRate={handleRate} />
        <CardDescription>{details.description}</CardDescription>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-2">Rating: {details.rating}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </CardFooter>
    </Card>
  )
}
