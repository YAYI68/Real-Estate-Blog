

 const dateConvert = ()=>{
    const date = new Date()
    const [month,day,year] = date.toDateString().split(" ").slice(1,)
    return `${month} ${day}, ${year}`
 }

export const currentDate = dateConvert()