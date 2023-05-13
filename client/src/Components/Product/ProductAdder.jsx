import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './ProductAdder.css'
function ProductAdder() {
    const [pname, setPname] = useState('');
    const [desc, setDesc] = useState('');
    const [categ, setCateg] = useState('');
    const [numAv, setnumAv] = useState(0);
    const [itemPic, setitemPic] = useState('');
    const [price, setPrice] = useState(0);

    const priceChanger = (e) => {
        setPrice(e.target.value);
    }

    const PnameChanger = (e) => {
        setPname(e.target.value);
    }

    const DescChanger = (e) => {
        setDesc(e.target.value);
    }

    const CategChanger = (e) => {
        setCateg(e.target.value);
    }

    const numAvChanger = (e) => {
        setnumAv(e.target.value);
    }

    const itemPicChanger = (e) => {
        setitemPic(e.target.value);
    }

    const addProduct = async function (e) {
        try {
            let res = await axios.post('http://localhost:3000/product/addProduct', {
                productName: pname,
                description: desc,
                category: categ,
                money: price,
                numAvailable: numAv,
                itemPicture: itemPic
            });
            if (res.status === 201) {
                window.alert("Added");
            } else {
                window.alert("Not Added");
            }
        } catch (err) {
            window.alert(err.message);
        }
        e.preventDefault();
    }
    return (
        <div>
            <h1 className='text-3xl'>Enter Product Details Here </h1>
            <form formAction='post' className='productAdding bg-neutral-600 mt-5 p-2'>
                <div>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'>Product Name</label><br />
                    <input type='text' placeholder='Product Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={pname} onChange={PnameChanger} />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'> Price </label><br />
                    <input type='number' min='1' placeholder='1' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={price} onChange={priceChanger} />
                </div>
                <div>
                    <label className='block  text-sm font-medium text-gray-900 dark:text-white'>Description</label><br />
                    <textarea className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={desc} onChange={DescChanger}></textarea>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'>Category</label><br />
                    <input type='text' placeholder='Enter the Category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={categ} onChange={CategChanger} />
                </div>
                <div>
                    <label className='block  text-sm font-medium text-gray-900 dark:text-white'> No of Items Available</label><br />
                    <input type='number' min='1' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={numAv} onChange={numAvChanger} />
                </div>
                <div>
                    <label className='block  text-sm font-medium text-gray-900 dark:text-white'>Link for Item Picture</label><br />
                    <input type='text' placeholder='Give The Link for Picture' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={itemPic} onChange={itemPicChanger} />
                </div>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => addProduct()}>Submit</button>
            </form>
        </div>
    )
}

export default ProductAdder