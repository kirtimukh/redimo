import React, { useState, useRef, useEffect } from 'react'

import { centerAndShow, } from '../utils';
import { updateCalendarZState, updateComponentZState } from '../../utils/ZManager';


const HOC = (WrappedComponent) => {
    return function EnhancedComponent({
        zStack, setZStack, parentSP, componentName, posRefElementId
    }) {

        const handleMouseDown = (e) => {
            updateCalendarZState(zStack, setZStack, componentName)
        }

        const [currentZStack, setCurrentZStack] = useState(zStack);
        const [zNumber, setZNumber] = useState(0);

        updateComponentZState(currentZStack, setCurrentZStack, zStack, setZNumber, componentName)

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

        const displayEventModal = (isDragging) => {
            const index = currentZStack.indexOf(componentName);
            if (index + 1 !== currentZStack.length) {
                return
            }

            if (isDragging) {
                return
            }

            centerAndShow(setEventModalProps, setShowEventModal, posRefElementId)
        }

        const contextProps = {}
        const props = {
            parentSP,
            handleMouseDown,
            zNumber,
            displayEventModal,
            contextProps
        }

        const xComponents = ['XMonth', 'XWeek', 'XBoard']
        if (xComponents.includes(componentName)) {
            return <WrappedComponent componentName={componentName} {...props} />
        }

        return <>
            <WrappedComponent {...props} />
        </>;
    }
}

export default HOC;