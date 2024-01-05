import { useEffect, useState } from "react"
import { filterData } from "./filterData";
import React from "react";
import { currentUrl } from "../../overallScreen";

export interface filteredOption {
    type: string,
    rating: string,
    status: string,
    genres: string,
    min_score: number
}


type Props = {
    currentUrl: currentUrl
    setCurrentUrl: React.Dispatch<React.SetStateAction<currentUrl>>
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const filteredOptionStart = {
    type: '',
    rating: '',
    status: '',
    genres: '',
    min_score: 0,
}

function getOnlyNumber(genreEvent: string) {
    const element = [];
    for (let index = 0; index < genreEvent.length; index++) {
        if (parseInt(genreEvent[index]) || genreEvent[index] == '0') { element.push(genreEvent[index]) }
    }
    return element.join('')

}

const FilterOption = (props: Props) => {
    const { currentUrl, setCurrentUrl, setCurrentPage } = props
    const [filteredOption, setFilteredOption] = useState<filteredOption>(filteredOptionStart) //สร้าง object แยก filteroption
    const [filteredObli, setFilteredObli] = useState<string>('')
    const [scoreRange, setScoreRange] = useState<number>(0)

    function capitalise(option: string) {
        return option.charAt(0).toUpperCase() + option.slice(1);
    }

    function capitaliseGenre(option: string) {
        const cap = capitalise(option)
        const cut = cap.search(":")
        if (cut > 0) { return cap.slice(0, cut) }
        else return cap
    }

    function handleFilter(event: any) {
        setCurrentPage(1)
        switch (event.target.id) {
            case 'Type':
                setFilteredOption({ ...filteredOption, 'type': event.target.value })
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

            default:
                const select = document.querySelectorAll('Select')
                select.forEach((option) => { (option as HTMLInputElement).value = 'all'; })
        }

    }

    useEffect(() => {
        setFilteredObli(combineFilter(filteredOption))
    }, [filteredOption])

    useEffect(() => {
        setUrlBasefx2(filteredObli)


    }, [filteredObli])

    function combineFilter(filterOption: filteredOption) {
        const filterMap = Object.entries!(filterOption);
        const tempFilterMap = [];
        for (let index = 0; index < filterMap.length; index++) {
            if (filterMap[index][1] != "" && filterMap[index][1] != "all") {
                tempFilterMap.push(`${filterMap[index][0]}=${filterMap[index][1]}`)
            }

        }
        return tempFilterMap.join('&');
    }



    function setUrlBasefx2(filteredObli: string) {
        if (filteredObli == '') {
            setCurrentUrl({ ...currentUrl, filterUrl: `` })
        }
        else { setCurrentUrl({ ...currentUrl, filterUrl: `&${filteredObli}` }) }
    }

    function handleClick(event: any) {
        setScoreRange(event.target.value);
        setFilteredOption({ ...filteredOption, 'min_score': event.target.value })
    }

    return (
        <div className="grid grid-cols-6 justify-center flex-row">
            {filterData.map((eachSelector: any) => {
                return <div className="grid col-span-6 xl:col-span-3 grid-cols-3" key={`div-${eachSelector.title}`} >
                    <label className='grid ml-2 items-center justify-center text-base' htmlFor={`${eachSelector.title}`} key={`label-${eachSelector.title}`} >{eachSelector.title}:</label>
                    <select className='grid justify-center ml-1 mr-5 my-1 col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        onChange={handleFilter} id={`${eachSelector.title}`} key={`${eachSelector.title}`}>
                        {eachSelector.options.map((option: string) => {
                            if (eachSelector.title != 'Genre') { return <option key={`type-${option}`} value={`${option}`} >{capitalise(option)}</option> }
                            else { return <option key={`type-${option}`} value={`${option}`} >{capitaliseGenre(option)}</option> }
                        })}
                    </select>
                </div>
            }
            )}
            <div className="grid col-span-6 grid-cols-6 m-1">
                <div className="grid col-span-6 grid-cols-6">
                    <div className="grid col-span-1 self-center justify-self-center invisible lg:visible">Score</div>
                    <input type="range" className="grid col-span-4" min="0" max="9" defaultValue='0' onClick={handleClick} />
                    <div className=" justify-self-center">{scoreRange}</div>
                </div>
                <button type='button' className='grid justify-center justify-self-center bg-red-500 w-[100px] mx-2 my-2 rounded-[20px] py-2 text-l col-span-6' id="Reset" value="Reset"
                    onClick={
                        (event) => { setFilteredOption(filteredOptionStart), handleFilter(event) }}>Reset</button>

            </div>
        </div>)
}


export default FilterOption

