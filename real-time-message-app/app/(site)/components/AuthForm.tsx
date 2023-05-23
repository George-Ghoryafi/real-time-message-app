'use client';

import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { BsGithub, BsGoogle  } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";

import {toast} from 'react-hot-toast';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        }
        else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register, 
        handleSubmit, 
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data, 
                redirect: false,

            })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Something went wrong!');
                }
                else if(callback?.ok){
                    toast.success('Success')
                }
            })
            .finally(() => setIsLoading(false));
        }
        
        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
        }

    }

    const socialAction = (action: string) => {
            setIsLoading(true);

            signIn(action, {redirect:false})
            .then((callback) => { 
                if (callback?.error) {
                    toast.error('Something went wrong!');
                }
                else if(callback?.ok){
                    toast.success('Success')
                }
            })
            .finally(() => setIsLoading(false));
        }

    return (
        <div className='mt-8 sm:mx-auto w-full sm:max-w-md'>
            <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                <form 
                className='space-y-6' 
                onSubmit={handleSubmit(onSubmit)}> 
                {/* HandleSubmit allows us to collect the data from the submit function once it has been called */}
                    {variant === 'REGISTER' && (
                        <Input 
                            register={register}
                            error={errors}
                            disabled={isLoading}
                            required
                            id="name" 
                            label="Name" 
                            
                        />                    
                    )}
                    <Input 
                        register={register}
                        error={errors}
                        disabled={isLoading}
                        required
                        id="email"
                        label="Email"
                        type="email" 
                        
                    />
                    <Input 
                        register={register}
                        error={errors}
                        disabled={isLoading}
                        required
                        id="password"
                        label="Password"
                        type="password" 
                        
                    />
                    
                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={isLoading}
                        >
                            {variant === 'LOGIN' ? 'Login' : 'Register'} {/** If the variant is login, then the button will say login, otherwise it will say register */}
                        </Button>
                    </div>
                </form>

                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>

                        </div>
                    </div>

                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                    </div>

                </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>
                            {variant === 'LOGIN' ? "Don't have an account?" : 'Already have an account?'}
                        </div>
                        <div onClick={toggleVariant} className='font-medium text-sky-600 hover:text-sky-500'>
                            {variant === 'LOGIN' ? 'Register' : 'Login'}
                        </div>

                    </div>

            </div>
        </div>
    )
}

export default AuthForm;