import * as React from "react";
import {MenuContext} from "./menu";
import classNames from "classnames";
import {MenuItemProps} from "./menuItem";
import {useState} from "react";
import { Icon } from "../Icon/icon";
import { Transition } from "../Transition/transition";


export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: React.ReactNode;
}

export const SubMenu: React.FC<SubMenuProps> = (props) => {
    const { className, children, title, index } = props;
    const context = React.useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpened = (index && context.mode === "vertical") ? openedSubMenus.includes(index) : false;
    const [menuOpen, setMenuOpen] = useState(isOpened);
    const classes = classNames("rov-menu-item submenu-item", className, {
        "is-active": context.index === index
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    }

    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setMenuOpen(toggle);
        }, 300);
    }

    const clickEvents = context.mode === "vertical" ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== "vertical" ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames("rov-submenu", {
            "menu-opened": menuOpen
        })

        const childrenComp = React.Children.map(children, (child, i) => {
           const childElement = child as React.FunctionComponentElement<MenuItemProps> ;
           const { displayName } = childElement.type;
           if (displayName === "MenuItem") {
               return React.cloneElement(childElement, { index: `${index}-${i}`})
           } else {
               console.warn("Menu has a child which is not a MenuItem.");
           }
        });
        return <Transition in={menuOpen} timeout={300} animation={"zoom-in-top"}>
            <ul className={subMenuClasses}>
                {childrenComp}
            </ul>
        </Transition>
    }

    return <li key={index} className={classes} {...hoverEvents}>
        <div className="submenu-title" {...clickEvents}>
            {title}
            <Icon icon={"angle-down"} className={"arrow-icon"} />
        </div>
        {renderChildren()}
    </li>
};

SubMenu.displayName = "SubMenu";

