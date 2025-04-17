import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MovieDetails({ movie, onClose }) {
  const details = {
    description: "A detailed description of the movie goes here.",
    rating: 9.3,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{details.description}</CardDescription>
        <p className="mt-2">Rating: {details.rating}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </CardFooter>
    </Card>
  );
}