import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
    title: "Component/Input/Input",
    tags: ["autodocs"],
    component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryInput = {
    name: "PrimaryInput",
    args: {
        size: "large",
        value: 23,
        prepend: <div>https://</div>
    },
    render: (args) => <Input {...args} />
} satisfies Story;
