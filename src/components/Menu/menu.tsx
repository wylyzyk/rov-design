import * as React from "react";
import classNames from "classnames";
import {MenuItemProps} from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    style?: React.CSSProperties;
    mode?: MenuMode;
    children?: React.ReactNode;
    defaultOpenSubMenus?: string[];

    onSelect?: SelectCallback;
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = React.createContext<IMenuContext>({index: "0"})

export const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, style, mode, children, onSelect, defaultOpenSubMenus } = props;

    const [currentActive, setCurrentActive] = React.useState(defaultIndex)

    const classes = classNames("rov-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical"
    });

    const handleClick = (index: string) => {
        setCurrentActive(index);
        onSelect?.(index);
    }

    const passedContext: IMenuContext = {
        index: currentActive || "0",
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, { index: index.toString() });
            } else {
                console.warn("Menu has a child which is not a MenuItem.");
            }
        })
    }

    return <ul className={classes} style={style} data-testid="testMenu">
        <MenuContext.Provider value={passedContext}>
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
}

Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: []
}
