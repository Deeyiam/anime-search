import SortOption from './Filter/SortArea/SortOption'
import GetDataFromFilter from './FetchAPI/GetDataFromFilter'
import { useState } from 'react'
import FilterOption from './Filter/FilterArea/filterOption'
import PageChoose from './Filter/PageChoose/PageChoose'
import SearchOption from './Filter/SearchArea/SearchOption'
import Favorite from './Additional/Favorite'
import { extractData } from './Interface/interfaceData'
import DataShowForOne from './DefaultLayout/DataShowForOne'


export interface currentUrl {
    baseUrl: string
    pageUrl: number
    sortUrl: string
    filterUrl: string
    searchUrl: string
}

export type favList = {
    favArray: extractData[]
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
    const [favPage, setFavPage] = useState<boolean>(false)

    const finalUrl = Object.values(currentUrl).join('')

    if (!favPage) {
        return (
            <div className='grid lg:bg-[#fac7a55b]'>
                <div >
                    <div className='grid h-24 justify-center items-center text-[32px]'>Get Your Own Animelist from Jikan API!</div>
                    <div className='grid grid-cols-4'>
                        <div className='grid bg-blue-200 self-start rounded-3xl md:mx-4 ml-8'>
                            <div className='grid justify-center items-center m-4'>Search </div>
                            <SearchOption currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} setCurrentPage={setCurrentPage} />
                            <div className='grid justify-center items-center m-4'>Filter by</div>
                            <div className='grid'>
                                <FilterOption currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} setCurrentPage={setCurrentPage} />
                            </div>
                            <div className='grid justify-center items-center m-4 '>Sort by</div>
                            <SortOption currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} setCurrentPage={setCurrentPage} />
                            <div className='grid justify-center m-2 text-center text-sm md:text-base'>Favorite (Up to 7)</div>
                            <Favorite favList={favList} setFavList={setFavList} favPage={favPage} setFavPage={setFavPage} />
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

    else return (
        <div className='grid lg:bg-[#fac7a55b] '>
            <div >
                <div className='grid h-24 justify-center items-center text-[32px]'>Favorite page</div>
                <div className='grid grid-cols-4'>
                    <div className='grid bg-blue-200 self-start rounded-3xl mx-4 ml-8'>
                        <div className='grid justify-center m-2 text-center'>Favorite (Up to 7)</div>
                        <Favorite favList={favList} setFavList={setFavList} favPage={favPage} setFavPage={setFavPage} />
                    </div>

                    <div className='grid col-span-3 rounded-3xl mx-4 mr-6 self-start justify-center grid-cols-6 grid-rows-[3fr_3fr_3fr_1fr] h-[calc(100vh-96px)]'>
                        <div className="grid col-span-6 grid-cols-3" >
                            {favList.favArray.map((eachData: extractData) =>
                                <DataShowForOne key={eachData.title} props={eachData} favList={favList} setFavList={setFavList} />)}
                        </div>
                        <button className='grid rounded-2xl m-4 col-span-6 h-8 bg-red-300 items-center' onClick={() => setFavPage(false)}>Back</button>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default overallScreen