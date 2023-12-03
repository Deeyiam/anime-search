import { useEffect, useReducer, useState } from "react"
import { filterData } from "./filterData";
import React from "react";

export interface filteredOption {
    type: string,
    min_score: string,
    rating: string,
    status: string,
    genres: string,
    letter: string
}

type sortedOption = {
    sortOption: string
}

type Props = {
    setCurrentUrl: React.Dispatch<React.SetStateAction<string>>
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

const FilterOption = (props: Props, sortOption: sortedOption) => {

    console.log(sortOption.sortOption, filterData);

    const [state, dispatch] = useReducer(reducer, { sort: '', filter: filteredOptionStart });
    const [filteredOption, setFilteredOption] = useState<filteredOption>(filteredOptionStart) //สร้าง object แยก filteroption
    const [sortedOption, setSortedOption] = useState<string>('Reset')

    function capitalise(option: string) {
        return option.charAt(0).toUpperCase() + option.slice(1);
    }

    function handleFilter(event: any) {
        if (event.target.id != event.target.value && event.target.id)
            switch (event.target.id) { //จำแนก filterOption ตามหมวดหมู่่
                case 'Type':
                    dispatch({
                        type: 'changed_filter',
                        payload: { genres: '', letter: "", min_score: "", rating: "", status: "", type: event.target.value }
                    })
                    break

                case 'Scores':
                    dispatch({
                        type: 'changed_filter',
                        payload: { genres: '', letter: "", min_score: event.target.value, rating: "", status: "", type: "" }
                    })
                    break

                case 'Rating':
                    dispatch({
                        type: 'changed_filter',
                        payload: { genres: '', letter: "", min_score: "", rating: event.target.value, status: "", type: "" }
                    })
                    break;

                case 'Status':
                    dispatch({
                        type: 'changed_filter',
                        payload: { genres: '', letter: "", min_score: "", rating: "", status: event.target.value, type: "" }
                    })
                    break;

                case 'Genre':
                    dispatch({
                        type: 'changed_filter',
                        payload: { genres: event.target.value, letter: "", min_score: "", rating: "", status: '', type: "" }
                    })
                    break;

                case 'Letter':
                    dispatch({
                        type: 'changed_filter',
                        payload: { genres: "", letter: event.target.value, min_score: "", rating: "", status: '', type: "" }
                    })
                    break;

                case 'Reset':
                    const select = document.querySelectorAll('Select')
                    select.forEach((option) => { (option as HTMLInputElement).value = 'all'; })
                    break;
                default:

            }
        else if (event.target.id) {
            dispatch({
                type: 'changed_sort',
                payload: event.target.id
            });
        }

    }

    console.log(sortedOption, state);


    function reducer(state: any, action: any) {
        switch (action.type) {
            case 'changed_filter': {
                const payloadSent = action.payload
                return {
                    ...state,
                    filter: payloadSent
                }
            }
            case 'changed_sort': {
                const payloadSent = action.payload
                return {
                    ...state,
                    sort: payloadSent
                }
            }
            default: return { ...state }
        }

    }
    function combineFilter(state: any) {
        const filterMap = Object.entries!(state);
        const tempFilterMap = [];
        for (let index = 0; index < filterMap.length; index++) {
            if (filterMap[index][1] != "" && filterMap[index][1] != "all") {
                tempFilterMap.push(`${filterMap[index][0]}=${filterMap[index][1]}`)
            }

        }
        return (tempFilterMap.join('&'));
    }

    combineFilter(state.filter);

    //CombineUrlProvider(props, sortOption, { filterOption: filteredOption }) //เอา FilterOption ที่เป็น object ส่งเข้าหน้ารวม Url

    return (
        <div className="grid grid-cols-6 justify-center flex-row">
            {filterData.map((eachSelector: any) => {
                return <div className="grid col-span-3 grid-cols-3" key={`div-${eachSelector.title}`} >
                    <label className='grid ml-2 items-center justify-center text-base' htmlFor={`${eachSelector.title}`} key={`label-${eachSelector.title}`} >{eachSelector.title}:</label>
                    <select className='grid justify-center ml-1 mr-5 my-1 col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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