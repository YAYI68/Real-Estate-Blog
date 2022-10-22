const date = new Date();
export const currentDate = date.toLocaleString({
    day:'numeric',
    month:'long',
    year:'numeric',
  })