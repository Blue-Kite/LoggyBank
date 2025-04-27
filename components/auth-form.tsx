'use client';

import { signInWithGithub, signInWithGoogle } from '@/actions/auth';
import { useState } from 'react';
import { Button } from './ui/button';

export default function AuthForm() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Error logging in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      await signInWithGithub();
    } catch (error) {
      console.error('Error logging in with GitHub:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w flex flex-col gap-3">
      <Button
        variant="outline"
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        Continue with Google
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={handleGithubLogin}
        disabled={loading}
      >
        Continue with Github
      </Button>
    </form>
  );
}
