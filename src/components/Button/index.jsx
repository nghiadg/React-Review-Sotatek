import React from "react";
import styles from "./Button.module.css";
import cs from "classnames";

const Button = ({ children, className, isBlock, ...props }) => {
  return (
    <button
      className={cs(styles.button, { [styles.block]: isBlock }, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
