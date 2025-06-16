import React, { useState } from 'react'
import budget from '../assets/images/budget.png'
import { Link } from 'react-router-dom'
const EnergyCalculators = () => {
    const [view, setView] = useState(false)

    const handleView = () => {
        setView(!view)
    }
    return (
        <div className='px-14 pt-24 pb-7'>
            <div className={`${view === true ? 'hidden' : 'block'} w-[60%] mx-auto flex justify-center items-center flex-col gap-3`}>
                <img src={budget} alt="" className='w-[300px]' />
                <div className='mt-6 leading-6 text-center'>
                    <h1 className='text-center font-bold text-3xl'>Energy Calculator</h1>
                    <p className='text-center text-sm text-gray-400 mt-2'>We understand that you may not know your energy needs<br></br> and what products to purchase so we're here to help you<br></br> out.</p>
                    <button onClick={handleView} className='wish px-7 mt-4 cursor-pointer py-3 bg-blue-500 rounded-sm text-white'>Begin</button>
                </div>
            </div>

            <div className={`${view === true ? 'block' : 'hidden'}`}>
                <div className='text-center'>
                    <p className='text-3xl font-bold'>Energy Calculator</p>
                    <div className='text-sm text-gray-400 mt-2 justify-center flex gap-2'>
                        <Link to='/'>Home</Link>
                        <li className='list-disc'>Energy Calculator</li>
                    </div>
                </div>
            </div>j
        </div>
    )
}

export default EnergyCalculators