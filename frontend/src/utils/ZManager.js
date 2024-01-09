export const ZManager = {

    addSelfToStack: (zStack, id) => {
        const currentMaxZ = parseInt(Object.keys(zStack).reverse()[0]);
        const newZ = currentMaxZ + 10;
        zStack[newZ] = id;
        const newElement = document.getElementById(id);
        newElement.style.zIndex = newZ;
    },
    removeSelfFromStack: (zStack, id, setState) => {
        const removeElement = document.getElementById(id);
        zIndex = removeElement.style.zIndex;
        for (let key in zStack) {
            if (key > zIndex) {
                stackElementId = zStack[key];
                delete zStack[key];
                zStack[key - 10] = stackElementId;
            }
        }
        setState(false);
    },
    updateZForAll: (zStack) => { },
}
