import AuthForm from '@/components/auth-form';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex flex-row min-h-screen items-center justify-center gap-5">
      <Image
        src="/loggybank.png"
        alt="LoggyBank Logo"
        width={384}
        height={384}
      />
      <div className="flex flex-col w-300 border border-b-2 p-5">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">Welcome to LoggyBank</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
