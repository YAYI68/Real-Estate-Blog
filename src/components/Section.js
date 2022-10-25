import React from 'react'

export const Section = ({children,className}) => {
  return (
    <section className={`my-[1rem] ${className} `}>{children}</section>
  )
}
