/* eslint-disable react/prop-types */



const ResultPage = ({wpm, time}) => {
    console.log(wpm, time)
    return (
        <div>
            <h1>Your results: </h1>
            <h2> Time: {time}</h2>
            <h2> Words per Minute: {wpm}</h2>
        </div>
    );
};



export default ResultPage;