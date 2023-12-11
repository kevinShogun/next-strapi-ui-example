/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react';
import { ToggleSwitch } from 'flowbite-react';
import { Paragrah } from './Paragrah'
import { AcordionLesson } from './AcordionLesson'

export const Card = ({programs, programsEs}) => {

    const [lang, setLang] = useState('es');
    const [currentPrograms, setcurrentPrograms] = useState(programs)

    useEffect(() => {
        if (lang === 'en') {
            setcurrentPrograms(programs)
        } else {
            setcurrentPrograms(programsEs)
        }
    }, [lang, programs, programsEs]);


    return (
        <div>
            {
                // Create a switch to change the language
                <div className="flex justify-end mb-3 text-gray-500">
                    <p className="mr-2">
                        {lang === 'en' ? 'English' : 'Ingles'}
                    </p>
                    <ToggleSwitch
                        checked={lang === 'es' ? true : false}
                        onChange={() => {
                            setLang(lang === 'en' ? 'es' : 'en')
                        }}
                    />
                    <p className="ml-2">{
                        lang === 'en' ? 'Spanish' : 'Español'
                    }</p>
                </div>
            }

            <div className="flex items-start gap-8 flex-wrap justify-center mb-3">
                {currentPrograms.map(({ attributes, id }) => (
                    <div className="" key={id}>
                        <div
                            className="flex flex-1 flex-col items-center bg-white border overflow-hidden
                            border-gray-200 rounded-lg shadow-xl dark:border-gray-700 dark:bg-gray-800"
                            style={{ width: "500px" }}
                        >
                            {
                                <img
                                    className="object-cover w-full rounded-t-lg h-64 "
                                    src={`/Designer.png`}
                                    alt="" />
                            }
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {attributes.title}
                                </h5>
                                <small className="text-gray-600 text-xs dark:text-gray-300">
                                    {
                                        // format date
                                        // new Date().toLocaleDateString()
                                        attributes.publishedAt
                                    }
                                </small>
                                <Paragrah description={attributes.description} />
                                <AcordionLesson lessons={attributes.lessons} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
