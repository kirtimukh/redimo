import HOC from "../HOC";

import React, { useState, useEffect, useRef } from 'react';
import dayjs from "dayjs";
import Draggable from 'react-draggable';


function LWeek({
    parentSP,
    handleMouseDown,
    zNumber,
    displayEventModal,
    contextProps
}) {

    useEffect(() => {
        const selfContainer = document.getElementById('week-container');
        const selfWidth = selfContainer.offsetWidth;
        const selfHeight = selfContainer.offsetHeight;

        const selfTop = (parentSP.boxHeight / 2) - (selfHeight / 2) + parentSP.boxTop;
        const selfLeft = (parentSP.boxWidth / 2) - ((selfWidth - 50) / 2) + parentSP.boxLeft - 50;

        selfContainer.style.left = `${selfLeft}px`;
        selfContainer.style.top = `${selfTop}px`;
    }, [parentSP])

    const startOfWeek = dayjs().startOf('week');

    let weekDates = [];
    for (let i = 0; i < 7; i++) {
        weekDates.push(startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
    }

    const nodeRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <>
            <Draggable
                bounds="parent"
                nodeRef={nodeRef}
                onDrag={() => {
                    setIsDragging(true)
                }}
                onStop={() => {
                    setTimeout(() => {
                        setIsDragging(false)
                    }, 100)
                }}
            >
                <div
                    id='week-container'
                    ref={nodeRef}
                    className={`flex absolute`}
                    style={{ zIndex: zNumber }}
                    onMouseDownCapture={(e) => handleMouseDown(e)}
                >
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th role="columnheader">
                                    </th>
                                    {weekDates.map(date => (
                                        <th role="columnheader" key={date}>
                                            <h4>{dayjs(date).format('ddd')}</h4>
                                            <p className='text-xl transition-all'>{dayjs(date).format('D')}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 24 }).map((_, hour) => {
                                    hour = hour.toString().padStart(2, '0');
                                    return (
                                        <tr key={hour}>
                                            <td className="align-top font-mono">{hour}:00</td>
                                            {weekDates.map(date => (
                                                <td className='border-t border-l border-gray-100 rounded-l-none' key={`${date}-${hour}-00-59`}
                                                    onClick={() => { displayEventModal(isDragging) }}></td>
                                            ))}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Draggable>
        </>
    );
}


export default HOC(LWeek);