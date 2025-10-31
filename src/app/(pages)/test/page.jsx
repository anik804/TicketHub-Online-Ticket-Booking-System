"use client"
import { useMovieData } from '@/hooks/useMovieData'
import { useMovieTicket } from '@/hooks/useMovieTicket';
import React from 'react'

export default function page() {

    const movieId = "68ff57fac16b60d1a6b410e9"

    const { movieData, movieLoading, movieError, refetch: refetchMovie } = useMovieData(movieId);

    const { movieTicket, ticketLoading, ticketError } = useMovieTicket({ movieId, seats : ["A1"], currency : "BDT", totalPrice : 10 })

console.log("movieData", movieTicket);

  return (
    <div>page</div>
  )
}
