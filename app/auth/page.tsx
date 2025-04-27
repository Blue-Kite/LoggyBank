import AuthForm from '@/components/auth-form';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center gap-5">
      <Image
        src="/loggybank.png"
        alt="LoggyBank Logo"
        width={384}
        height={384}
      />
      <div className="w-300 flex flex-col border border-b-2 p-5">
        <div className="mb-4 text-center">
          <h1 className="mb-2 text-2xl font-bold">Welcome to LoggyBank</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
