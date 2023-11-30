import SignInForm from '@/components/form/SignInForm';
import { FC } from "react"

const LoginPage: FC = async () => {
  return (
    <div className='w-full'>
      <SignInForm />
    </div>
  );
};

export default LoginPage