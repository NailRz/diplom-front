import axios from "axios";

export default class Service {
	static async getAll() {
		const response = await axios.get(
            "http://localhost:5000/words",
        );

        // const response = await axios.head(
		// 	"http://127.0.0.1:5173/users",
		// );
        console.log(response)
		return response;
	}

}