import axios from 'axios';

const verifyWord = async (word: string):Promise<boolean> => {
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    try{
        if(res.data.title === "No Definitions Found"){
            return false;
        }
        else{
            return true;
        }
    }
    catch(err){
        return false;
    }
};

export default verifyWord;