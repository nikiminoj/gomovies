"use client";
import { Button } from "@/components/ui/button";
import { MovieTable } from "@/components/movie-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MovieForm } from "@/components/movie-form";

export default function Page() {
  return (
    <main className="p-6">
      <div className="mb-4 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Movie</Button>
          </DialogTrigger>
          <DialogContent className="h-[calc(100vh-150px)] w-full overflow-y-auto p-4 py-12 sm:max-w-[800px] ">
            <DialogHeader>
              <DialogTitle>Add New Movie</DialogTitle>
            </DialogHeader>
            <MovieForm
                onSubmit={async (data) => {
                  console.log(data);
                }}
              />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6">
        <MovieTable />
      </div>
    </main>
  );
}
