'use client';

import { useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  value: string;
}

export const InputRadio = ({ name, value }: IProps) => {
  const { register, setValue, watch } = useFormContext();
  const dark_mode = watch('dark_mode');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue('dark_mode', value);
  };

  return (
    <div className='flex items-center space-x-1'>
      <input
        type='radio'
        id={`${name}-${value}`}
        value={value}
        {...register(name)}
        onChange={handleChange}
        className={`${
          dark_mode === 'light' ? 'custom-radio_light' : 'custom-radio_dark'
        }`}
      />
      <label
        htmlFor={`${name}-${value}`}
        className={`text-[12px] ${
          dark_mode === 'light' ? 'light_theme' : 'dark_theme'
        }`}
      >
        {value}
      </label>
    </div>
  );
};
