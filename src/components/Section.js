import React from 'react'

export const Section = ({children,className}) => {
  return (
    <section className={` ${className} dark:bg-black `}>{children}</section>
  )
}
