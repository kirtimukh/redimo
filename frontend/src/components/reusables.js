import { useState } from 'react';


export const PInput = ({ textValue }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(textValue);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleClick = () => {
        setIsEditable(true);
    }

    const handleInputBlur = () => {
        setIsEditable(false);
    }

    return (
        <>
            {
                isEditable ? (
                    <input
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder='enter text here..'
                        className='w-full h-5'
                        autoFocus
                    />
                ) : (
                    <p data-editable onClick={handleClick} className='w-full h-5'>
                        {inputValue}
                    </p>
                )
            }
        </>
    )
}