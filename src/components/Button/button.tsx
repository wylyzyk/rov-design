import * as React from "react";
import classNames from "classnames";

export enum SizeType {
    Large = "large",
    Small = "small"
}

export type ButtonSize = Lowercase<keyof typeof SizeType>;

export enum LegacyButtonType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "link"
}

export type ButtonType = Lowercase<keyof typeof LegacyButtonType>;

interface BaseButtonProps {
    /** 原生 `className` 组件类名 */
    className?: string;
    /** 设置按钮失效状态 */
    disabled?: boolean;
    /** 设置按钮尺寸 */
    size?: ButtonSize;
    /** 设置按钮类型 */
    btnType?: ButtonType;
    /** 需要搭配 `btnType: link` 使用 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
    href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 按钮用于开始一个即时操作。
 */
export const Button: React.FC<ButtonProps> = (props) => {
    const { btnType, size, disabled, href, children, className, ...resetProps } = props;

    const classes = classNames("btn", className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        "disabled": (btnType === LegacyButtonType.Link) && disabled
    })

    if (btnType === LegacyButtonType.Link && href) {
        return <a className={classes} href={href} {...resetProps} >{children}</a>
    } else {
        return <button className={classes} disabled={disabled} {...resetProps}>{children}</button>
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: LegacyButtonType.Default
}
