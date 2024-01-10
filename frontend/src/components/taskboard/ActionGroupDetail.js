import React, { useState } from 'react'
import TaskItem from './TaskItem';
import { PInput } from '../reusables';


const ActionGroupDetail = ({ fieldno, groupId, actionGroup }) => {
    const [editedAGDetails, setEditedAGDetails] = useState(actionGroup);
    let tasklist = editedAGDetails.tasks;

    if (tasklist.length === 0) {
        tasklist = [{ id: 0, name: '..make an entry to save this action group', description: 'Add task description here..' }];
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
                    <PInput textValue={editedAGDetails.description} />
                </div >
                <div className='bg-slate-200'>
                    {tasklist.map(taskItem => {
                        return <TaskItem key={taskItem.id} fieldno={taskItem.id} remove={removeTaskItem} taskData={taskItem} />
                    })}
                </div>
            </div>
        </>
    )
}

export default ActionGroupDetail