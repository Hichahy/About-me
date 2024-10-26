import { useForm, useFormContext } from 'react-hook-form';
import { InputRadio } from '../controls/inputRadio/InputRadio';

export const FrameContent = () => {
  const methods = useFormContext();
  const { watch } = methods;
  const dark_mode = watch('dark_mode');

  return (
    <>
      <div
        className={`absolute top-0 h-8 md:h-10 flex items-center justify-between px-10 md:px-40 w-full left-0`}
      >
        <p
          className={`text-black m-0 p-0 text-[12px] ${
            dark_mode === 'light' ? 'light_theme' : 'dark_theme'
          }`}
        >
          localhost:3000/
        </p>
        <form className='flex gap-4'>
          <InputRadio value='light' name='dark_mode' />
          <InputRadio value='dark' name='dark_mode' />
        </form>
      </div>
      <div className='absolute bottom-0 left-0 w-5 md:w-10 flex justify-center py-20 md:py-40 text-nowrap'>
        <p
          className={`text-black m-0 p-0 text-[12px] -rotate-90  ${
            dark_mode === 'light' ? 'light_theme' : 'dark_theme'
          }`}
        >
          npm install
        </p>
      </div>
    </>
  );
};
