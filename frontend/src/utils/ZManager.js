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
