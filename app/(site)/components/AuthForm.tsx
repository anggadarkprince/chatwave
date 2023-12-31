"use client";

import axios from 'axios';
import {useCallback, useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "@/app/(site)/components/AuthSocialButton";
import {BsGithub, BsGoogle} from "react-icons/bs";
import toast from "react-hot-toast";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [router, session?.status]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      try {
        const result = await signIn('credentials', {
          ...data,
          redirect: false
        });
        if (result?.error) {
          toast.error('Invalid credentials');
        }
        if (result?.ok && !result?.error) {
          toast.success('Logged in!');
          router.push('/users');
        }
      } catch (e) {
        toast.error('Something went wrong')
      }
      setIsLoading(false);
    }
  }

  const socialAction = (provider: string) => {
    setIsLoading(true);
    signIn(provider, {

    })
      .then(result => {
        if (result?.error) {
          toast.error('Invalid credentials');
        }
        if (result?.ok && !result?.error) {
          toast.success('Logged in!');
          router.push('/users');
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadown sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input type={'text'} id={'name'} label={'Full Name'} register={register} errors={errors} disabled={isLoading} placeholder="Your full name" />
          )}
          <Input type={'email'} id={'email'} label={'Email'} register={register} errors={errors} disabled={isLoading} placeholder="Email address" />
          <Input type={'password'} id={'password'} label={'Password'} register={register} errors={errors} disabled={isLoading} placeholder="Password" />
          <div>
            <Button disabled={isLoading} fullWidth type={'submit'}>
              {variant === 'REGISTER' ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"/>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton label="Github" icon={BsGithub} onClick={() => socialAction('github')}/>
            <AuthSocialButton label="Google" icon={BsGoogle} onClick={() => socialAction('google')}/>
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN' ? 'New to ChatWave?' : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm;
