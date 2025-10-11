"use client"
import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function Loader({smallHeight = false}) {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader size={100} color='orange' />
    </div>
  )
}
