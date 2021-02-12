import { LoginForm } from '@components/Auth';
import { AuthLayout } from '@components/UI';

const LoginPage = () => {
  return (
    <AuthLayout className="bg-accents-0 text-white px-12 py-24">
      <h1 className="font-medium text-5xl">Login</h1>
      <LoginForm className="mt-12" />
    </AuthLayout>
  );
};
export default LoginPage;
