import { favList } from "../overallScreen";

interface favListplussetFav {
    favList: favList
    setFavList: React.Dispatch<React.SetStateAction<favList>>
}

const Favorite = (favoriteArray: favListplussetFav) => {

    const { favList, setFavList } = favoriteArray

    function quickDel(event: any) {
        const index = favList.favArray.findIndex(x => x == event.target.value)
        setFavList({ favArray: [...favList.favArray.slice(0, index), ...favList.favArray.slice(index + 1)] })

    }

    return <div className="grid text-sm m-1 px-2 pb-2">{favList.favArray.map(title => {
        return <div className="grid grid-cols-[20fr_1fr]" key={`overall-${title}`} ><div key={title}>{title}</div>
            <button className="grid hover:bg-red-200 rounded-xl" key={`cancel-${title}`} value={title} onClick={quickDel}>x</button></div>
    })}<button className="grid justify-center justify-self-center bg-red-500 w-[100px] mx-2 my-4 rounded-[20px] py-2 text-l hover:bg-red-300" onClick={() => { setFavList({ favArray: [] }) }}>Clear All</button></div>

}


export default Favorite

