import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi';


const DayEventList = ({ selectDate, displayEventModal }) => {

    return (
        <div className="w-96 flex flex-col" id="events-of-the-day">
            <div className="flex justify-between w-full top-0">
                <div>
                    <h1 className="font-semibold">
                        Schedule for {selectDate.toDate().toDateString()}
                    </h1>
                    <p className="text-gray-400">No meetings for today.</p>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
                        onClick={(e) => displayEventModal()}
                    >
                        <FiPlus className="w-full h-full"
                        />
                    </button>
                </div>
                {/* <div>
                    {returnDate && isScheduled && <h1>Your meeting is booked for {returnDate}</h1>}
                    {isScheduled === false && <h1>Your meeting is not booked</h1>}
                </div> */}
            </div>
            <div className='w-full flex-grow'></div>
        </div>
    )
}

export default DayEventList
