import React, { createContext, useEffect, useState } from 'react'
import CombineUrlProvider from '../../Intermediate/CombineUrlProvider';

interface allcolorDefault {
    Title: boolean;
    Start_date: boolean;
    Score: boolean;
    Rank: boolean;
}

type Props = {
    setCurrentUrl: React.Dispatch<React.SetStateAction<string>>
}

const sortOptions = ['Title', 'Start_date', 'Score', 'Rank'];
const allcolorDefault = sortOptions.reduce((a, v) => ({ ...a, [v]: false }), {});
export const SelectedSort = createContext('Reset')

const SortOption = (props: Props) => {
    //const { setCurrentUrl } = props
    const [toOrange, setToOrange] = useState<allcolorDefault | {}>(allcolorDefault)
    const [sortedOption, setSortedOption] = useState<string>('Reset')

    function handleClick(event: any) {
        const clickValue: string = event.target.value
        const clickStyle = event.target.style
        colorChange(clickValue, clickStyle)
        setSortedOption(clickValue)
        //const newUrl = "https://api.jikan.moe/v4/anime?page=2&limit=9&"
        //setCurrentUrl(newUrl)
    }

    function colorChange(clickValue: string, clickStyle: any) {

        if (clickValue != 'Reset') {
            clickStyle.backgroundColor = 'salmon';
            setToOrange({ ...allcolorDefault, [`${clickValue}`]: true })

        }
        else {
            setToOrange(allcolorDefault)
        }

    }

    useEffect(() => {
        returnToYellow(toOrange)

    }, [toOrange])

    function returnToYellow(toOrange: allcolorDefault | {}) {
        for (let index = 0; index < Object.keys(toOrange).length; index++) {
            if (!Object.values(toOrange)[index]) {
                const unselectedSort = document.getElementById(`${Object.keys(toOrange)[index]}`)
                unselectedSort!.style.backgroundColor = 'rgb(254 240 138)'
            }
        }
    }

    CombineUrlProvider(props, { sortOption: sortedOption })

    return (<div className='grid grid-cols-2'>
        {sortOptions.map((sortOption) => <button id={sortOption} key={sortOption} value={sortOption} className='grid justify-center mx-1 py-1 my-1 text-sm bg-yellow-200 font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            onClick={handleClick}>{sortOption}</button>)}
        <button type='button' value='Reset' className='grid col-span-2 justify-center justify-self-center bg-red-500 w-[100px] mx-2 my-4 rounded-[20px] py-2 text-l hover:bg-red-300' onClick={handleClick}>Reset</button>
    </div>)
}

export default SortOption
