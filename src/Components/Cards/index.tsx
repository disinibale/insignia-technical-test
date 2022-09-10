import React from 'react'

type Props = {
    children?: any,
}

export default function Cards({
    children
}: Props) {
    return (
        <div className='bg-gray-100 p-6 m-6 rounded shadow-lg'>{children}</div>
    )
}