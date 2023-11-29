import { extractData } from '../Interface/interfaceData'



const DataShowForOne = (props: extractData) => {


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

    return (
        <div className='grid bg-red-200 grid-cols-[7fr_13fr] rounded-2xl m-2 text-sm h-60'>
            <img className="bg-purple-200 rounded-l-2xl w-full h-60" src={props.images.jpg.large_image_url} alt="Failed" />
            <div className='grid m-2'>
                <div className='grid font-semibold text-lg'>{props.title}</div>
                <div>Type: {props.type}</div>
                <div>Episodes: {props.episodes}</div>
                <div>Rating: {shortRating(props.rating)}</div>
                <div>Status: {props.status}</div>
                <div>Genre: {props.genres.map((genre) => { return genre.name }).join(', ') || "Null"}</div>
                <div>Rank: {props.rank}</div>
                <div className='grid grid-cols-2 '>
                    <div>Start: {props.aired.prop.from.day}-{props.aired.prop.from.month}-{props.aired.prop.from.year}</div>
                    <div className='grid justify-end'>{checkScore(props.score)}⭐</div>
                </div>
            </div>
        </div>
    )
}



export default DataShowForOne