import HOC from "../HOC";

import React, { useState, useRef } from 'react'
import { generateDate, months } from "../../../utils/calendar";
import cn from "../../../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import DayEventList from '../../modals/DayEventList';
import Draggable from 'react-draggable';

import dayjs from "dayjs";


function LMonth({
    parentSP,
    handleMouseDown,
    zNumber,
    displayEventModal,
    contextProps
}) {

    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

    const nodeRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

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
                    id="month-container"
                    ref={nodeRef}
                    style={{ zIndex: zNumber }}
                    className={`flex gap-10 items-center absolute items-stretch`}
                    onMouseDownCapture={(e) => handleMouseDown(e)}
                >
                    <div className="w-96" onClick={(event) => { event.stopPropagation() }}>
                        <div className="flex justify-between items-center">
                            <h1 className="select-none font-semibold">
                                {months[today.month()]}, {today.year()}
                            </h1>
                            <div className="flex gap-10 items-center ">
                                <GrFormPrevious
                                    className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                    onClick={() => {
                                        setToday(today.month(today.month() - 1));
                                    }}
                                />
                                <h1
                                    className=" cursor-pointer hover:scale-105 transition-all"
                                    onClick={() => {
                                        setToday(currentDate);
                                    }}
                                >
                                    Today
                                </h1>
                                <GrFormNext
                                    className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                    onClick={() => {
                                        setToday(today.month(today.month() + 1));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-7 ">
                            {days.map((day, index) => {
                                return (
                                    <h1
                                        key={index}
                                        className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                                    >
                                        {day}
                                    </h1>
                                );
                            })}
                        </div>

                        <div className=" grid grid-cols-7 ">
                            {generateDate(today.month(), today.year()).map(
                                ({ date, currentMonth, today }, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                                        >
                                            <h1
                                                className={cn(
                                                    currentMonth ? "" : "text-gray-400",
                                                    today
                                                        ? "bg-red-600 text-white"
                                                        : "",
                                                    selectDate
                                                        .toDate()
                                                        .toDateString() ===
                                                        date.toDate().toDateString()
                                                        ? "bg-black text-white"
                                                        : "",
                                                    "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                                                )}
                                                onClick={() => {
                                                    setSelectDate(date);
                                                }}
                                            >
                                                {date.date()}
                                            </h1>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <DayEventList selectDate={selectDate} displayEventModal={displayEventModal} />
                </div>
            </Draggable>
        </>

    )
}

export default HOC(LMonth);