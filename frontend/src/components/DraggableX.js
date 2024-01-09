import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable';
import HOC from './calendar/HOC';
import XMonth from './calendar/XMonth';
import XWeek from './calendar/XWeek';
import XBoard from './taskboard/XBoard';


const DraggableX = ({
    componentName,
    parentSP,
    handleMouseDown,
    zNumber,
    displayEventModal,
    contextProps
}) => {
    const nodeRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const commonClassName = 'absolute '

    let XComponent, componentId, componentClassName;
    if (componentName === 'XMonth') {
        XComponent = XMonth
        componentId = 'month-container'
        componentClassName = commonClassName
    } else if (componentName === 'XWeek') {
        XComponent = XWeek
        componentId = 'week-container'
        componentClassName = commonClassName
    } else if (componentName === 'XBoard') {
        XComponent = XBoard
        componentId = 'task-container'
        componentClassName = commonClassName + 'border-2 border-gray-300 rounded-lg'
    }

    const props = {
        isDragging,
        parentSP,
        displayEventModal,
        contextProps
    }

    return (
        <>
            <Draggable
                bounds="parent"
                nodeRef={nodeRef}
                onDrag={() => setIsDragging(true)}
                onStop={() => {
                    setTimeout(() => {
                        setIsDragging(false)
                    }, 30)
                }}
            >
                <div
                    id={componentId}
                    ref={nodeRef}
                    style={{ zIndex: zNumber }}
                    className={componentClassName}
                    onMouseDownCapture={(e) => handleMouseDown(e)}
                >
                    <XComponent {...props} />
                </div>
            </Draggable>
        </>
    )
}

export default HOC(DraggableX)