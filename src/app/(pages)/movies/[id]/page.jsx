// src/app/(pages)/movies/[id]/page.jsx
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";
import MovieDetailsClient from "./MovieDetailsClient"; // client component

export default async function MovieDetails({ params }) {
  const moviesCollection = dbConnect("movies");
  const movie = await moviesCollection.findOne({ _id: new ObjectId(params.id) });

  if (!movie) return <p className="text-center mt-10">Movie not found</p>;

  return <MovieDetailsClient movie={JSON.parse(JSON.stringify(movie))} />;
}
