// const localhost = "http://localhost:5000";
const ngrock = "https://native-piglet-typically.ngrok-free.app";
export const getWords = async () => {
    try {
        const response = await fetch(ngrock + "/words", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'ngrok-skip-browser-warning': 'skip-browser-warning',
            },
        });
        if (!response.ok) {
console.log(ngrock + "/words");

			throw new Error(response.statusText);
		}

        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const login = async (email, password) => {
    try {
        const response = await fetch( ngrock + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const registration = async (email, password) => {
    try {
        const response = await fetch(ngrock + "/auth/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        return response;
    } catch (error) {
        alert('Такой пользователь уже существует');
        throw new Error(error);
    }
};

export const getLastTenResults = async () => {
    try {
        const response = await fetch(ngrock + "/results/LastTen", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Authorization': `Bearer ${localStorage.getItem("token").replace(/['"]+/g, "")}`,
            },
        });
        // console.log(response.json());
        return response;
    } catch (error) {
        throw new Error(error);
    }
}