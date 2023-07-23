import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";

const styles: React.CSSProperties = {
    textAlign: "center"
}

const GenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

const meta = {
    title: "Component/Button/Button",
    // tags: ["autodocs"],
    argTypes: {
        disabled: {
            control: "boolean"
        }
    },
    parameters: {},
    decorators: [GenterDecorator],
    component: Button
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
    name: "I am the Primary Button",
    args: {
        btnType: "primary",
        children: "I am the Primary Button"
    },
    decorators: [GenterDecorator],
    render: (args) => <Button {...args } />
} satisfies Story;


/**
 * helelo
 * @param args
 * @constructor
 */
const Basic = (args: any) => {
    return <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <Button btnType={"primary"}>Primary Button</Button>
        <Button>Default Button</Button>
        <Button btnType={"link"} href={"javascript:void(0);"}>Link Button</Button>
        <Button btnType={"danger"}>Danger Button</Button>
        <Button disabled>Disabled Button</Button>
    </div>
}


export const BasicButton = {
    name: "按钮类型",
    args: {},
    render: (args) => Basic(args)
} satisfies Story;
