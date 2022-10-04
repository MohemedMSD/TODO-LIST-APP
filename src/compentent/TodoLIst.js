import React from 'react'
import './todolist.scss'
import{FiEdit} from 'react-icons/fi';
import{AiTwotoneDelete} from 'react-icons/ai';
import {MdOutlineDownloadDone} from 'react-icons/md'

function TodoLIst({tasks, funcdelet, SetComplet, EditTask}) {
    return (
        <div className='tasks row col-10 mt-4 mx-auto'>
            {
                // Maping in Array Task 
                tasks && tasks.map((task, key) =>
                    <div key={key} data-key={task.id} className='div_task col-12 col-md-6 col-lg-4 col-xl-3 '>
                        <div  className={`${task.complete ? 'completed' : ''} task rounded d-flex justify-content-between p-2 mt-3`}>
                            <p onClick={() => SetComplet(task.id)} className="col-7 my-auto ps-2">
                                {task.task}
                                {
                                    task.complete && <MdOutlineDownloadDone className='Icon-completed'/>
                                }
                            </p>
                            
                            <div className='icons col-4 p-0 d-flex align-items-center justify-content-around'>
                                <FiEdit className='icon edit' size={20} onClick={()=> EditTask(task.id)}/>
                                <AiTwotoneDelete className='icon delet' size={24} onClick={(e)=> funcdelet(e, task.id)}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TodoLIst
