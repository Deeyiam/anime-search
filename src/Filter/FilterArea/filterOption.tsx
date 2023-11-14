import React from 'react'

type FilterArea = {
    title: string
    options: string[]
}

const FilterArea = ({ title, options }: FilterArea) => {

    function capitalise(option: string) {
        return option.charAt(0).toUpperCase() + option.slice(1);
    }

    return (
        <div className="grid justify-center grid-cols-3 my-2 ml-1.5">
            <label className='grid justify-center' htmlFor={`type-${title}`}>{title}:</label>
            <select className='grid justify-center col-span-2 mx-2' id={`type-${title}`}>
                {options.map((option: string) => { return <option key={`type-${title}-${option}`} value={`${option}`}>{capitalise(option)}</option> })}
            </select>
        </div>
    )
}

export default FilterArea