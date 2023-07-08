import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { Icon } from "../Icon/icon";

type InputSize = "large" | "small" | "default";

type NativeInputHTMLAttributes = Omit<InputHTMLAttributes<HTMLElement>, "size">;

export interface InputProps extends NativeInputHTMLAttributes {
  /** 设置组件禁用 */
  disabled?: boolean;
  /** 设置组件大小 */
  size?: InputSize;
  /** 设置图标 */
  icon?: IconProp;
  /** 前缀 */
  prepend?: string | ReactElement;
  /** 后缀 */
  append?: string | ReactElement;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 */
export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;

  const classes = classNames("rov-input-wrapper", {
    [`input-size-${size}`]: "size",
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });

  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };

  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className={"rov-input-group-prepend"}>{prepend}</div>}
      {icon && (
        <div className={"icon-wrapper"}>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className={"rov-input-inner"} disabled={disabled} {...restProps} />
      {append && <div className={"rov-input-group-append"}>{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  size: "default",
};
