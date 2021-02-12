import React from 'react';
import clsx from 'clsx';
import { TComponent } from '@components/types';
import Fluid from '../Fluid';

interface Props extends TComponent {}

const AuthLayout = ({ children, className }: Props) => {
  return (
    <div className="text-accents-0 grid grid-cols-6 h-screen">
      <div className={clsx(className, 'col-span-2')}>{children}</div>
      <div className="col-span-4">
        <Fluid />
      </div>
    </div>
  );
};

export default AuthLayout;
