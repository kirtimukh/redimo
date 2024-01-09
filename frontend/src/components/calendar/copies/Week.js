import React, { useState, useEffect, useRef } from 'react';
import dayjs from "dayjs";
import Draggable from 'react-draggable';

import EventModal from '../../modals/createEventModal';
import { centerAndShow, updateCalendarZState, updateComponentZState } from '../../utils';

export default function Week({ zStack, setZStack, parentSP }) {
  const componentName = 'Week';

  useEffect(() => {
    const selfContainer = document.getElementById('week-container');
    const selfWidth = selfContainer.offsetWidth;
    const selfHeight = selfContainer.offsetHeight;

    const selfTop = (parentSP.boxHeight / 2) - (selfHeight / 2) + parentSP.boxTop;
    const selfLeft = (parentSP.boxWidth / 2) - (selfWidth / 2) + parentSP.boxLeft;

    selfContainer.style.left = `${selfLeft}px`;
    selfContainer.style.top = `${selfTop}px`;
  }, [parentSP])

  const handleMouseDown = (e) => {
    updateCalendarZState(zStack, setZStack, componentName)
  }

  const [currentZStack, setCurrentZStack] = useState(zStack);
  const [zValue, setZValue] = useState(0);

  updateComponentZState(currentZStack, setCurrentZStack, zStack, setZValue, componentName)

  const startOfWeek = dayjs().startOf('week');

  let weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
  }

  const [showEventModal, setShowEventModal] = useState(false);
  const hideEventModal = () => {
    setShowEventModal(false)
  }

  // EventModal props to position the modal over the table box before displaying it.
  const [eventModalProps, setEventModalProps] = useState({
    boxWidth: 0,
    boxHeight: 0,
    boxTop: 0,
    boxLeft: 0,
  })

  const posRefElementId = 'week-container'

  const displayEventModal = (isDragging) => {
    // return
    if (isDragging) return;
    centerAndShow(setEventModalProps, setShowEventModal, posRefElementId)
  }

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
          id='week-container'
          ref={nodeRef}
          className={`flex absolute`}
          style={{ zIndex: zValue }}
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

      {showEventModal && <EventModal hideModal={hideEventModal} parentSP={eventModalProps} source={"EventOfTheWeek"} />}
    </>
  );
}
