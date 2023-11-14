import { extractData } from '../Interface/interfaceData'



const DataShow = (props: extractData) => {

    function shortRating(rating: string) {

        for (let index = 0; index < rating.length; index++) {
            if (rating[index] != '-' && rating[index] != '(') { return rating[index] }
            else break

        }
    }

    return (
        <div className='grid bg-red-200 grid-cols-[7fr_13fr] rounded-2xl m-2 text-sm'>
            <img className="bg-purple-200 rounded-l-2xl w-full h-full" src={props.images.jpg.large_image_url} alt="Failed" />
            <div className='grid m-2'>
                <div className='grid font-semibold text-lg'>{props.title}</div>
                <div>Type: {props.type}</div>
                <div>Episodes: {props.episodes}</div>
                <div>Rating: {shortRating(props.rating)}</div>
                <div>Status: {props.status}</div>
                <div>Genre: {props.genres.map((genre) => { return genre.name }).join(', ')}</div>
                <div>Popularity: {props.popularity}</div>
                <div className='grid grid-cols-2 '>
                    <div>Start: {props.aired.prop.from.day}-{props.aired.prop.from.month}-{props.aired.prop.from.year}</div>
                    <div className='grid justify-end'>{props.score.toFixed(2)}⭐</div>
                </div>
            </div>
        </div>
    )
}



export default DataShow