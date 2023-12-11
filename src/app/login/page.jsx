'use client';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi';
const LoginPage = () => {

    const [loginData, setLoginData] = useState({
        identifier: '',
        password: ''
    });

    const [error, seterror] = useState({
        error: '',
        status: false
    })

    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem('token') || '');
        }
    }, []);

    useEffect(() => {
        if (token) {
            window.location.href = '/';
        }
    }, [token]);

    const onSubmit = async (e) => {
        e.preventDefault();
        seterror({
            error: '',
            status: false
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        const data = await response.json();
        console.log('data', data);
        if (data.error) {
            seterror({
                error: data.error.message,
                status: true
            });
            return;
        }

        await localStorage.setItem('token', data.jwt);
        setToken(data.jwt);

        window.location.href = '/';
    }

    if(token) {
        return null;
    }
    
    return (
        
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen"
        >

            {
                error.status ?
                    <Alert color="failure" icon={HiInformationCircle} className="mb-4">
                        {error.error}
                    </Alert>
                    : null

            }
            <div
                className="flex flex-col items-center justify-center w-full max-w-lg p-8 bg-white rounded-xl shadow-lg"
            >
                <h1 className="text-3xl font-bold mb-4 text-black">Login</h1>
                <form className="flex w-full flex-col gap-4"
                    onSubmit={onSubmit}
                >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required
                            onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" type="password" required
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage