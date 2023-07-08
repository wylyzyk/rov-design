import * as React from "react";
import type { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { CSSTransition } from "react-transition-group";

export type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-right" | "zoom-in-bottom"

type TransitionProps  = CSSTransitionProps & {
    animation?: AnimationName;
    children?: React.ReactNode;
}

export const Transition: React.FC<TransitionProps> = (props) => {
    const { children, animation, classNames, ...restProps } = props;

    return <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
        {children}
    </CSSTransition>
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}

