import React, { useState } from 'react'
import TaskItem from './TaskItem';


const ActionGroupDetail = ({ fieldno, remove, groupId, actionGroup }) => {
    const tasklist = actionGroup.tasks;
    const handleRemove = () => {
        console.log('remove button pressed');
        remove(fieldno);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputValue = event.target.value;
            if (inputValue.length > 0) {
                console.log('Enter key pressed with input value: ' + inputValue);
                addItem(event);
            }
        }
    }

    const [taskItems, setTaskItems] = useState([]);
    const [lastItemId, setLastItemId] = useState(0);

    const addItem = (e) => {
        setTaskItems(preTaskItems => [...preTaskItems, { fieldno: lastItemId }]);
        setLastItemId(lastItemId + 1);
        e.stopPropagation();
    }

    const removeTaskItem = (fieldno) => {
        setTaskItems(prevTaskItems => prevTaskItems.filter(taskItem => taskItem.fieldno !== fieldno));
    }

    return (
        <>
            <div>
                <div className='relative flex justify-between w-full'>
                    <p>
                        {actionGroup.description}
                    </p>
                    <button
                        className='hover:bg-black hover:text-white w-8'
                        onClick={handleRemove}
                    >Edit</button>
                </div >
                <div className='bg-slate-200'>
                    {tasklist.map(taskItem => <TaskItem key={taskItem.id} fieldno={taskItem.id} count={2} remove={removeTaskItem} taskData={taskItem} />)}
                </div>
            </div>
        </>
    )
}

export default ActionGroupDetail