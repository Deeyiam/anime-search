import SortOption from './Filter/SortArea/SortOption'
import GetDataFromFilter from './FetchAPI/GetDataFromFilter'
import { useState } from 'react'
import FilterOption from './Filter/FilterArea/filterOption'
import PageChoose from './Filter/PageChoose/PageChoose'
import SearchOption from './Filter/SearchArea/SearchOption'
import Favorite from './Additional/Favorite'


export interface currentUrl {
    baseUrl: string
    pageUrl: number
    sortUrl: string
    filterUrl: string
    searchUrl: string
}

export type favList = {
    favArray: string[]
}

const defaultUrl = {
    baseUrl: `https://api.jikan.moe/v4/anime?limit=9&page=`,
    pageUrl: 1,
    sortUrl: '',
    filterUrl: ``,
    searchUrl: ``
}

const overallScreen = () => {
    const [currentUrl, setCurrentUrl] = useState<currentUrl>(defaultUrl)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [favList, setFavList] = useState<favList>({ favArray: [] })

    const finalUrl = Object.values(currentUrl).join('')

    return (
        <div>
            <div className='grid bg-[#fac7a55b]'>
                <div className='grid h-24 justify-center items-center text-[32px]'>Search Your Favorite Anime</div>
                <div className='grid grid-cols-4'>
                    <div className='grid bg-blue-200 self-start rounded-3xl mx-4 ml-8'>
                        <div className='grid justify-center items-center m-4'>Search </div>
                        <SearchOption currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} setCurrentPage={setCurrentPage} />
                        <div className='grid justify-center items-center m-4'>Filter by</div>
                        <div className='grid'>
                            <FilterOption currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} setCurrentPage={setCurrentPage} />
                        </div>
                        <div className='grid justify-center items-center m-4 '>Sort by</div>
                        <SortOption currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} setCurrentPage={setCurrentPage} />
                        <div className='grid justify-center m-2 text-center'>Favorite (Up to 7)</div>
                        <Favorite favList={favList} setFavList={setFavList} />
                    </div>


                    <div className='grid col-span-3 rounded-3xl mx-4 mr-6 self-start justify-center grid-cols-6 grid-rows-[3fr_3fr_3fr_1fr] h-[calc(100vh-96px)]'>
                        <GetDataFromFilter UrlSent={finalUrl} favList={favList} setFavList={setFavList} />
                        <PageChoose currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div >
        </div>
    )
}

export default overallScreen