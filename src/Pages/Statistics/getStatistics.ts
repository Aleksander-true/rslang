import api from "../../API";
import { Statistic } from "../../types/api-tipes";

const getStatistics = async (userID: string) => {
    const token = localStorage.getItem('token')!;
    let response: { isSuccess: boolean; data: any[]; };

    response = (await api.getStatistics(userID, token))!;

    if (response.isSuccess) {
        return response.data as unknown as Statistic;
    } else {
        return;
    }
}

export default getStatistics;