import { Button } from "../button";

export const Basic = () => {
    return <div style={{ }}>
        <Button btnType={"primary"}>Primary Button</Button>
        <Button>Button Default</Button>
        <Button btnType={"link"} href={"#"}>Link Button</Button>
        <Button btnType={"danger"}>Danger Button</Button>
        <Button disabled>Disabled Button</Button>
    </div>
}
