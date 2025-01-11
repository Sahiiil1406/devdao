import axios from 'axios';
const URL='http://localhost:3000/api';


export const getAllQuestions = async () => {
    try {
        const response = await axios.get(`${URL}/allquestions`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getAllQuestions API ', error);
    }
};

export const getQuestion = async (id) => {
    try {
        const response = await axios.get(`${URL}/question/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getQuestion API ', error);
    }
};

export const submitCode = async (id, code,user) => {
    try {
        const response = await axios.post(`${URL}/submit/${id}`, { code,user });
        return response.data;
    } catch (error) {
        console.log('Error while calling submitCode API ', error);
    }
}

export const checkDockerFile = async (id, code,user) => {
    try {
        const response = await axios.post(`${URL}/docker/${id}`, { code,user });
        return response.data;
    } catch (error) {
        console.log('Error while calling checkDockerFile API ', error);
    }
}

export const createQuestion = async (title,description,rating,gitUrl,category) => {
    try {
        const response = await axios.post(`${URL}/questions`, {
            title,
            description,
            rating,
            gitUrl,
            category
        });
        return response.data;
    } catch (error) {
        console.log('Error while calling createQuestion API ', error);
    }
}
