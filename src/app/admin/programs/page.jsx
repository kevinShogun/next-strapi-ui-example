'use client';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'flowbite-react';
import { getProgramsOnly } from '../../lib/programs'
import Link from 'next/link';

const TableProgramPage = () => {

    const [data, setdata] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem('token') || '');
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/english-programs?locale=en`);
            const res = await getProgramsOnly('en');
            if (res) {
                // const data = await res.json();
                setdata(res);
            } else {
                console.log('error')
            }
        }
        if (typeof window !== "undefined" && token) {
            getData();
        }

    }, [token]);

    console.log(data)

    return (
        <div
            className="flex flex-col flex-1 w-full min-h-screen"
        >
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                w-[130px] h-10 mt-20 ml-10
            "
        >
            <Link
                href="/admin/programs/create"
            >Agregar</Link>
        </button>
            <div className='px-20 pt-8 mx-auto w-full'>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Id</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>lessons Quantity</Table.HeadCell>
                            <Table.HeadCell>slug</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='"divide-y'>
                            {data && data.map((item, index) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={index}
                                >
                                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{item.id}</Table.Cell>
                                    <Table.Cell>{item.title}</Table.Cell>
                                    <Table.Cell>{item.lessonsQuantity}</Table.Cell>
                                    <Table.Cell>{item.slug}</Table.Cell>
                                    <Table.Cell>
                                        <Link href={`/admin/programs/${item.slug}`}>
                                            Edit
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default TableProgramPage