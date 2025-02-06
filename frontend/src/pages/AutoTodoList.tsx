import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify'

interface Item {
    type: 'Fruit' | 'Vegetable';
    name: string;
}

function AutoTodoList() {

    const [items, setItems] = useState<Item[]>([
        { type: 'Fruit', name: 'Apple' },
        { type: 'Vegetable', name: 'Broccoli' },
        { type: 'Vegetable', name: 'Mushroom' },
        { type: 'Fruit', name: 'Banana' },
        { type: 'Vegetable', name: 'Tomato' },
        { type: 'Fruit', name: 'Orange' },
        { type: 'Fruit', name: 'Mango' },
        { type: 'Fruit', name: 'Pineapple' },
        { type: 'Vegetable', name: 'Cucumber' },
        { type: 'Fruit', name: 'Watermelon' },
        { type: 'Vegetable', name: 'Carrot' },
    ])

    const [newItem, setNewItem] = useState<string>('');
    const [selectedType, setSelectedType] = useState<'Fruit' | 'Vegetable' | ''>('');
    const [movedItems, setMovedItems] = useState<Item[]>([]);

    const addItem = () => {
        if (!newItem.trim()) {
            toast.error('Plz enter item name!')
            return
        }
        if (!selectedType) {
            toast.error('Plz select type (Vegetable or Fruit)!')
            return
        }
        if (items.some(item => item.name.toLowerCase() === newItem.toLowerCase())) {
            toast.error(`"${newItem}" already exists!`)
            return
        }
        
        const newItemObject = { type: selectedType, name: newItem }
        setItems([...items, newItemObject])
        setNewItem('')
        toast.success(`Added "${newItem}" to ${selectedType}!`)
    }

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
        toast.success("Item removed!");
    };

    const moveItem = (index: number) => {
        const item = items[index];
        setItems(items.filter((_, i) => i !== index));
        setMovedItems([...movedItems, item]);

        setTimeout(() => {
            setItems((prevItems) => {
                if (!prevItems.some(existingItem => existingItem.name === item.name)) {
                    setMovedItems((prevMovedItems) => prevMovedItems.filter((_, i) => i !== 0));
                    return [...prevItems, item];
                }
                return prevItems;
            });
        }, 5000);
    };
    
    const moveBackFirst = () => {
        if (movedItems.length > 0) {
            setItems([...items, movedItems[0]]);
            setMovedItems(movedItems.slice(1));
        }
    };

    const moveBackSelected = (name: string) => {
        setItems((prevItems) => [...prevItems, movedItems.find(item => item.name === name)!]);
        setMovedItems((prevMovedItems) => prevMovedItems.filter(item => item.name !== name));
    };


    return (

        <div className="bg-white flex flex-col md:flex-row w-full text-sm mb-10">
            <div className="flex-1 border px-10 md:px-10 sm:px-2 py-2 sm:py-7 flex flex-col gap-5 md:pb-10">
                <input
                    className="max-h-[45px] w-full sm:flex-1 outline-none px-5 py-2 border border-gray-400"
                    type="text"
                    placeholder="Create New Item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <div className="flex">
                    <button
                        type="button"
                        className={`w-full px-2 py-3 ${
                            selectedType === 'Vegetable' ? 'bg-blue-500' : 'bg-gray-300'
                        } text-white`}
                        onClick={() => setSelectedType('Vegetable')}
                    >
                        Vegetable
                    </button>
                    <button
                        type="button"
                        className={`w-full px-2 py-3 ${
                            selectedType === 'Fruit' ? 'bg-blue-500' : 'bg-gray-300'
                        } text-white`}
                        onClick={() => setSelectedType('Fruit')}
                    >
                        Fruit
                    </button>
                </div>
                <button onClick={() => addItem()} type="button" className="w-full bg-green-500 text-white px-2 py-3">
                    ADD
                </button>
                <b className='pl-2'>Item list :</b>
                <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 min-h-[500px] max-h-[500px] overflow-y-auto">
                    {items.map((item, index) => (
                        <div key={index} className="relative w-full mb-1">
                            <button onClick={() => moveItem(index)} className="w-full hover:scale-105 transition ease-in-out rounded-[8px] text-[1.5rem] px-5 py-5 text-gray-700 mb-2 bg-gray-200 relative">
                                {item.name}
                            </button>
                            <p onClick={() => removeItem(index)} className="absolute top-2 right-1 -translate-y-1/2 translate-x-1/2 hover:scale-110 transition ease-in-out cursor-pointer w-8 h-8 text-center leading-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center">
                                <FontAwesomeIcon icon={faClose} className="text-[15px]" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 border px-10 md:px-10 sm:px-2 py-2 sm:py-7 flex flex-col gap-5 md:pb-10">
                <b className='pl-2'>Vegetable :</b>
                <div onClick={moveBackFirst} className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2">
                    {movedItems.filter(item => item.type === 'Vegetable').map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                moveBackSelected(item.name);
                            }}
                            className="w-full hover:scale-105 transition ease-in-out rounded-[8px] text-[1.5rem] px-5 py-5 text-gray-700 mb-2 bg-green-300 relative"
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 border px-10 md:px-10 sm:px-2 py-2 sm:py-7 flex flex-col gap-5 md:pb-10">
                <b className='pl-2'>Fruit :</b>
                <div onClick={moveBackFirst} className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2">
                    {movedItems.filter(item => item.type === 'Fruit').map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                moveBackSelected(item.name);
                            }}
                            className="w-full hover:scale-105 transition ease-in-out rounded-[8px] text-[1.5rem] px-5 py-5 text-gray-700 mb-2 bg-red-300 relative"
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AutoTodoList
