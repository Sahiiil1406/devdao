const axios = require('axios');
const cloneRepo = async (id) => {
    try {
        const res= await axios.get(`http://localhost:3000/api/question/${id}`);
        const {gitUrl} = res.data;
        console.log('Cloning repo...');
        await execShellCommand(`git clone ${gitUrl}`);
        console.log('Repo cloned successfully!');
    } catch (error) {
        console.log(error);
    }
}

const execShellCommand = async (cmd) => {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout? stdout : stderr);
        });
    });
}

const submitProblem=async(id)=>{
    try {
        console.log('Submitting problem...');
        console.log("Running tests...");
        await execShellCommand(`npm test`);
        console.log('Tests passed!');
        console.log('Submitting problem...');
        const res= await axios.post(`http://localhost:5000/api/submit/${id}`);
        console.log(res.data);
        console.log('Problem submitted successfully!');
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    cloneRepo,
    submitProblem
}