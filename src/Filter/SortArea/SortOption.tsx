import React, { createContext, useEffect, useState } from 'react'
import { currentUrl } from '../../overallScreen';

interface allcolorDefault {
    Title: boolean;
    Start_date: boolean;
    Score: boolean;
    Rank: boolean;
}

type Props = {
    currentUrl: currentUrl
    setCurrentUrl: React.Dispatch<React.SetStateAction<currentUrl>>
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const sortOptions = ['Title', 'Start_date', 'Score', 'Rank'];
const allcolorDefault = sortOptions.reduce((a, v) => ({ ...a, [v]: false }), {});
export const SelectedSort = createContext('Reset')

const SortOption = (props: Props) => {
    const { currentUrl, setCurrentUrl, setCurrentPage } = props
    const [toOrange, setToOrange] = useState<allcolorDefault | {}>(allcolorDefault)
    const [currValue, setCurrValue] = useState<string>('Reset')

    function handleClick(event: any) {
        setCurrentPage(1)
        const clickValue: string = event.target.value
        const clickStyle = event.target.style
        colorChange(clickValue, clickStyle)
        setCurrValue(clickValue)
    }

    function colorChange(clickValue: string, clickStyle: any) {

        if (clickValue != 'Reset' && !!clickValue) {
            clickStyle.backgroundColor = 'salmon';
            setToOrange({ ...allcolorDefault, [`${clickValue}`]: true })

        }
        else {
            setToOrange(allcolorDefault)
        }

    }

    function setUrlBasefx(clickValue: string) {
        if (clickValue == 'Reset') {
            setCurrentUrl({ ...currentUrl, sortUrl: `` })
        }
        else {
            setCurrentUrl({ ...currentUrl, sortUrl: `&order_by=${clickValue.toLowerCase()}` })
        }
    }


    useEffect(() => {
        returnToYellow(toOrange)
    }, [toOrange])

    useEffect(() => {
        setUrlBasefx(currValue)
    }, [currValue])


    function returnToYellow(toOrange: allcolorDefault | {}) {
        for (let index = 0; index < Object.keys(toOrange).length; index++) {
            if (!Object.values(toOrange)[index]) {
                const unselectedSort = document.getElementById(`${Object.keys(toOrange)[index]}`)
                unselectedSort!.style.backgroundColor = 'rgb(254 240 138)'
            }
        }
    }


    return (<div className='grid grid-cols-2'>
        {sortOptions.map((sortOption) => <button id={sortOption} key={sortOption} value={sortOption} className='grid col-span-2 lg:col-span-1 justify-center mx-6 lg:mx-1 py-1 my-1 text-sm bg-yellow-200 font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            onClick={handleClick}>{sortOption}</button>)}
        <button type='button' value='Reset' className='grid col-span-2 justify-center justify-self-center bg-red-500 w-[100px] mx-2 my-4 rounded-[20px] py-2 text-l hover:bg-red-300' onClick={handleClick}>Reset</button>
    </div>)
}

export default SortOption
