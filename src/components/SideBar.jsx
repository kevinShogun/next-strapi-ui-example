'use client';
import React, { Fragment, use, useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react';
import {
    HiArrowSmRight,
    HiX,
    HiUser,
    HiHome
} from 'react-icons/hi';
import { FaTableList } from "react-icons/fa6";


export const SideBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem('token') || '');
        }
    }, []);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black z-50
                fixed top-0 left-0 m-8"
                style={{
                    display: isOpen ? 'none' : 'flex'
                }}
                href="#"
            >Menu</button>
            <div
                className={`fixed top-0 inset-x-0 z-30 w-full h-full bg-gray-900 bg-opacity-50 ${isOpen ? 'flex' : 'hidden'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Sidebar
                    className="fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            {
                                <Fragment>
                                    <Sidebar.Item href="/" icon={HiHome}>
                                        Home
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/admin/programs" icon={FaTableList}
                                        style={{
                                            display: token ? 'flex' : 'none'
                                        }}
                                    >
                                        Programs
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiArrowSmRight}
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            window.location.href = '/login';
                                        }}
                                        style={{
                                                display: token ? 'flex' : 'none'
                                            }}
                                    >
                                        Logout
                                    </Sidebar.Item>

                                    <Sidebar.Item href="/login" icon={HiUser}
                                        style={{
                                            display: token ? 'none' : 'flex'
                                        }}
                                    >
                                        Login
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/register" icon={HiArrowSmRight}
                                        style={{
                                            display: token ? 'none' : 'flex'
                                        }}
                                    >
                                        Sign Up
                                    </Sidebar.Item>

                                    <Sidebar.Item
                                        icon={HiX}
                                        className="cursor-pointer"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        Close menu
                                    </Sidebar.Item>
                                </Fragment>
                            }
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </>
    )
}
