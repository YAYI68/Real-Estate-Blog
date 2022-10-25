

export const convertTimeToDate = (timestamp)=>{
     const date = new Date (timestamp.toDate())   
     const [month,day,year] = date.toDateString().split(" ").slice(1,)
     return `${month} ${day}, ${year}` 
}
