import Modals from '../../Components/Modals'
import { IOObjectKeys } from '../../Interfaces/Components'
import { useState, useEffect } from 'react'
import { Button } from '../../Components/Buttons'
import { toast } from 'react-toastify'
import {
    useGetCustomersQuery,
    useGetCustomerByIdMutation,
    useCreateCustomerMutation,
    useRemoveCustomerMutation,
    useUpdateCustomerMutation,
    // useUpdateCustomerMutation
} from '../../Store/Apis/customers'

interface PayloadType extends IOObjectKeys {
    name: string,
    email: string,
    phone: string,
    address: string
}

export default function Customers() {
    const [isModalActive, setIsModalActive] = useState(false)
    const [modalType, setModalType] = useState('')
    const [id, setId] = useState(0)
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
    const [payload, setPayload] = useState<PayloadType>({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const { data: customers, error, isLoading, isSuccess, isError } = useGetCustomersQuery({ pageSize: 25, page: 1 })
    const [getCustomerById, {
        data: customerData,
        error: customerError,
        isLoading: customerIsLoading,
        isSuccess: customerIsSuccess,
        isError: customerIsError,
    }] = useGetCustomerByIdMutation()
    const [createCustomer, {
        data: create,
        error: createError,
        isLoading: createIsLoading,
        isSuccess: createIsSuccess,
        isError: createIsError
    }] = useCreateCustomerMutation()
    const [updateCustomer, {
        data: update,
        error: updateError,
        isLoading: updateIsLoading,
        isSuccess: updateIsSuccess,
        isError: updateIsError
    }] = useUpdateCustomerMutation()
    const [removeCustomer, {
        data: deleteData,
        error: deleteError,
        isLoading: deleteIsLoading,
        isSuccess: deleteIsSuccess,
        isError: deleteIsError
    }] = useRemoveCustomerMutation()

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>, payloadSetter: any) => {
        const temp = { ...payload }
        temp[event.target.name] = event.target.value
        payloadSetter(temp)
    }

    const handleUpdateCustomer = (id: any) => {
        getCustomerById(id)
        setId(id)
        setModalType('edit')
        setIsModalActive(true)
    }

    useEffect(() => {
        if (isSuccess) {
            console.log(customers)
        }
        if (isError) {
            console.log(error)
        }
        // eslint-disable-next-line
    }, [isLoading])

    useEffect(() => {
        if (createIsSuccess) {
            console.log(create, "RESULT DATA")
            setIsModalActive(false)
            toast.success('Customer Created')
        }
        if (createIsError) {
            console.log(createError)
            toast.error('Error on creating customer')
        }
        // eslint-disable-next-line
    }, [createIsLoading])

    useEffect(() => {
        if (updateIsSuccess) {
            console.log(update)
            setIsModalActive(false)
            toast.success('Customer Updated')
        }
        if (updateIsError) {
            console.log(updateError)
            toast.error('Error on updating customer')
        }
        // eslint-disable-next-line
    }, [updateIsLoading])

    useEffect(() => {
        if (deleteIsSuccess) {
            console.log(deleteData)
            toast.success('Customer Removed')
        }
        if (deleteIsError) {
            console.log(deleteError)
            toast.error('Error on removing customer')
        }
        // eslint-disable-next-line
    }, [deleteIsLoading])

    useEffect(() => {
        if (customerIsSuccess) {
            console.log(customerData)
            setPayload(customerData.data.attributes)
        }
        if (customerIsError) {
            console.log(customerError)
        }
        // eslint-disable-next-line
    }, [customerIsLoading])

    console.log(selectedCustomer)

    return (
        <div>
            <div className='flex flex-row justify-between items-center mb-6'>
                <h3 className='font-semibold text-2xl'>Customers</h3>
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        setModalType('add')
                        setIsModalActive(true)
                    }}
                    label='Create'
                    rounded size='sm'
                />
            </div>
            <table className='w-full table-fixed border-collapse border-slate-700'>
                {isLoading ? (
                    <div className='flex flex-auto items-center justify-center'>
                        <h1>Loading ...</h1>
                    </div>
                ) : (
                    <>
                        <thead className='font-semibold'>
                            <tr>
                                <td className='border border-slate-700 p-2'>Name</td>
                                <td className='border border-slate-700 p-2'>Phone</td>
                                <td className='border border-slate-700 p-2'>Email</td>
                                <td className='border border-slate-700 p-2'>Address</td>
                                <td className='border border-slate-700 p-2'>Created At</td>
                                <td className='border border-slate-700 p-2'>Updated At</td>
                                <td className='border border-slate-700 p-2'>Published At</td>
                                <td className='border border-slate-700 p-2 text-center'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers?.data?.map((el: any, i: number) => (
                                    <tr key={el.id} className='hover:bg-gray-300'>
                                        <td className='border border-slate-700 p-2'>{el.attributes.name}</td>
                                        <td className='border border-slate-700 p-2'>{el.attributes.phone}</td>
                                        <td className='border border-slate-700 p-2'>{el.attributes.email}</td>
                                        <td className='border border-slate-700 p-2'>{el.attributes.address}</td>
                                        <td className='border border-slate-700 p-2'>{el.attributes.createdAt}</td>
                                        <td className='border border-slate-700 p-2'>{el.attributes.updatedAt}</td>
                                        <td className='border border-slate-700 p-2'>{el.attributes.publishedAt}</td>
                                        <td className='border border-slate-700 p-2'>
                                            <div className='flex flex-row justify-center items-center space-x-2'>
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleUpdateCustomer(el.id)
                                                    }}
                                                    label='Edit'
                                                    rounded
                                                    color='success'
                                                    size='sm' />
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        removeCustomer(el.id)
                                                        // console.log('wakwaw')
                                                    }}
                                                    label={deleteIsLoading ? 'Loading ...' : 'Remove'}
                                                    rounded color='danger'
                                                    size='sm'
                                                    disabled={deleteIsLoading}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </>
                )}
            </table>

            <Modals
                onCancel={() => setPayload({
                    name: '',
                    email: '',
                    phone: '',
                    address: ''
                })}
                onSubmit={(e) => {
                    e.preventDefault()
                    if (modalType === 'add') {
                        createCustomer(payload)
                    }
                    if (modalType === 'edit') {
                        updateCustomer({ id, payload })
                    }
                    setPayload({
                        name: '',
                        email: '',
                        phone: '',
                        address: ''
                    })
                }}
                title={modalType === 'add' ? 'Create Customer' : 'Edit Customer'}
                setIsActive={setIsModalActive}
                isActive={isModalActive}>
                <div className='flex flex-col space-y-4 mb-6'>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={(e) => {
                            handleFieldChange(e, setPayload)
                        }}
                        defaultValue={payload?.name}
                        className='w-full p-4 focus:outline-green-500'
                        placeholder='Name'
                        name='name' />
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={(e) => {
                            handleFieldChange(e, setPayload)
                        }}
                        defaultValue={payload?.email}
                        className='w-full p-4 focus:outline-green-500'
                        placeholder='Email'
                        name='email' />
                    <label htmlFor='address'>Address</label>
                    <input
                        onChange={(e) => {
                            handleFieldChange(e, setPayload)
                        }}
                        defaultValue={payload?.address}
                        className='w-full p-4 focus:outline-green-500'
                        placeholder='Address'
                        name='address' />
                    <label htmlFor='phone'>Phone</label>
                    <input
                        onChange={(e) => {
                            handleFieldChange(e, setPayload)
                        }}
                        defaultValue={payload?.phone}
                        className='w-full p-4 focus:outline-green-500'
                        placeholder='Phone'
                        name='phone' />
                </div>
            </Modals>
        </div>
    )
}