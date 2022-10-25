import React from 'react';
import { convertTimeToDate } from '../utils/blog_util';

export const Comment = ({comment}) => {
  return (
    <div className='mx-auto my-[2rem] bg-white p-5'>
              <div className='flex items-center'>
                 <p className='text-[1.4rem] text-[#8034eb] mr-[2rem] font-bold'>{comment.commentName}</p>
                 <p className='text-[1rem]' >{convertTimeToDate(comment.commentDate)} </p>
              </div>
              <p className='text-[1.5rem] mt-1'>{comment.commentContent}</p>
     </div>
  )
}
