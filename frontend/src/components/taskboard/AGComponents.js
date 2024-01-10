import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { debounce } from '../utils'


const AGMini = ({ fieldno, groupId, name, showGroupDetailFn }) => {
    return (
        <>
            <div className='relative flex flex-stretch w-full border-2 border-gray-300 rounded-lg'>
                <input
                    type="text"
                    className="w-full h-10 px-4"
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


const AGInput = ({ dismissInput, showAddDetailsForm }) => {
    const [inputStatus, setInputStatus] = useState('empty');
    const [inputValue, setInputValue] = useState('');

    const updateInputValue = (value, status) => {
        console.log('updateInputValue called');
        if (status === 'valid') {
            setInputStatus('ready');
        }
        setInputValue(value)
    }

    const debouncedUpdateInputValue = useCallback(
        debounce(updateInputValue, 500),
        []
    );

    const handleInputChange = (event) => {
        let value = event.target.value
        let newInputStatus = inputStatus;
        if (value.length > 4 && inputStatus !== 'valid') {
            newInputStatus = 'valid';
            setInputStatus(newInputStatus);
        } else if (value.length < 5 && inputStatus !== 'empty') {
            newInputStatus = 'empty';
            setInputStatus(newInputStatus);
        }
        debouncedUpdateInputValue(value, newInputStatus);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            dismissInput();
            return;
        }
        if (event.key !== 'Enter') return;
        if (inputStatus === 'ready') {
            handleInput()
        }
    }

    const handleClick = () => {
        if (inputStatus === 'ready') {
            handleInput()
        }
    }

    const handleInput = () => {
        if (inputStatus !== 'ready') {
            return;
        }

        showAddDetailsForm();

        // axios.post('http://localhost:8000/xboard/659d440124fb2482a6cfd982/add_action_group', { name: inputValue })
        //     .then(response => {
        //         console.log(response.data);
        //         // handle success here
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         // handle error here
        //     });

    }

    const writingSymbol = (status) => {
        if (status === 'empty') {
            return <span className='inline-block -scale-x-100' onMouseOver={(e) => e.target.innerHTML = '&#10005;'} onMouseOut={(e) => e.target.innerHTML = '&#9998;'}>&#9998;</span>
        } else if (status === 'valid') {
            return <span>&#10003;</span>
        } else if (status === 'ready') {
            return <span>&#9166;</span>
        }
    }

    return (
        <div className='relative flex flex-stretch w-full border-2 border-gray-300 rounded-lg'>
            <input
                type="text"
                className="w-full h-10 px-4"
                placeholder="Add a task"
                onKeyDown={handleKeyDown}
                id="AGInputField"
                onChange={(e) => handleInputChange(e)}
            />
            <button
                className='hover:bg-black hover:text-white w-8'
                onClick={handleClick}
            >
                {writingSymbol(inputStatus)}
            </button>
        </div >
    )
}

export { AGMini, AGInput };
