'use client';
import { Accordion, Badge, Kbd } from 'flowbite-react';

export const AcordionLesson = ({ lessons }) => {
    const { data } = lessons;
    // filter data to get only unique lessons
    const uniqueLessons = data.filter((item, index) => {
        return data.indexOf(item) === index;
    })
    return (
        <Accordion>
            {
                data && data.map(({ id, attributes }) => (
                    <Accordion.Panel
                        key={id}
                    >
                        <Accordion.Title className='text-base'>{attributes.name}</Accordion.Title>
                        <Accordion.Content>
                            {
                                attributes.available ?
                                <Badge color="blue" className="mr-2 p-3 text-sm">Aviable - Level {attributes.level} 
                                <Kbd className="ml-2 text-sm">{attributes.duration} min</Kbd>
                                </Badge>
                                : <Badge color="red" className="mr-2 p-2">Not Aviable</Badge>
                            }
                            <br/>
                            <b className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                                Date: {attributes.initDate}
                            </b>
                            {
                                attributes.description.map((item, index) => (
                                    <p className="my-2 text-sm text-gray-500 dark:text-gray-400" key={index}>
                                        {item.children.map((item, index) => (
                                            item.bold ? <b key={index}>{item.text}</b> : <span key={index}>{item.text}</span>
                                        ))}
                                    </p>
                                ))
                            }
                        </Accordion.Content>
                    </Accordion.Panel>
                ))
            }
        </Accordion>

    )
}
