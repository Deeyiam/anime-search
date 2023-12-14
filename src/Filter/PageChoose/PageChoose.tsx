import React, { useEffect, useState } from 'react'
import { currentUrl } from '../../overallScreen'

interface Props {
    currentUrl: currentUrl
    setCurrentUrl: React.Dispatch<React.SetStateAction<currentUrl>>
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const PageChoose = (props: Props) => {
    const { currentUrl, setCurrentUrl, currentPage, setCurrentPage } = props


    function setPage(event: any) {
        switch (event.target.value) {
            case 'decrease':
                if (currentPage > 1) {
                    setCurrentPage(currentPage - 1)
                }
                break;

            case 'increase':
                setCurrentPage(currentPage + 1)
                break;

        }
    }

    useEffect(() => {
        setCurrentUrl({ ...currentUrl, pageUrl: currentPage })
    }, [currentPage])


    return (
        <div className='grid rounded-2xl m-4 col-span-6 h-8 grid-cols-[10fr_1fr_1fr_1fr_10fr]'>
            <div></div>
            <button className='grid  bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-xl' value='decrease' onClick={setPage}>Prev</button>
            <button className='grid bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4'>{currentPage}</button>
            <button className='grid bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r-xl' value='increase' onClick={setPage} >Next</button>
            <div></div>
        </div>
    )
}

export default PageChoose

