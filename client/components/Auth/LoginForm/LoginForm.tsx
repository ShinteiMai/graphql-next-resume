import React from 'react';
import { TComponent } from '@components/types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { Input } from '@components/UI';

const loginSchema = yup.object({
  email: yup.string().email('Email must be valid').required('Email is empty'),
  password: yup.string().required('Password is empty'),
});

interface Props extends TComponent {}

const LoginForm = ({ className }: Props) => {
  return (
    <div className={clsx(className)}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          const { email, password } = values;
          console.log(email, password);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              name="email"
              label="Email Address"
              type="email"
              error={errors.email}
              touched={touched.email}
              className="mb-5"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              error={errors.password}
              touched={touched.password}
              className="mb-5"
            />

            <div className="flex justify-end mb-16">
              <a className="cursor-pointer text-sm text-blue-400 font-medium hover:underline focus:text-blue-100">
                Forgot your password?
              </a>
            </div>

            <button
              className="w-full bg-white text-accents-0 py-3 rounded-md font-semibold transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none"
              type="submit"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
