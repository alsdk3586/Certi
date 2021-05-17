import axios, { AxiosInstance } from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/",
});
export const favoriteApi = {
  async getFavoritelist() {
    const response = await request.get('favorite/', {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      }
    });
    return response.data;
  },
  async addFavorite(certificateCode) {
    // preventDefault();
    if (certificateCode !== null) {
      const response = await request.post(`favorite/create/${certificateCode}`, certificateCode, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("token"),
         }
        });
        return response.data;
    } else {
      return 'ERROR: the code is null'
    }
  }
};

export const commentApi = {
  async addComment(data) {
    const response = await request.post(`comment/create`,data, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    });
   // console.log(response);
    return response.data;
  },
  async getComment(boardId) {
    const response = await request.get(`comment/${boardId}`);
    return response.data;
  }
}

export const boardApi = {
  async getAllBoard() {
    const response = await request.get(`board/`);
    //console.log(response);
    return response.data;
  },
  async getDetailBoard(boardId) {
    const response = await request.get(`board/detail/${boardId}`);
    console.log(response);
    return response.data;
  },

  async getCategoryBoard(category) {
    const response = await request.get(`board/category/${category}`);
    return response.data;
  },

  async getSearchBoard(search) {
    const response = await request.get(`board/search/${search}`);
    return response.data;
  },

  async addBoard(data) {
    //console.log(data);
    const response = await request.post(`board/create`, data, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    });
    //console.log(response);
    return response.data;
  },
  async updateBoard(data) {
    
  }
};
