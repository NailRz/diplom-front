/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux'
import { selectTime, selectWpm } from '../../features/testData/testDataSlice';


const ResultPage = ({wpm, time}) => {
    console.log(wpm, time)
    
    const getWpm = useSelector(selectWpm)
    const getTime = useSelector(selectTime)
    return (
        <div>
            <h1>Your results: </h1>
            <h2> Time: {getTime}</h2>
            <h2> Words per Minute: {getWpm}</h2>
        </div>
    );
};



export default ResultPage;