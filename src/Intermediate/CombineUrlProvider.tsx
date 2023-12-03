import { useEffect, useState } from 'react'
import { filteredOption } from '../Filter/FilterArea/filterOption'

type Props = {
    setCurrentUrl: React.Dispatch<React.SetStateAction<string>>
}

type sortOption = {
    sortOption: string
}

type filterOption = {
    filterOption: filteredOption
}


const CombineUrlProvider = (props: Props, sortOptions: sortOption, filterOptions: filterOption) => {
    const [sortOptionFinal, setSortOptionFinal] = useState<string>('')
    const [filterOptionFinal, setFilterOptionFinal] = useState<string>('')
    const { setCurrentUrl } = props;

    const { sortOption } = sortOptions
    const { filterOption } = filterOptions
    const lowerSelectedSort = sortOption?.toLowerCase()

    function setUrlBasefx(clickValue: string) {
        if (clickValue == 'Reset') { setSortOptionFinal(`https://api.jikan.moe/v4/anime?page=1&limit=9`) }
        else setSortOptionFinal(`https://api.jikan.moe/v4/anime?page=1&limit=9&order_by=${lowerSelectedSort}`)

    }
    useEffect(() => {

        setUrlBasefx(sortOptions.sortOption)


    }, [sortOptions.sortOption])


    function setUrlBasefx2(clickValue: filteredOption) {
        const filterMap = Object.entries!(clickValue);
        const tempFilterMap = [];
        for (let index = 0; index < filterMap.length; index++) {
            if (filterMap[index][1] != "" && filterMap[index][1] != "all") {
                tempFilterMap.push(`${filterMap[index][0]}=${filterMap[index][1]}`)
            }

        }
        setFilterOptionFinal(tempFilterMap.join('&'));
    }

    useEffect(() => {

        setUrlBasefx2(filterOption)

    }, [filterOption])


}



export default CombineUrlProvider

