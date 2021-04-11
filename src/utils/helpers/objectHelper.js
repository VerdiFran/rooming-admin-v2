/**
 * Updates element from array.
 * @param items Array of items.
 * @param itemId Value of property for search in array.
 * @param objPropName Name of property for search in array.
 * @param newObjProps New element.
 * @return Array with updated element.
 */
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item
    })
}
