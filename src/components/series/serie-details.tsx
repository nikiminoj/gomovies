import React, { useState } from 'react';
import ReactStars from 'react-stars';
import { toast } from "sonner"
import { useSession } from 'next-auth/react';

interface SerieDetailsProps {
  serieId: string;
}

export default function SerieDetails({ serieId }: SerieDetailsProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = async (newRating: number) => {
    if (!session?.user?.id) {
      toast('Please sign in to rate this serie');
      return;
    }

    setRating(newRating);
    try {
      const response = await fetch('/api/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: serieId,
          type: 'serie',
          rating: newRating,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to rate serie');
      }
      toast('Serie rated successfully!');
    } catch (error) {
      toast('An error occurred while rating the serie.');
    }
  };

  return (
    <div>
      <ReactStars count={5} onChange={handleRatingChange} size={24} color2={'#ffd700'} value={rating} />
    </div>
  );
}