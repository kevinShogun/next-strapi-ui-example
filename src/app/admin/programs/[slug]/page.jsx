'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getOneProgramOnly } from '../../../lib/programs';
import { Button, FileInput, Label, TextInput, Textarea } from 'flowbite-react';

export default function PageEdit() {
    const { slug } = useParams();
    const [dataForm, setDataForm] = useState({
        title1: '',
        title2: '',
        lessons: '',
        aviableDate: '',
        description1: '',
        description2: '',
        slug: '',
        cover: null
    });


    const [datafromApi, setdata] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem('token') || '');
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/english-programs?locale=en`);
            const res = await getOneProgramOnly(slug);
            if (res) {
                // const data = await res.json();
                setdata(res);
                const originalDate = new Date(res[0].aviableDate);
                const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')}T${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}.${originalDate.getMilliseconds().toString().padStart(3, '0')}Z`;
                setDataForm({
                    title1: res[0].title,
                    title2: res[1].title,
                    lessons: res[0].lessonsQuantity,
                    description1: res[0].description[0].children[0].text,
                    description2: res[1].description[0].children[0].text,
                    slug: res[0].slug,
                    // format date
                    aviableDate: formattedDate
                    
                })
            } else {
                console.log('error')
            }
        }
        if (typeof window !== "undefined" && token) {
            getData();
        }

    }, [token, slug]);

    // console.log(datafromApi)

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if(!datafromApi  || datafromApi === null){
            return;
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/english-programs/${datafromApi[0].id}?locale=en`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    "data": {
                        title: dataForm.title1,
                        description: [{
                            "type": "paragraph",
                            "children": [
                                {
                                    "text": dataForm.description1,
                                    "type": "text",
                                }
                            ]
                        }],
                        slug: dataForm.slug,
                        lessonsQuantity: dataForm.lessons,
                        locale: 'en',
                        aviableDate: dataForm.aviableDate
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
        });


        const respEsp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/english-programs/${datafromApi[1].id}?locale=es-CR`, {
            method: 'PUT',
            body: JSON.stringify({
                "data": {
                    title: dataForm.title2,
                    description: [{
                        "type": "paragraph",
                        "children": [
                            {
                                "text": dataForm.description2,
                                "type": "text",
                            }
                        ]
                    }],
                    slug: dataForm.slug,
                    lessonsQuantity: dataForm.lessons,
                    aviableDate: dataForm.aviableDate,
                    locale: 'es-CR'
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        const dataEsp = await respEsp.json();
        console.log(data, dataEsp);

        if (data && dataEsp) {
            alert('Programa creado correctamente');
            setDataForm({
                title1: '',
                title2: '',
                lessons: '',
                aviableDate: '',
                description1: '',
                description2: '',
                slug: '',
                cover: null
            });
        }

        // This a example description from nextjs
        // Este es una descripción ejemplo desde nextjs
    }

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen
            p-16
          "
        >
            <div
                className="flex flex-col items-center justify-center w-full p-8 bg-white rounded-xl shadow-lg"
            >
                <h1 className="text-3xl font-bold mb-4 text-black">Update program</h1>
                <form className="flex w-full flex-col gap-4"
                    onSubmit={onSubmitForm}
                >
                    <div className="w-full flex gap-4">
                        <div className='w-full md:w-1/2'>
                            <div className="mb-2 block">
                                <Label htmlFor="title1" value="Your title" />
                            </div>
                            <TextInput id="title1" type="text"
                                placeholder="Title example"
                                required
                                value={dataForm.title1}
                                onChange={(e) => setDataForm({
                                    ...dataForm,
                                    title1: e.target.value,
                                    slug: e.target.value.toLowerCase().replace(/ /g, '-')
                                })}
                            />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <div className="mb-2 block">
                                <Label htmlFor="title2" value="Your title in spanish" />
                            </div>
                            <TextInput id="title2" type="text" placeholder="Titulo de ejemplo" required
                                value={dataForm.title2}
                                onChange={(e) => setDataForm({ ...dataForm, title2: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="w-full flex gap-4">
                        <div className='w-full md:w-1/2'>
                            <div className="mb-2 block">
                                <Label htmlFor="lessons" value="Your quantity of lessons" />
                            </div>
                            <TextInput id="lessons" type="number" placeholder="3" required
                                value={dataForm.lessons}
                                onChange={(e) => setDataForm({ ...dataForm, lessons: e.target.value })}
                            />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <div className="mb-2 block">
                                <Label htmlFor="aviableDate" value="Your date" />
                            </div>
                            <TextInput id="aviableDate" type="datetime-local" required
                                value={dataForm.aviableDate}
                                onChange={(e) => setDataForm({ ...dataForm, aviableDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="w-full flex gap-4">
                        <div className='w-full md:w-1/2'>
                            <div className="mb-2 block">
                                <Label htmlFor="aviableDate" value="Your description" />
                            </div>
                            <div className="mb-2 block min-h-[180px]">
                                <Textarea id="aviableDate" required
                                    className="min-h-[180px] resize-none"
                                    placeholder='Descripcion'
                                    value={dataForm.description1}
                                    onChange={(e) => setDataForm({ ...dataForm, description1: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <div className="mb-2 block">
                                <Label htmlFor="aviableDate" value="Your description" />
                            </div>
                            <div className="mb-2 block min-h-[180px]">
                                <Textarea id="aviableDate" required
                                    className="min-h-[180px] resize-none"
                                    placeholder='Descripcion'
                                    value={dataForm.description2}
                                    onChange={(e) => setDataForm({ ...dataForm, description2: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex gap-4">
                        <div className='w-full md:w-1/2'>
                            <div className="mb-2 block">
                                <Label htmlFor="aviableDate" value="Your slug" />
                            </div>
                            <TextInput id="aviableDate" type="text" required
                                placeholder='Slug'
                                value={dataForm.slug}
                                onChange={(e) => setDataForm({ ...dataForm, slug: e.target.value })}
                            />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <div className="mb-2 block">
                                <Label htmlFor="aviableDate" value="Your cover banner" />
                            </div>
                            <FileInput id="file-upload"
                                accept="image/*"
                                onChange={(e) => {
                                    setDataForm({ ...dataForm, cover: e.target.files[0] })
                                }}
                            />
                        </div>
                    </div>

                    <div
                        className="flex justify-end"
                    >
                        <Button type="submit" value="Submit" >
                            update program
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}