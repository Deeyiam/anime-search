import React from 'react'
import { extractData } from '../Interface/interfaceData'

type dataPlusCont = {
    fullData: extractData
    setShowBigContent: React.Dispatch<React.SetStateAction<boolean>>
}

const BigContent = (props: dataPlusCont) => {

    const { fullData, setShowBigContent } = props

    return (
        <div className='grid bg-gray-800/80 fixed top-0 left-0 h-full w-full justify-items-center items-center' key={fullData.mal_id}>
            <div className='grid grid-cols-2 bg-black h-1/2 w-1/2 rounded-3xl'>
                <img className='grid aspect-[2/1] h-[459px]  rounded-tl-3xl rounded-bl-3xl hover:cursor-zoom-out' src={fullData.images.jpg.large_image_url} alt="No Pic" onClick={() => setShowBigContent(false)} />
                <div className='grid grid-rows-[1.5fr_1.5fr_10fr_1fr_1fr] text-white text-sm h-[459px] w-11/12 justify-self-center'>
                    <div className='grid grid-cols-[3fr_1fr] items-center max-h-11' >
                        <div className='inline-block text-lg truncate'> {fullData.title} </div>
                        <div className='grid justify-self-end'> Rating: {fullData.score}</div>
                    </div>
                    <div className='inline-block text-right text-ellipsis overflow-hidden text-sm max-h-11'>{fullData.title_japanese}</div>
                    <div className='grid max-h-[260px] overflow-y-auto self-start'>{fullData.synopsis}</div>
                    <div className='grid grid-cols-[2fr_1fr]'>
                        <div className='grid'>Genre: {fullData.genres.map((genre) => { return genre.name }).join(', ') || "Null"}</div>
                        <div className='grid justify-self-end'>Status: {fullData.status}</div>
                    </div>
                    <a href={fullData.url} className='inline-block text-right truncate'>{fullData.url}</a>
                </div>
            </div>
        </div>)

}

export default BigContent