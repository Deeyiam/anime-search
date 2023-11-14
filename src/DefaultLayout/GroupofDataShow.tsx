import GetDataFromFilter from "../FetchAPI/GetDataFromFilter"



const GroupofDataShow = () => {
    return (
        <div className="grid col-span-6 grid-cols-3">
            <GetDataFromFilter urlUse={'https://api.jikan.moe/v4/anime?page=1&limit=9'} listNo={1}></GetDataFromFilter>

        </div>)
}

export default GroupofDataShow

