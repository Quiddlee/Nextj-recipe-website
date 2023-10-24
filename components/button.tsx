import { memo, ReactNode } from 'react';

const buttonTypes = {
  filled:
    'rounded-md bg-black-900 px-6 py-[14px] text-white hover:bg-black transition-all focus:border-transparent focus:outline-none focus:ring focus:ring-accent-600 focus:ring-opacity-50',
  empty:
    'rounded-md px-4 py-2 hover:bg-black-100 transition-all focus:border-transparent focus:outline-none focus:ring focus:ring-accent-600 focus:ring-opacity-50',
  rounded:
    'rounded-full hover:bg-black-100 transition-all focus:border-transparent focus:outline-none focus:ring focus:ring-accent-600 focus:ring-opacity-50',
} as const;

interface IButtonProps {
  children: ReactNode;
  type?: keyof typeof buttonTypes;
  onClick?: () => void;
  className?: string;
}

const Button = memo(function Button({
  children,
  type = 'filled',
  onClick,
  className,
}: IButtonProps) {
  const classes = `${buttonTypes[type]} ${className ?? ''}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
});

export default Button;
