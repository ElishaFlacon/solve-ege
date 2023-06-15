import React, { useMemo } from 'react';
import classes from './Button.module.css';


function Button({ children, onClick, size, disabled, selected }) {
    const styles = useMemo(() => {
        let result = [classes.button];

        switch (size) {
            case 'bg':
                result.push(classes.big);
                break
            case 'sm':
                result.push(classes.small);
                break
            default:
                result.push(classes.normal);
        }

        if (disabled) {
            result.push(classes.disabled);
        }

        if (selected) {
            result.push(classes.selected);
        }

        return result.join(' ');
    }, [children, onClick, size, disabled, selected])


    return (
        <button
            className={styles}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}


export default Button;