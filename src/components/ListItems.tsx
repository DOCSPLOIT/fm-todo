import React from 'react'
import { TodoContext } from './Database'
import Cross from '../assets/images/icon-cross.svg'
import Check from '../assets/images/icon-check.svg'
export const ListItems = () => {
    const todoCtx = React.useContext(TodoContext)
    const [filter, setFilter] = React.useState(0);
    const [length, _] = React.useState(todoCtx.items.length)
    const filterList = (count: number) => {
        setFilter(count);
        if (count === 0) {
            todoCtx.all();
            return
        }
        if (count === 1) {
            todoCtx.pendingItems()
        }
        if (count === 2) {
            todoCtx.completedItems()
        }
    }
    return (
        <>        <div className=' transition-[background-color] duration-1000 dark:bg-[#25273c] h-[60vh]  flex flex-col bg-white mt-6  rounded'>
            {todoCtx.items.length > 0 && <div className="grow overflow-y-scroll ">
                {todoCtx.items.map(t => {
                    return <ListItem key={t._id} item={t} onClickRemove={(item: any) => {
                        todoCtx.remove(item)
                    }} onClickComplete={(item: any) => {
                        item.status = "c"
                        todoCtx.upsert(item)
                    }} />
                })}
            </div>}
            {todoCtx.items.length === 0 && (<div className='grow flex'><p className='text-gray-600 m-auto'>No items</p></div>)}
            <div className='h-16 py-5 flex justify-between items-center px-6'>
                <small className='text-gray-600'>{length} items left</small>
                <div className='space-x-2 hidden md:block'>
                    <span onClick={() => filterList(0)} className={(filter === 0 ? 'text-[#5676bf] hover:text-[#5676bf]' : "dark:text-[#5c5d77] text-[hsl(236,9%,61%)]") + ' font-bold hover:text-[#5c5d77] dark:hover:text-white cursor-pointer'}>All</span>
                    <span onClick={() => filterList(1)} className={(filter === 1 ? 'text-[#5676bf] hover:text-[#5676bf]' : "dark:text-[#5c5d77] text-[hsl(236,9%,61%)]") + ' font-bold hover:text-[#5c5d77] dark:hover:text-white cursor-pointer'}>Active</span>
                    <span onClick={() => filterList(2)} className={(filter === 2 ? 'text-[#5676bf] hover:text-[#5676bf]' : "dark:text-[#5c5d77] text-[hsl(236,9%,61%)]") + ' font-bold hover:text-[#5c5d77] dark:hover:text-white cursor-pointer'}>Completed</span>
                </div>
                <p onClick={todoCtx.removeCompleted} className='font-bold  dark:hover:text-white text-[hsl(236,9%,61%)] cursor-pointer hover:text-[#5c5d77] dark:text-[#5c5d77]'>Clear Completed</p>
            </div>
        </div>
            <div className='md:hidden dark:bg-[#25273c] bg-white mt- h-12 flex rounded-md mt-12 justify-center items-center px-6'>
                <div className='space-x-2 '>
                    <span onClick={() => filterList(0)} className={(filter === 0 ? 'text-[#5676bf] hover:text-[#5676bf]' : "dark:text-[#5c5d77] text-[hsl(236,9%,61%)]") + ' font-bold hover:text-[#5c5d77] dark:hover:text-white cursor-pointer'}>All</span>
                    <span onClick={() => filterList(1)} className={(filter === 1 ? 'text-[#5676bf] hover:text-[#5676bf]' : "dark:text-[#5c5d77] text-[hsl(236,9%,61%)]") + ' font-bold hover:text-[#5c5d77] dark:hover:text-white cursor-pointer'}>Active</span>
                    <span onClick={() => filterList(2)} className={(filter === 2 ? 'text-[#5676bf] hover:text-[#5676bf]' : "dark:text-[#5c5d77] text-[hsl(236,9%,61%)]") + ' font-bold hover:text-[#5c5d77] dark:hover:text-white cursor-pointer'}>Completed</span>
                </div>
            </div>

        </>
    )
}

export const ListItem = (props: any) => {
    const [show, setShow] = React.useState(false)
    const onMouseOver = () => setShow(true);
    const onMouseLeave = () => setShow(false)

    return <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className='flex w-full border-b border-b-gray-200 dark:border-b-[#37394e] cursor-pointer text-white pl-1 pr-6'>
        <div className='h-16 w-16 flex'>
            {props.item.status === "c" && (<div className='m-auto flex rounded-full w-6 h-6 bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]'>
                <img src={Check} className="m-auto w-1/2" />
            </div>
            )}
            {props.item.status === "t" && (<div className='
            w-6 h-6 rounded-full border border-[#37394e]
            hover:border-0 m-auto relative z-10 hover:bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]
            hover:before:w-[22px]
            hover:before:h-[22px]
            hover:before:absolute
          dark:hover:before:bg-[#37394e]
            hover:before:bg-white
            hover:before:rounded-full
            hover:before:top-[1px]
            hover:before:left-[1px]
            hover:before:-z-10

          '
                onClick={() => props.onClickComplete(props.item)}
            />

            )}
        </div>
        {
            props.item.status === "t" && (<div>
            </div>)
        }
        <p className={'dark:text-[#cdcfe6]  text-[hsl(236,9%,61%)] grow  m-auto text-xl ' + (props.item.status === 'c' ? 'line-through' : '')}>{props.item.text}</p>
        {
            show && <img onClick={() => {
                props.onClickRemove(props.item)
            }} src={Cross} alt="close" className="h-full m-auto cursor-pointer" />
        }
    </div >
}
