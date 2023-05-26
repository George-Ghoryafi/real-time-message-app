'use client'; 

import {SessionProvider} from 'next-auth/react';

interface AuthConetextProps {
    children: React.ReactNode;
}

export default function AuthContext(
    {children}: AuthConetextProps) 
    {
        return <SessionProvider>{children}</SessionProvider>
    }
