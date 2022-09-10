import React from 'react'
import { Button } from '../Buttons'

type Props = {
    children?: any,
    isActive: boolean,
    title?: string,
    setIsActive: any,
}

export default function Modals({
    children,
    title,
    isActive,
    setIsActive,
}: Props) {

    if (isActive) {
        return (
            <div
                onAbort={(e) => {
                    setIsActive(false)
                }}
                className='
                            flex flex-row items-center justify-center
                            min-h-full min-w-full absolute 
                            z-10 top-0 left-0 shadow-md bg-blend-overlay bg-black/50
                            '>
                <div className='bg-gray-200 rounded p-8 flex flex-col justify-between opacity-100 space-y-6 w-1/2'>
                    <h1 className='text-lg font-semibold'>{title}</h1>
                    <div className='bg-gray-200'>
                        {children}
                    </div>
                    <div className='flex flex-row justify-end items-center space-x-6'>
                        <Button
                            onClick={(e) => {
                                e.preventDefault()
                                setIsActive(false)
                            }}
                            color='secondary'
                            label='Cancel' 
                            rounded/>
                        <Button 
                            label='Submit' 
                            rounded
                            color='success'
                            />
                    </div>
                </div>
            </div>
        )
    } else {
        return(<></>)
    }
}