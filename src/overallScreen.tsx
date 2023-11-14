import FilterArea from './Filter/FilterArea/filterOption'
import { genre, alphabet } from './Interface/genreList and alphabetList'
import GroupofDataShow from './DefaultLayout/GroupofDataShow'

type Props = {}

const DefaultLayout = (props: Props) => {

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
                        <div className='grid grid-cols-2'>
                            <FilterArea title={'Type'} options={["all", "TV", "movie", "ova", "special", "ona", "music"]} />
                            <FilterArea title={'Score'} options={["all", "9+", "8+", "7+", "6+", "5+"]} />
                            <FilterArea title={'Rating'} options={["all", "g", "pg", "pg13", "r17", "r", "rx"]} />
                            <FilterArea title={'Status'} options={["all", "airing", "complete", "upcoming"]} />
                            <FilterArea title={'Genre'} options={genre} />
                            <FilterArea title={'Letter'} options={alphabet} />
                            <button type='button' className='grid col-span-2 justify-center justify-self-center bg-red-500 w-[100px] mx-2 my-2 rounded-[20px] py-2 text-l'>Reset</button>
                        </div>
                        <div className='grid justify-center items-center m-4 '>Sort by</div>
                        <div className='grid grid-cols-2'>
                            <button className='grid justify-center bg-yellow-200 mx-1 py-1 my-1 rounded-xl'>Title</button>
                            <button className='grid justify-center bg-yellow-200 mx-1 py-1 my-1 rounded-xl'>Start Date</button>
                            <button className='grid justify-center bg-yellow-200 mx-1 py-1 my-1 rounded-xl'>Score</button>
                            <button className='grid justify-center bg-yellow-200 mx-1 py-1 my-1 rounded-xl'>Popularity</button>
                            <button type='button' className='grid col-span-2 justify-center justify-self-center bg-red-500 w-[100px] mx-2 my-4 rounded-[20px] py-2 text-l'>Reset</button>
                        </div>

                    </div>


                    <div className='grid col-span-3 rounded-3xl mx-4 mr-6 self-start justify-center grid-cols-6 grid-rows-[3fr_3fr_3fr_1fr] h-[calc(100vh-96px)]'>
                        <GroupofDataShow />
                        <div className='grid rounded-2xl m-4 col-span-6 h-8 grid-cols-[10fr_1fr_1fr_1fr_10fr]'>
                            <div></div>
                            <button className='grid  justify-center bg-white hover:bg-green-200 w-[48px] p-2 rounded-lg'>Prev</button>
                            <button className='grid justify-center bg-white hover:bg-green-200 w-[48px] p-2 rounded-lg'>1</button>
                            <button className='grid justify-center bg-white hover:bg-green-200 w-[48px] p-2 rounded-lg'>Next</button>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default DefaultLayout