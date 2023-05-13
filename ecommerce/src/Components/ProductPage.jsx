import React from 'react'
import { useEffect,useState } from 'react'
function ProductPage() {
    const [product,setProduct] = useState('');
    const [review,setReview] = useState('');
    useEffect(() => {
        
    },[]);
    return (
    <div>
        <div className='product'>

        </div>
        <div className='review'>

        </div>
    </div>
    )
}

export default ProductPage