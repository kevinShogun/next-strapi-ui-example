'use client';
import React from 'react'

export const Paragrah = ({description}) => {
  return (
    <div>
    {
        description.map((item, index) => (
            <p className="my-4 text-sm text-gray-500 dark:text-gray-400" key={index}>
                {item.children.map((item, index) => (
                   item.bold ? <b key={index}>{item.text}</b> : <span key={index}>{item.text}</span>
                ))}
            </p>
        ))
    }
    </div>
  )
}
