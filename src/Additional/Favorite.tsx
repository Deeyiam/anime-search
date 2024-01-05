import { favList } from "../overallScreen";

interface favListplussetFav {
    favList: favList
    setFavList: React.Dispatch<React.SetStateAction<favList>>
    favPage: boolean
    setFavPage: React.Dispatch<React.SetStateAction<boolean>>
}

const Favorite = (favoriteArray: favListplussetFav) => {

    const { favList, setFavList, favPage, setFavPage } = favoriteArray

    function quickDel(event: any) {
        const index = favList.favArray.findIndex(x => x.title == event.target.value)
        setFavList({ favArray: [...favList.favArray.slice(0, index), ...favList.favArray.slice(index + 1)] })
    }

    return <div className="grid text-sm m-1 px-2 pb-2">{favList.favArray.map(title => {
        return <div className="grid grid-cols-[20fr_1fr]" key={`overall-${title.title}`} ><div key={title.title}>{title.title}</div>
            <button className="grid hover:bg-red-200 rounded-xl" key={`cancel-${title.title}`} value={title.title} onClick={quickDel}>x</button></div>
    })}
        <div className="grid lg:grid-cols-2 xl:mx-6 2xl:mx-12">
            <button className="grid justify-center justify-self-center bg-green-500 w-[90px] xl:w-[100px] my-2 mx-2 lg:my-4 rounded-[20px] py-2 text-l hover:bg-green-300" onClick={() => { if (!favPage) { setFavPage(true) } else { alert("Already viewing favList") } }}>View List</button>
            <button className="grid justify-center justify-self-center bg-red-500 w-[90px] xl:w-[100px] l:mx-2 lg:my-4 rounded-[20px] py-2 text-l hover:bg-red-300" onClick={() => { setFavList({ favArray: [] }) }}>Clear All</button>
        </div>
    </div>
}


export default Favorite

