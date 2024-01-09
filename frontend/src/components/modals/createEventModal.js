import React, { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';


export default function EventModal({ hideModal, parentSP, source }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const eventModal = document.getElementById('create-event-form');
    const modalWidth = eventModal.offsetWidth;
    const modalHeight = eventModal.offsetHeight;
    const modalLeft = parentSP.boxLeft + (parentSP.boxWidth / 2) - (modalWidth / 2);
    const modalTop = parentSP.boxTop + (parentSP.boxHeight / 2) - (modalHeight / 2);
    const modalStyleLeft = `${modalLeft}px`;
    const modalStyleTop = `${modalTop}px`;

    eventModal.style.left = modalStyleLeft;
    eventModal.style.top = modalStyleTop;
  }, [])

  return (
    <>
      <Draggable bounds="parent" nodeRef={nodeRef}>
        <div
          onClick={(event) => { event.stopPropagation() }}
          className='bg-amber-200 absolute w-96'
          id='create-event-form'
          ref={nodeRef}
        >
          <div className='w-full h-full'>
            <div className='mangoform bg-lime-300'>
              <h2>Create Event {source}</h2>
              <form className='flex flex-col'>
                <label htmlFor='event-name'>Event Name</label>
                <input
                  className='event-name'
                  type='text'
                  name='event-name'
                  id='event-name' />
                <label htmlFor='event-date'>Event Date</label>
                <input
                  className='event-date'
                  type='date'
                  name='event-date'
                  id='event-date' />
                <label htmlFor='event-time'>Event Time</label>
                <input
                  className='event-time'
                  type='time'
                  name='event-time'
                  id='event-time' />
                <label htmlFor='event-description'>Event Description</label>
                <textarea
                  className='event-description'
                  type='text'
                  name='event-description'
                  id='event-description' />
                <label htmlFor='event-participants'>Participants</label>
                <input
                  className='event-participants'
                  type='text'
                  name='event-participants'
                  id='event-participants' />
                <div className='flex justify-evenly'>
                  <button className='close-btn' onClick={hideModal}>Close</button>
                  <button className='save-btn'>Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Draggable>
      {/* </div> */}
    </>
  );
}
