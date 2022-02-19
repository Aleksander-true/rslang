import api from "../../API";

const getAllLearned = async (userID: string) => {
  const token = localStorage.getItem("token")!;
  let wordsQuantity = 0;

  const response = (await api.getAllUserAggregatedWords(
    userID,
    token,
    undefined,
    undefined,
    "3600",
    JSON.stringify({ "userWord.optional.isLearned": true })
  ))!;

  if (response.isSuccess) {
    wordsQuantity = response.data[0].paginatedResults.length;
    return wordsQuantity + 1;
  } else {
    return;
  }
};

export default getAllLearned;
