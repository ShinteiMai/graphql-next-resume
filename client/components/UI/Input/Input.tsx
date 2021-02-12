import React from 'react';
import { TComponent } from '@components/types';
import { Field } from 'formik';
import clsx from 'clsx';

interface Props extends TComponent {
  name: string;
  label: string;
  type?: string;
  error?: string;
  touched?: boolean;
}

const Input = ({ name, className, label, type, error, touched }: Props) => {
  return (
    <div className={clsx('flex flex-col space-y-1', className)}>
      <label htmlFor="email" className="text-sm font-semibold mb-1">
        {label}
      </label>
      <Field name={name} id={name}>
        {({ field }) => (
          <input
            {...field}
            type={type || 'text'}
            className="text-accents-0 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
      </Field>
      {error && touched && <p className="text-red-500 pt-2">{error}</p>}
    </div>
  );
};

export default Input;
