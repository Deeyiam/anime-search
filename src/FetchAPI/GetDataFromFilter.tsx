import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { startingData } from '../Interface/statingData';
import { extractData } from '../Interface/interfaceData';
import DataShow from '../DefaultLayout/DataShowForOne';

interface urlAndNo {
    urlUse: string
    listNo: number
}

const GetDataFromFilter = (urlAndNo: urlAndNo) => {
    const [myData, setMyData] = useState<extractData[]>([startingData])

    useEffect(() => {


        const ResponseCall = async () => {
            try {
                const response = await (await axios.get(urlAndNo.urlUse)).data.data
                setMyData(response)
            }

            catch (error) {
                console.error(error);
            }

            // const ratingSho = await shortRating(responseOne.rating)

            // setMyData({...responseOne, rating: ratingShort })


        }

        function shortRating(rating: string) {

            for (let index = 0; index < rating.length; index++) {
                if (rating[index] != '-' && rating[index] != '(') { return rating[index] }
                else break

            }
        }
        ResponseCall()


    }, [])

    return (
        myData.map((eachData: extractData) =>

            <DataShow {...eachData} />)
    )
}


export default GetDataFromFilter