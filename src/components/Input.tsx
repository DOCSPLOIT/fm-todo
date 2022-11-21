import React, { ChangeEvent, FormEvent } from 'react'
import { v4 } from 'uuid';
import { TodoContext } from './Database';

export const Input = () => {
    const [value, setValue] = React.useState('')
    const [err, setErr] = React.useState<string>();
    const todoContext = React.useContext(TodoContext)
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (value.length > 0) {
            todoContext.upsert({ status: 't', text: value, _id: v4() })
            setValue('');
        } else {
            setErr('Required Field')
            return;
        }
    }

    const onChangeOrBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value)
    }
    return (
        <div className='mt-10 w-full drop-shadow bg-white dark:bg-[#25273c]  h-16 overflow-hidden flex rounded-md'>
            <div className=' h-16 w-16 flex'>
                <div className='w-6 h-6 rounded-full border border-[#313348] m-auto' ></div>
            </div>
            <form className='grow' onSubmit={onSubmit}>
                <input value={value} className='w-full h-full bg-transparent outline-none dark:text-[#cdcfe6] placeholder:text-xl px-3 ' placeholder='Create new todo...' onChange={onChangeOrBlur} onBlur={onChangeOrBlur} />
                {err && <small className='text-red-500'>{err}</small>}
            </form>
        </div>
    )
}
