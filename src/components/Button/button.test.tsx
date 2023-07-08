import * as React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { Button, ButtonProps } from "./button";

const defaultProps = {
    onClick: jest.fn()
}

const testProps = {
    btnType: "primary",
    size: "large",
    className: "rov-class"
} as ButtonProps;

const disabledProps = {
    disabled: true,
    onClick: jest.fn()
} as ButtonProps;

// 分组
describe("test Button component", () => {
    it("should render the correct default button", () => {
        render(<Button>Button Default</Button>)
        const element = screen.getByText<HTMLButtonElement>("Button Default")
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual("BUTTON");
        expect(element).toHaveClass("btn btn-default");
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        // NOTE: filed
        // expect(defaultProps.onClick).toHaveBeenCalled();
    })

    it("should render the correct component based on different props", () => {
        render(<Button {...testProps}>Primary Button</Button>)
        const element = screen.getByText("Primary Button");
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn-primary btn-large rov-class");
    })

    it("should render a link when 'btnType' equals link and href is provided", () => {
        render(<Button btnType="link" href="https://baidu.com">Link Button</Button>)
        const element = screen.getByText<HTMLButtonElement>("Link Button");
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual("A");
        expect(element).toHaveClass("btn btn-link");
    })

    it("should render disabled button when disabled attr set to 'true'", () => {
        render(<Button {...disabledProps} >Disabled Button</Button>)
        const element = screen.getByText<HTMLButtonElement>("Disabled Button");
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})
