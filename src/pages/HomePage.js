import React from 'react'
import {Main} from "../components/Main";
import {Carousel} from "../components/Carousel"
import {Blog} from "../components/Blog";


export const HomePage = () => {
  return (
    <Main>
      <Carousel />
      <Blog />
    </Main>
  )
}