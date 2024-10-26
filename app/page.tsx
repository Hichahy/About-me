'use client';

import dynamic from 'next/dynamic';
import { FrameContent } from './components/frameContent/FrameContent';
import { FormProvider, useForm } from 'react-hook-form';

const RubikCube = dynamic(() => import('./components/rubikCube/RubikCube'), {
  ssr: false,
});

export default function Home() {
  const methods = useForm({
    defaultValues: {
      dark_mode: 'light',
    },
  });
  const { watch } = methods;
  const dark_mode = watch('dark_mode');

  return (
    <FormProvider {...methods}>
      <FrameContent />
      <div
        className={`p-5 pt-8 md:pt-10 md:p-10 h-screen ${
          dark_mode === 'light' ? 'light_theme' : 'dark_theme'
        }`}
      >
        <div
          className={`border-[1px] ${
            dark_mode === 'light' ? 'border-black' : 'border-white'
          } h-full `}
        ></div>
      </div>
    </FormProvider>
  );
}
