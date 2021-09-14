import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return (
    <>
      <label htmlFor={props.id} className="sr-only">
        {props.name}
      </label>
      <input {...props} />
    </>
  );
};

export default Input;
