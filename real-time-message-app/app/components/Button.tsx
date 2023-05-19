'use client';

import clsx from 'clsx';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}


const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx('flex justify-center py-2 px-3 rounded-md text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2', disabled && 'opacity-50 cursor-default', fullWidth && 'w-full', secondary ? 'text-gray-500' : 'text-white', danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600', !secondary && !danger && 'bg-zinc-800 hover:bg-zinc-700 focus-visible:outline-sky-700')}
        >
            {children}
        </button>
    )

}



export default Button;