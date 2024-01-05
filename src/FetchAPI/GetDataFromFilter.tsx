import axios from 'axios';
import { useEffect, useState } from 'react'
import { startingData } from '../Interface/statingData';
import { extractData } from '../Interface/interfaceData';
import DataShowForOne from '../DefaultLayout/DataShowForOne';
import ReactLoading from 'react-loading';
import { favList } from '../overallScreen';

interface Props {
    UrlSent: string
    favList: favList
    setFavList: React.Dispatch<React.SetStateAction<favList>>
}

const GetDataFromFilter = (props: Props) => {
    const { favList, setFavList } = props
    const [myData, setMyData] = useState<extractData[]>([startingData])
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const ResponseCall = async () => {
        try {
            const response = await (await axios.get(props.UrlSent)).data.data
            setMyData(response)
            setIsLoading(false)
        }

        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        ResponseCall()
        setIsLoading(true)
    }, [props.UrlSent])

    if (!isLoading) {
        if (myData.length > 0) {
            return (
                <div className="grid col-span-6 lg:grid-cols-3" >
                    {myData.map((eachData: extractData) =>
                        <DataShowForOne key={eachData.title} props={eachData} favList={favList} setFavList={setFavList} />)}
                </div>)
        }
        else return (
            <div className='grid col-span-6 justify-center items-center text-red-700 text-8xl h-[calc(100vh-160px)]'>[Data not found.]</div>
        )
    }
    else return (<div className="grid col-span-6 justify-center items-center h-full row-span-3">< ReactLoading type='spokes' color='#FF85FB' height={300} width={300} /></div>)
}


export default GetDataFromFilter