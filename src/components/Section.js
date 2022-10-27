import React from 'react'

export const Section = ({children,className}) => {
  return (
    <section className={`mt-[5rem] ${className} dark:bg-black `}>{children}</section>
  )
}
