import axios from 'axios';
import { useEffect, useState } from 'react'
import { startingData } from '../Interface/statingData';
import { extractData } from '../Interface/interfaceData';
import DataShowForOne from '../DefaultLayout/DataShowForOne';
import ReactLoading from 'react-loading';


interface Props {
    UrlSent: string
}

const GetDataFromFilter = (props: Props) => {

    const [myData, setMyData] = useState<extractData[]>([startingData])
    const [isLoading, setIsLoading] = useState(false)

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
        return (
            <div className="grid col-span-6 grid-cols-3">
                {myData.map((eachData: extractData) =>
                    <DataShowForOne key={eachData.title} {...eachData} />)}
            </div>)
    }
    else return (<div className="grid col-span-6 justify-center items-center h-full row-span-3">< ReactLoading type='spokes' color='#FF85FB' height={300} width={300} /></div>)
}


export default GetDataFromFilter