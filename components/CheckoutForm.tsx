'use client';
import React from 'react'

function CheckoutForm() {

    const handleCheckout = async() => {
        console.log('first')
        const res = await fetch('api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        window.location.assign(data)
        console.log(data)
    }
    return (
        <div>
            <button onClick={handleCheckout} className='bg-primary-500 px-4 py-3 rounded-lg'>Checkout</button>
        </div>
    )
}

export default CheckoutForm