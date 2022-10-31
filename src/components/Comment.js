import React, { Fragment, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useStateContext } from '../context/ContextProvider';
import { convertTimeToDate } from '../utils/blog_util';
import { CommentModal } from './CommentModal';

export const Comment = ({comment}) => {
  const { userInfo } =  useStateContext();
  const [ modal, setModal ] = useState(false);
  return (
    <Fragment>
    <div className='mx-auto my-[2rem] dark:bg-slate-800 bg-white p-5 flex flex-col'>
              <div className='flex items-center'>
                 <p className='text-[1.4rem] text-[#8034eb] mr-[2rem] font-bold'>{comment.commentName}</p>
                 <p className='text-[1rem] dark:text-gray-400' >{convertTimeToDate(comment.commentDate)} </p>
              </div>
              <div className='flex justify-between w-full'>  
                 <p className='text-[1.5rem] mt-1 '>{comment.commentContent}</p>
                 {userInfo ?   
                 <button onClick={()=>setModal(true)}  className="h-14 w-14 flex items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer "><FaTrashAlt className='fill-[red] md:h-5 md:w-5 h-7 w-7'/></button>
                :""
                }
              </div>
     </div>
     {modal &&   
     <CommentModal setModal={setModal} comment={comment} />
     }
    </Fragment>
  )
}
