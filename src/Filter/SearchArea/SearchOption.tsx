import React from 'react'
import { currentUrl } from '../../overallScreen'

type Props = {
    currentUrl: currentUrl
    setCurrentUrl: React.Dispatch<React.SetStateAction<currentUrl>>
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}


const SearchOption = (props: Props) => {
    const { currentUrl, setCurrentUrl, setCurrentPage } = props

    function handleSearch(event: any) {
        setCurrentPage(1)
        if (event.target.value) { setCurrentUrl({ ...currentUrl, searchUrl: `&q=${event.target.value}` }) }
        else { setCurrentUrl({ ...currentUrl, searchUrl: `` }) }
    }

    return (
        <input className='grid justify-center m-4 text-center' type="text" id='searchName' placeholder='Type here' onChange={handleSearch} />
    )
}

export default SearchOption