import {Button} from "antd";
import React from "react";

/**
 * Component for represent action button.
 * @param handleClick Handler for click event.
 * @param title Title of button.
 * @return {JSX.Element} Button with some configuration.
 * @example take on execution action.
 */
const ActionButton = ({handleClick, title}) => {
    return <Button type="link" onClick={handleClick}>{title}</Button>
}

export default ActionButton