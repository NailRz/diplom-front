

export const getWords = async () => {
    try {
        const response = await fetch("http://localhost:5000/words", {
            method: "GET",
            // headers: {
            //     "Content-Type": "application/json",
            // },
        });
        if (!response.ok) {
			throw new Error(response.statusText);
		}
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const login = async (email, password) => {
    try {
        const response = await fetch("http://localhost:5000/auth/login", {
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
        const response = await fetch("http://localhost:5000/auth/registration", {
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

