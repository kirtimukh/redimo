import React, { useEffect, useState } from 'react'
import DraggableX from '../DraggableX';

const Calendar = () => {
    const allowedComponents = ['XMonth', 'XWeek', 'XBoard']
    const showMonth = false
    const showWeek = true
    const showBoard = true
    const [parentSP, setParentSP] = useState({
        boxWidth: 0,
        boxHeight: 0,
    })
    useEffect(() => {
        const selfContainer = document.getElementById('DnDSpace');
        setParentSP({
            boxWidth: selfContainer.offsetWidth,
            boxHeight: selfContainer.offsetHeight,
            boxLeft: selfContainer.offsetLeft,
            boxTop: selfContainer.offsetTop,
        })
    }, [])

    const [zStack, setZStack] = useState(allowedComponents)

    const allProps = {
        zStack, setZStack, parentSP
    }

    return (
        <>
            {/* DndSpace: required for Draggable to work - position (relative or absolute), width, and height */}
            <div className='w-full h-full absolute' id='DnDSpace'>
                {showMonth && <DraggableX {...allProps} componentName='XMonth' posRefElementId='events-of-the-day' />}
                {showWeek && <DraggableX {...allProps} componentName='XWeek' posRefElementId='week-container' />}
                {showBoard && <DraggableX {...allProps} componentName='XBoard' posRefElementId='task-container' />}
            </div>
        </>
    )
}

export default Calendar