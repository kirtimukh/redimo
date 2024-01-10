
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


export const debounce = (func, delay = 1000) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args)
        }, delay)
    }
}