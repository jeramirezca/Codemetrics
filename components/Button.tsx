import { ComponentType, MouseEventHandler, ReactNode } from 'react';
import styles from "./Button.module.scss";

interface ButtonProps {
  disabled?: boolean;
  outlined?: boolean;
  type?: "button" | "submit" | "reset";
  haveIcon?: boolean;
  Icon?: ComponentType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  isRound?: boolean;
  classAdd?: string;
}

export default function Button ({ type = "button", onClick, outlined=false, haveIcon=false, Icon,disabled=false, children, isRound=false, classAdd=""}: ButtonProps) {

  const classComplete = 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-indigo-700'

  const completeClass = classAdd ? classComplete.concat(classAdd) : classComplete;

    return (
      <button onClick={onClick} disabled={disabled} className={completeClass} >
        {haveIcon && Icon ? <Icon /> : null}
        {children}
      </button>
    );
}