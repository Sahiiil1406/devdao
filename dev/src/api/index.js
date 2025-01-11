import axios from 'axios';
const URL='http://localhost:3000/api';


const getAllQuestions = async () => {
    try {
        const response = await axios.get(`${URL}/allquestions`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getAllQuestions API ', error);
    }
};

const getQuestion = async (id) => {
    try {
        const response = await axios.get(`${URL}/question/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getQuestion API ', error);
    }
};

const submitCode = async (id, code,user) => {
    try {
        const response = await axios.post(`${URL}/submit/${id}`, { code,user });
        return response.data;
    } catch (error) {
        console.log('Error while calling submitCode API ', error);
    }
}

const checkDockerFile = async (id, code,user) => {
    try {
        const response = await axios.post(`${URL}/docker/${id}`, { code,user });
        return response.data;
    } catch (error) {
        console.log('Error while calling checkDockerFile API ', error);
    }
}

const createQuestion = async (title,description,rating,gitUrl,category) => {
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

module.exports = {
    getAllQuestions,
    getQuestion,
    submitCode,
    checkDjsonFile,
    createQuestion
}