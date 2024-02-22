import React, { useEffect, useState } from "react";
import TypingTest from "../components/TypingTest/TypingTest";
import ResultPage from "./ResultPage";
import Service from "../API/Service";
import { useFetching } from "../components/hooks/useFetching";

const TestPage = () => {  
  const [name, setName] = useState(null)

  const [fetchPosts, isPostsLoading, postError] = useFetching(
		async () => {
			const response = await Service.getAll();
      console.log(response.data)
      const arr = response.data

      setName(arr.map(item => item.email))
		}
	);
  
  useEffect(() => {
    fetchPosts()
  }, [])
  

  return (
    <div className="TestPage">
      {/* <h1>{name}</h1> */}
      <TypingTest />
    </div>
  );
};

export default TestPage;