import axios from "axios";

const request = axios.create({
  baseURL: "localhost:8080",
});

export const boardApi = {
  async getAllBoard() {
    //const response= await request.get(`/board/`);
    //console.log(response);
    console.log("boardApi");
  },
};
