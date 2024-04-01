import React, { useEffect, useState } from "react";
import TypingTest from "../../components/TypingTest/TypingTest";
import ResultPage from "./ResultPage";
import Service from "../../API/Service";
import { useFetching } from "../../components/hooks/useFetching";


const TestPage = () => {  
  const [wordsArr, setWordsArr] = useState(null)
  
  const [fetchPosts, isWordsLoading, postError] = useFetching(
		async () => {
			const response = await Service.getAll();
      console.log(response.data)  
      if (postError) console.log(postError)
      const arr = []
      for (let i = 0; i < response.data.length; i++) {
        arr.push(response.data[i].words);
      }
      console.log(arr)

    

      setWordsArr(arr)
		}
	);
  
  useEffect(() => {
    fetchPosts()
  }, [])
  

  return (
    <div className="TestPage">
      {/* <button onClick={() => navigate(`/results`)}></button> */}
      <TypingTest wordsProp={wordsArr} isWordsLoading = {isWordsLoading}/>
    </div>
  );
};

export default TestPage;