import {Menu, MenuProps} from "./menu";
import { MenuItem } from "./menuItem";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import { SubMenu } from "./subMenu";

const testProps: MenuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: "test"
}

const testVerProps: MenuProps = {
    defaultIndex: "0",
    mode: "vertical"
}

const GenerateMenu = (props: MenuProps) => {
    return <Menu {...props}>
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem>xyz</MenuItem>
        <SubMenu title={"dropdown"}>
            <MenuItem>drop1</MenuItem>
            <MenuItem>drop2</MenuItem>
        </SubMenu>
    </Menu>
}

const createStyleFile = () => {
    const cssFile: string = `
        .rov-submenu { display: none;}
        .rov-submenu.menu-opened { display: block; }
    `
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssFile;
    return style;
}

let menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe("test Menu and MenuItem component", () => {
    // beforeEach 会在每个钩子函数开始之前执行
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        const { container } = render(GenerateMenu(testProps));
        container.append(createStyleFile());
        // screen.getByRole("body").append(createStyleFile());
        // eslint-disable-next-line testing-library/prefer-screen-queries
        menuElement = screen.getByTestId("testMenu");
        activeElement = screen.getByText("active")
        disabledElement = screen.getByText("disabled");
    })

    it("should render correct Menu and MenuItem based on default props", () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass("rov-menu test");
        expect(menuElement.querySelectorAll(":scope > li").length).toBe(4)
        expect(activeElement).toHaveClass("rov-menu-item is-active");
        expect(disabledElement).toHaveClass("rov-menu-item is-disabled");
    })

    it("click items should change active and call the right callback", () => {
        const thirdItem = screen.getByText("xyz");
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass("is-active");
        expect(activeElement).not.toHaveClass("is-active");
        expect(testProps.onSelect).toHaveBeenCalledWith("2");

        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass("is-active");
        expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
    })

    it("should render vertical mode when mode is set to vertical", () => {
        cleanup();
        render(GenerateMenu(testVerProps));
        const menuElement = screen.getByTestId("testMenu");
        expect(menuElement).toHaveClass("menu-vertical");
    })

    it("should show dropdown items when hover on subMenu",  async () => {
        expect(screen.queryByText("drop1")).not.toBeVisible();
        const dropdownElement = screen.getByText("dropdown");

        fireEvent.mouseEnter(dropdownElement);
        await waitFor(() => {
            expect(screen.queryByText("drop1")).toBeVisible()
        });
        fireEvent.click(screen.getByText("drop1"));
        expect(testProps.onSelect).toHaveBeenCalledWith("3-0");

        fireEvent.mouseLeave(dropdownElement);
        await waitFor(() => {
            expect(screen.queryByText("drop1")).not.toBeVisible();
        })
    })
})
