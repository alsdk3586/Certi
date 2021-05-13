import axios, { AxiosInstance } from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/",
});

export const boardApi = {
  async getAllBoard() {
    const response = await request.get(`board/`);
    //console.log(response);
    return response.data;
  },
  async getDetailBoard(boardId) {
    const response = await request.get(`board/${boardId}`);
    //console.log(response);
    return response.data;
  },

  async getCategoryBoard(category) {
    const response = await request.get(`board/category/${category}`);
    return response.data;
  },

  async addBoard(data) {
    console.log(data);
  },
};
