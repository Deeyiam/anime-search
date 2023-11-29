import SortOption from './Filter/SortArea/SortOption'
import GetDataFromFilter from './FetchAPI/GetDataFromFilter'
import { useState } from 'react'
import FilterOption from './Filter/FilterArea/filterOption'

const overallScreen = () => {
    const [currentUrl, setCurrentUrl] = useState<string>("https://api.jikan.moe/v4/anime?page=1&limit=9")

    return (
        <div>
            <div className='grid'>
                <div className='grid h-24 justify-center items-center text-[32px]'>Search Your Favorite Anime</div>
                <div className='grid grid-cols-4'>
                    <div className='grid bg-blue-200 self-start rounded-3xl mx-4 ml-8'>
                        <div className='grid justify-center items-center rounded-3xl grid-cols-[20fr_1fr_20fr] h-12'>
                            <div className='grid justify-center items-center hover:bg-green-200 hover:cursor-pointer h-full rounded-tl-3xl '>Anime</div>
                            <div className='grid h-full justify-center items-center'>|</div>
                            <div className='grid justify-center items-center hover:bg-green-200 hover:cursor-pointer h-full rounded-tr-3xl '>Character</div>
                        </div>
                        <div className='grid justify-center items-center m-4'>Search </div>
                        <input className='grid justify-center m-4 text-center' type="text" id='searchName' placeholder='Type here' />
                        <div className='grid justify-center items-center m-4'>Filter by</div>
                        <div className='grid'>
                            <FilterOption setCurrentUrl={setCurrentUrl} />
                        </div>
                        <div className='grid justify-center items-center m-4 '>Sort by</div>
                        <SortOption setCurrentUrl={setCurrentUrl} />
                    </div>


                    <div className='grid col-span-3 rounded-3xl mx-4 mr-6 self-start justify-center grid-cols-6 grid-rows-[3fr_3fr_3fr_1fr] h-[calc(100vh-128px)]'>
                        <GetDataFromFilter UrlSent={currentUrl} />
                        <div className='grid rounded-2xl m-4 col-span-6 h-8 grid-cols-[10fr_1fr_1fr_1fr_10fr]'>
                            <div></div>
                            <button className='grid  bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-xl'>Prev</button>
                            <button className='grid bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4'>1</button>
                            <button className='grid bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r-xl'>Next</button>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default overallScreen