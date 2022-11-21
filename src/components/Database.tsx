import { PouchCollection, IModel, PouchModel } from 'pouchorm';
import { createContext, FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';


interface ITodo extends IModel {
    status: 'c' | 't';
    text: string;
}

class TodoCollection extends PouchCollection<ITodo>{ }


const _db = new TodoCollection('todo');


export const TodoContext = createContext<ITodoContext>({
    upsert(doc) { },
    all() {

    },
    completedItems() {

    },
    pendingItems() {

    },
    items: [],
    remove(doc) {

    },
    removeCompleted() {

    },
});

interface ITodoContext {
    upsert: (doc: ITodo) => void;
    remove: (doc: ITodo) => void;
    items: ITodo[];
    completedItems: () => void;
    removeCompleted: () => void
    pendingItems: () => void;
    all: () => void
}



export default function Database(props: PropsWithChildren) {
    const [items, setItems] = useState<ITodo[]>([]);

    // UPDATE || CREATE
    function upsert(doc: ITodo) {
        _db.upsert(doc).then(res => {
            all()
        }).catch(console.error);
    }
    // DELETE DOCUMENT
    function remove(doc: ITodo) {
        _db.remove(doc).then(_ => all()).catch(console.error)

    }
    // GET ALL ITEMS
    function all() {
        _db.find().then(res => {
            setItems(res)
        }).catch(console.error)
    }

    // GET ALL COMPLETED TODO
    function completedItems() {
        _db.find({ status: 'c' }).then(res => {
            setItems(res)
        }).catch(console.error)
    }
    // PENDING TODO
    function pendingItems() {
        _db.find({ status: 't' }).then(res => {
            setItems(res)
        }).catch(console.error)
    }
    function removeCompleted() {
        _db.find({ status: 'c' }).then(res => {
            res.forEach(t => {
                _db.remove(t);
            })
            all();
        })
    }

    useEffect(() => {
        all()
    }, [])

    return <TodoContext.Provider value={{ upsert, remove, items, completedItems, pendingItems, all, removeCompleted }}>
        {props.children}
    </TodoContext.Provider>
}