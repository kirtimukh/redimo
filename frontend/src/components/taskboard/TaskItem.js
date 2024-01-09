import React from 'react'

const TaskItem = ({ fieldno, remove, taskData }) => {
    return (
        <>
            <div className='relative flex flex-stretch w-full'>
                <input
                    type="checkbox"
                    className='text-3xl hover:bg-black hover:text-white w-8'
                />
                <input
                    type="text"
                    className="w-full h-10 px-4"
                    placeholder="Add a task"
                    value={taskData.name}
                    readOnly
                />
                <p className='text-sm'>{taskData.description}</p>
            </div >
        </>
    )
}

export default TaskItem