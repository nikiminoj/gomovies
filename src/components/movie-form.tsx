"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form"



interface MovieFormProps {
  onSubmit: (data: {
    title: string;
    description?: string;
    genre?: string;
    country?: string;
    imdbRating?: number;
    duration?: number;
    releaseDate?: Date;
    cast?: string;
    productionCompany?: string;
  }) => void;
}

export function MovieForm({ onSubmit }: MovieFormProps) {
  const form = useForm<{
    title: string;
    description: string;
    genre?: string;
    country?: string;
    imdbRating?: number;
    duration?: number;
    releaseDate?: Date;
    cast?: string;
    productionCompany?: string;
  }>({

    defaultValues: {
      title: "",
      description: "",
      genre: "",
      country: "",
      imdbRating: 0,
      duration: 0,
      releaseDate: new Date(),
      cast: "",
      productionCompany: "",
    },
  });

const countries = ["USA", "Canada", "France", "UK", "Germany", "Japan", "China", "South Korea", "India", "Brazil", "Mexico", "Italy", "Spain", "Australia", "Russia"];
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Movie Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Movie Description" {...field} /></FormControl>
              <FormMessage />
            </FormItem>)} />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input placeholder="Movie Genre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>

                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                  <SelectItem value="South Korea">South Korea</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Brazil">Brazil</SelectItem>
                  <SelectItem value="Mexico">Mexico</SelectItem>
                  <SelectItem value="Italy">Italy</SelectItem>
                  <SelectItem value="Spain">Spain</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Russia">Russia</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imdbRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IMDB Rating</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an IMDB Rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Movie Duration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="cast"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cast</FormLabel>
              <FormControl>
                <Input placeholder="Movie Cast" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productionCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Production Company</FormLabel>
              <FormControl>
                <Input placeholder="Movie Production Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}