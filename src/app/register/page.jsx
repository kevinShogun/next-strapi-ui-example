'use client';
import React, { Fragment, useEffect, useState } from 'react'
import { Label, TextInput, Button, Alert } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi';

const RegisterPage = () => {

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: ''
    });

    const [error, seterror] = useState({
        error: '',
        status: false,
        type: 'failure'
    });

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
        e.preventDefault()
        if (registerData.password !== registerData.confirmPass) {
            seterror({
                error: 'Password does not match',
                status: true,
                type: 'warning'
            });
            return;
        }

        seterror({
            error: '',
            status: false,
            type: 'failure'
        });

        const dataForm = registerData;
        delete dataForm.confirmPass;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        const data = await response.json();
        localStorage.setItem('token', data.jwt);
        if(data.error){
            seterror({
                error: data.error.message,
                status: true
            })
        }
    }

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen"
        >
        {
                error.status ? 
                <Alert color={error.type} icon={HiInformationCircle} className="mb-4">
                    {error.error}
                </Alert>
                : null

            }
        
            <div
                className="flex flex-col items-center justify-center w-full max-w-lg p-8 bg-white rounded-xl shadow-lg"
            >
                <h1 className="text-3xl font-bold mb-4 text-black">Register</h1>
                <form className="flex w-full flex-col gap-4"
                    onSubmit={onSubmit}
                >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="userName" value="Your user name" />
                        </div>
                        <TextInput id="userName" type="text" placeholder="user name" required
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" type="password" required
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="confirmPass" value="Confirm your password" />
                        </div>
                        <TextInput id="confirmPass" type="password" required
                            onChange={(e) => setRegisterData({ ...registerData, confirmPass: e.target.value })}
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage