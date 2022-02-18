import api from "../../API";

const getAllLearned = async (userID: string) => {
  console.log("getAllLearned");

  const token = localStorage.getItem("token")!;
  //   let response: { isSuccess: boolean; data: any[] } = {
  //     isSuccess: true,
  //     data: [],
  //   };
  let wordsQuantity = 0;

  const response = (await api.getAllUserAggregatedWords(
    userID,
    token,
    undefined,
    undefined,
    "3600",
    JSON.stringify({ "userWord.optional.isLearned": true })
  ))!;

  console.log(response);
  console.log(response.data);

  if (response.isSuccess) {
    console.log(response.data);
    wordsQuantity = response.data.length;
    return wordsQuantity + 1;
  } else {
    return;
  }
};

export default getAllLearned;
