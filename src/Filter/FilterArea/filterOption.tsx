import { useState } from "react"
import { filterData } from "./filterData";
import React from "react";
import CombineUrlProvider from '../../Intermediate/CombineUrlProvider';


type Props = {
    setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;

}

export interface filteredOption {
    type: string,
    min_score: string,
    rating: string,
    status: string,
    genres: string,
    letter: string
}


const filteredOptionStart = {
    type: '',
    min_score: '',
    rating: '',
    status: '',
    genres: '',
    letter: ''
}

function getOnlyNumber(genreEvent: string) {
    const element = [];
    for (let index = 0; index < genreEvent.length; index++) {
        if (parseInt(genreEvent[index]) || genreEvent[index] == '0') { element.push(genreEvent[index]) }
    }
    return element.join('')

}

const FilterOption = (props: Props) => {

    const [filteredOption, setFilteredOption] = useState<filteredOption>(filteredOptionStart)


    function capitalise(option: string) {
        return option.charAt(0).toUpperCase() + option.slice(1);
    }

    function handleFilter(event: any) {
        switch (event.target.id) {
            case 'Type':
                setFilteredOption({ ...filteredOption, 'type': event.target.value })
                break;

            case 'Scores':
                setFilteredOption({ ...filteredOption, 'min_score': getOnlyNumber(event.target.value) })
                break;

            case 'Rating':
                setFilteredOption({ ...filteredOption, 'rating': event.target.value })
                break;

            case 'Status':
                setFilteredOption({ ...filteredOption, 'status': event.target.value })
                break;

            case 'Genre':
                setFilteredOption({ ...filteredOption, 'genres': getOnlyNumber(event.target.value) })
                break;

            case 'Letter':
                setFilteredOption({ ...filteredOption, 'letter': event.target.value })
                break;

            default:
                const select = document.querySelectorAll('Select')
                select.forEach((option) => { option.value = 'all'; })

        }

    }

    CombineUrlProvider(props, { sortOption: 'Reset' }, { filterOption: filteredOption })

    return (
        <div className="grid grid-cols-6 justify-center flex-row">
            {filterData.map((eachSelector: any) => {
                return <div className="grid col-span-3 grid-cols-3" key={`div-${eachSelector.title}`} >
                    <label className='grid ml-2 items-center justify-center text-base' htmlFor={`${eachSelector.title}`} key={`label-${eachSelector.title}`} >{eachSelector.title}:</label>
                    <select className='grid justify-center mx-1 col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 m-1 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        onChange={handleFilter} id={`${eachSelector.title}`} key={`${eachSelector.title}`}>
                        {eachSelector.options.map((option: string) => { return <option key={`type-${option}`} value={`${option}`} >{capitalise(option)}</option> })}
                    </select>
                </div>
            })}
            <button type='button' className='grid justify-center justify-self-center bg-red-500 w-[100px] mx-2 my-2 rounded-[20px] py-2 text-l col-span-6' id="Reset" value="Reset"
                onClick={
                    (event) => { setFilteredOption(filteredOptionStart), handleFilter(event) }}>Reset</button>
        </div>)
}


export default FilterOption