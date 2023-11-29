import { useEffect, useState } from 'react'
import { filteredOption } from '../Filter/FilterArea/filterOption'

type Props = {
    setCurrentUrl: React.Dispatch<React.SetStateAction<string>>
}

interface sortOption {
    sortOption: string
}

interface filterOption {
    filterOption: filteredOption
}

const CombineUrlProvider = (props: Props, sortOptions?: sortOption, filterOptions?: filterOption) => {
    const [urlBase, setUrlBase] = useState<string>(`https://api.jikan.moe/v4/anime?page=1&limit=9`)
    const { setCurrentUrl } = props;

    if (sortOptions) {
        const { sortOption } = sortOptions

        const lowerSelectedSort = sortOption!.toLowerCase()

        function setUrlBasefx(clickValue: string) {
            if (clickValue == 'Reset') {
                setUrlBase(`https://api.jikan.moe/v4/anime?page=1&limit=9`)

            }
            else { setUrlBase(`https://api.jikan.moe/v4/anime?page=1&limit=9&order_by=${lowerSelectedSort}`) }

        }
        useEffect(() => {
            setUrlBasefx(sortOption)
                , [sortOption]
        })
    }

    if (filterOptions) {
        const { filterOption } = filterOptions
        const [filterSelect, setFilterSelect] = useState<string>('')

        function setUrlBasefx2(clickValue: filteredOption) {
            const filterMap = Object.entries!(clickValue);
            const tempFilterMap = [];
            for (let index = 0; index < filterMap.length; index++) {
                if (filterMap[index][1] != "" && filterMap[index][1] != "all") {
                    tempFilterMap.push(`${filterMap[index][0]}=${filterMap[index][1]}`)
                }

            }
            setFilterSelect(tempFilterMap.join('&'));

        }

        useEffect(() => {
            setUrlBasefx2(filterOption)
            console.log(filterSelect);

            [filterOption]
        })

    }

    useEffect(() => {

        setCurrentUrl(urlBase)

    }, [urlBase])

}

export default CombineUrlProvider

