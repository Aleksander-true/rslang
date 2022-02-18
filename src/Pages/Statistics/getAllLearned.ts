import api from "../../API";

const getAllLearned = async (userID: string) => {
    const token = localStorage.getItem('token')!;
    let response: { isSuccess: boolean; data: any[]; } = { isSuccess: false, data: [] };
    let wordsQuantity = 0;


    response = (await api.getAllUserAggregatedWords(userID, token, "", "", '3600', JSON.stringify({ "userWord.optional.isLearned": "true" })))!
    if (response.isSuccess) {
        wordsQuantity = response.data.length
        return wordsQuantity;
    }
    else {
        return;
    }
}

export default getAllLearned;