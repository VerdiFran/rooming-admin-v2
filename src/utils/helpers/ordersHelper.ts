import {ExecutorType, OrderType} from "../../redux/reducers/ordersReducer";
import {IN_PROGRESS} from '../../redux/orderFulfillmentStatuses'

/**
 * Updates orders list after single layout order changing.
 * @param items Orders list to update.
 * @param orderId Id of order that contains layout order to change.
 * @param layoutOrderId Id of layout order to change.
 * @param executor User who take the order on execute.
 */
export const updateLayoutOrderExecutor = (items: Array<OrderType>, orderId: number, layoutOrderId: number,
                                          executor: ExecutorType) : Array<OrderType> => {

    const orderToUpdate = items.find(order => order.id === orderId)
    if (!orderToUpdate) {
        throw new Error(`Order with id = ${orderId} not found`)
    }

    const layoutToUpdate = orderToUpdate.layouts.find(layout => layout.id === layoutOrderId)
    if (!layoutToUpdate) {
        throw new Error(`Layout with id = ${layoutOrderId} not found`)
    }

    const updatedLayout = {
        ...layoutToUpdate,
        executor,
        layoutOrderStatus: IN_PROGRESS
    }

    const updatedOrder = {
        ...orderToUpdate,
        layouts: replaceElement(orderToUpdate.layouts, layoutToUpdate, updatedLayout)
    }

    return replaceElement(items, orderToUpdate, updatedOrder)
}

const replaceElement = (items: Array<any>, oldItem: any, newItem: any): Array<any> => {
    let result: any[] = []

    for (let item of items) {
        result = [...result, item.id === oldItem.id ? newItem : item]
    }

    return result
}