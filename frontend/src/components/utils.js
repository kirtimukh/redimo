
export const centerAndShow = (setModalProps, setShowEventModal, posRefElementId) => {

    const element = document.getElementById(posRefElementId);
    const rectPoints = element.getBoundingClientRect();

    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;

    switch (posRefElementId) {
        case 'week-container':
            setModalProps({
                boxWidth: element.offsetWidth - 50,
                boxLeft: rectPoints.left + 50,
                boxHeight: element.offsetHeight - 50,
                boxTop: rectPoints.top + 50 - navbarHeight,
            })
            break;
        case 'events-of-the-day':
            setModalProps({
                boxWidth: element.offsetWidth,
                boxLeft: rectPoints.left,
                boxHeight: element.offsetHeight,
                boxTop: rectPoints.top - navbarHeight,
            })
            break;
        default:
            break;
    }

    setShowEventModal(true);
}


export const updateCalendarZState = (zStack, setZStack, componentName) => {
    const index = zStack.indexOf(componentName);
    if (index + 1 === zStack.length) {
        return;
    }
    let tempZStack = [...zStack];
    tempZStack.splice(index, 1);
    tempZStack.push(componentName);
    setZStack(tempZStack);
}


export const updateComponentZState = (
    currentZStack, setCurrentZStack, zStack,
    setZValue, componentName
) => {
    if (currentZStack !== zStack) {
        setCurrentZStack(zStack);
        const index = zStack.indexOf(componentName);
        const tempZNumber = (index + 1) * 10;
        setZValue(tempZNumber);
    }
}