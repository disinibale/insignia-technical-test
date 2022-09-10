import React from 'react'
import { Button } from '../Buttons'

type Props = {
    children?: any,
    isActive: boolean,
    title?: string,
    setIsActive: any,
    onCancel?: () => void
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function Modals({
    children,
    title,
    isActive,
    setIsActive,
    onCancel = () => { return },
    onSubmit
}: Props) {

    if (isActive) {
        return (
            <div
                className='
                            flex flex-row items-center justify-center
                            min-h-full min-w-full absolute 
                            z-10 top-0 left-0 shadow-md bg-blend-overlay bg-black/50
                            '>
                <div className='bg-gray-200 rounded p-8 flex flex-col justify-between opacity-100 space-y-6 w-1/3'>
                    <h1 className='text-lg font-semibold'>{title}</h1>
                    <form
                        onSubmit={onSubmit}>
                        <div className='bg-gray-200'>
                            {children}
                        </div>
                        <div className='flex flex-row justify-end items-center space-x-6'>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    onCancel()
                                    setIsActive(false)
                                }}
                                color='secondary'
                                label='Cancel'
                                rounded />
                            <Button
                                type='submit'
                                label='Submit'
                                rounded
                                color='success'
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
}