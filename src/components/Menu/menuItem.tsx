import * as React from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";


export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style, children} = props;
    const context = React.useContext(MenuContext);

    const classes = classNames("rov-menu-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index
    });

    const handleClick = () => {
        // index 是可选, 但不是执行 Select 必须的条件
        if (context.onSelect && !disabled && (typeof index === "string")) {
            context.onSelect(index);
        }
    }

    return <li className={classes} style={style} onClick={handleClick}>{children}</li>
}

MenuItem.displayName = "MenuItem";
