import { useEffect, useState } from 'react'
import { extractData } from '../Interface/interfaceData'
import { favList } from '../overallScreen'
import BigContent from '../Additional/BigContent'
import { startFavList } from './StartFavList'

interface dataPlusFav {
    props: extractData,
    favList: favList
    setFavList: React.Dispatch<React.SetStateAction<favList>>
}

const DataShowForOne = (dataPlusFav: dataPlusFav) => {
    const [loveSymbol, setLoveSymbol] = useState<string>('🤍')
    const [favorite, setFavorite] = useState<extractData>(startFavList)
    const { props, favList, setFavList } = dataPlusFav
    const [showBigContent, setShowBigContent] = useState<boolean>(false)

    function shortRating(rating: string) {
        const ratingShort = []

        if (rating?.includes('13')) { ratingShort.push('PG-13') }
        else if (rating?.includes('17')) { ratingShort.push('R-17+') }
        else {
            if (rating != null) {
                for (let index = 0; index < rating.length; index++) {
                    if ((rating[index] != '-') && (rating[index] != '(')) { ratingShort.push(rating[index]) }
                    else break
                }
            }
        }

        return ratingShort
    }

    function checkScore(score: number | null) {
        if (score) { return score.toFixed(2) }
        else return 'N/A'
    }

    function favoriteSymbol(props: extractData) {
        if (loveSymbol === '🤍') {
            if (favList.favArray.length < 7) {
                setLoveSymbol('💗')
                setFavorite(props)
            }
            else { alert('Favorite list is full. Please remove some first.') }
        }
        if (loveSymbol === '💗') {
            setLoveSymbol('🤍')
            setFavorite(props)
        }

    }

    function deleteSymbol(favList: favList) {
        if (!favList.favArray.includes(props)) {
            setLoveSymbol('🤍')
            setFavorite(startFavList)
        }
        if (favList.favArray.includes(props)) {
            setLoveSymbol('💗')
        }

    }

    function deleteFavorite(whatToDel: extractData) {
        const index = favList.favArray.findIndex(x => x == whatToDel)
        if (index != -1)
            setFavList({ favArray: [...favList.favArray.slice(0, index), ...favList.favArray.slice(index + 1)] })

    }


    useEffect(() => {

        if (favorite.title != "string" && !favList.favArray.includes(favorite) && favList.favArray.length < 7) { setFavList({ favArray: [...favList.favArray, favorite] }) }
        else if (favorite.title != "string" && favList.favArray.length < 8) { deleteFavorite(favorite) }

    }, [favorite, loveSymbol])


    useEffect(() => {
        deleteSymbol(favList)
    }, [favList])


    if (showBigContent) {
        return (
            [<div className='grid bg-red-200 grid-cols-[7fr_13fr] rounded-2xl m-1 h-60' >
                <img className="bg-purple-200 rounded-l-2xl w-full h-60 hover:cursor-zoom-in" src={props.images.jpg.large_image_url} onClick={() => setShowBigContent(true)} alt="No Pic" />
                <div className='grid m-2 text-sm 2xl:text-base overflow-y-auto'>
                    <div className='grid grid-cols-[8fr_1fr]'>
                        <div className='grid font-semibold '>{props.title}</div>
                        <button className='grid text-lg justify-end' onClick={() => favoriteSymbol(props)} >{loveSymbol}</button >
                    </div>
                    <div>Type: {props.type}</div>
                    <div>Episodes: {props.episodes}</div>
                    <div>Rating: {shortRating(props.rating)}</div>
                    <div>Status: {props.status}</div>
                    <div>Genre: {props.genres.map((genre) => { return genre.name }).join(', ') || "Null"}</div>
                    <div>Rank: {props.rank}</div>
                    <div className='grid grid-cols-[3fr_1fr] '>
                        <div>Start: {props.aired.prop.from.day}-{props.aired.prop.from.month}-{props.aired.prop.from.year}</div>
                        <div className='grid justify-end'>{checkScore(props.score)}⭐</div>
                    </div>
                </div>

            </div>, <BigContent fullData={props} setShowBigContent={setShowBigContent} key='big' />])
    }

    else return (<div className='grid bg-red-200 grid-cols-[7fr_13fr] rounded-2xl m-1 h-60' >
        <img className="bg-purple-200 rounded-l-2xl w-full h-60 hover:cursor-zoom-in" src={props.images.jpg.large_image_url} onClick={() => setShowBigContent(true)} alt="No Pic" />
        <div className='grid m-2 text-sm 2xl:text-base overflow-y-auto'>
            <div className='grid grid-cols-[8fr_1fr]'>
                <div className='grid font-semibold '>{props.title}</div>
                <button className='grid text-lg justify-end' onClick={() => favoriteSymbol(props)} >{loveSymbol}</button >
            </div>
            <div>Type: {props.type}</div>
            <div>Episodes: {props.episodes}</div>
            <div>Rating: {shortRating(props.rating)}</div>
            <div>Status: {props.status}</div>
            <div>Genre: {props.genres.map((genre) => { return genre.name }).join(', ') || "Null"}</div>
            <div>Rank: {props.rank}</div>
            <div className='grid grid-cols-[3fr_1fr] '>
                <div>Start: {props.aired.prop.from.day}-{props.aired.prop.from.month}-{props.aired.prop.from.year}</div>
                <div className='grid justify-end'>{checkScore(props.score)}⭐</div>
            </div>
        </div>

    </div>)
}

export default DataShowForOne