import api from '../utility';
import React from 'react'
import { useEffect, useState } from 'react'
import ProductCard from './Product/ProductCard';
function Home() {
    const [products, setProducts] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const product = await api.get('product/getAllProduct');
                if (product.data.products.length > 0) {
                    setLoading(false);
                    setProducts(product.data.products);
                } else {
                    setLoading(false);
                    setProducts("No Product is Found")
                }
            } catch (err) {
                window.alert("No Data is Found");
                setLoading(false);
            } 
        }
        fetchData();
    }, []);
    return (
        <div>
            {
                (loading === true) ? <div>Loading...</div> : 
                <div className='flex flex-wrap pl-5 h-fit bg-gray-100'>
                    {
                        products.map((product) => {
                            return (
                                <ProductCard pid={product._id} name={product.productName}
                                    desc={product.description} category={product.category}
                                    price={product.price} ava={product.numAvailable}
                                    pic={product.itemPicture} rating={product.rating} 
                                />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Home