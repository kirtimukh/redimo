import React, { useState } from 'react'


const ActionGroupMini = ({ fieldno, groupId, name, showGroupDetailFn }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputValue = event.target.value;
            if (inputValue.length > 0) {
                console.log('Enter key pressed with input value: ' + inputValue);
            }
        }
    }

    return (
        <>
            <div className='relative flex flex-stretch w-full border-2 border-gray-300 rounded-lg'>
                <input
                    type="text"
                    className="w-full h-10 px-4"
                    placeholder="Add a task"
                    onKeyDown={handleKeyDown}
                    value={name}
                    readOnly
                />
                <button
                    className='text-3xl hover:bg-black hover:text-white w-8'
                    onClick={(e) => { showGroupDetailFn(groupId) }}
                >
                    &#8250;
                </button>
            </div >
        </>
    )
}

export default ActionGroupMini