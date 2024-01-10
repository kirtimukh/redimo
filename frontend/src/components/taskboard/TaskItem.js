import React from 'react'
import { PInput } from '../reusables';


const TaskItem = ({ fieldno, remove, taskData }) => {
    const count = 2;
    return (
        <>
            <div>
                <div className='relative flex flex-stretch w-full'>
                    <input
                        type="checkbox"
                        className='text-3xl hover:bg-black hover:text-white w-8'
                    />
                    {/* <input
                        type="text"
                        className="w-full h-10 px-4"
                        placeholder="Add a task"
                        value={taskData.name}
                        readOnly
                    /> */}
                    <PInput textValue={taskData.name} />
                    {/* <p className='text-sm'>{taskData.description}</p> */}
                </div >
                <div className='bg-red-200 ml-7'>
                    {/* {Array.from({ length: count }, (_, i) => {
                        const newTaskData = { ...taskData, name: taskData.name + i, description: 'des' + i };
                        return <TaskItem key={i} fieldno={i} remove={remove} count={0} taskData={newTaskData} />
                    })} */}
                </div>
            </div>
        </>
    )
}

export default TaskItem