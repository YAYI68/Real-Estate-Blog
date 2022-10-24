import React from 'react'

export const Section = ({children,className}) => {
  return (
    <section className={`my-[3rem] ${className} `}>{children}</section>
  )
}
