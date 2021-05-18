import axios, { AxiosInstance } from "axios";

const request = axios.create({
  baseURL: "http://k4a407.p.ssafy.io:8080/",
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
    console.log("----");
    if (certificateCode !== null) {
      let data=new Object();
      data.certificateCode=certificateCode;
      const response = await request.post(`favorite/create`, data, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("token"),
         }
        });
        console.log("00000");
        return response.data;
    } else {
      return 'ERROR: the code is null'
    }
  }
};
export const certiApi = {
  async getCertiList() {
    const response = await request.get(`certificate/list`, {
    });
    // const returnData = response.data.then((res) => {
    // })
    return response.data;
  }
}
export const commentApi = {
  async addComment(data) {
    const response = await request.post(`comment/create`,data, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    });
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
    const response = await request.post(`board/create`, data, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  async motifyBoard(data) {
    const response = await request.put(`board/motify/${data.boardId}`, data);
    return response.status;
  },

  async deleteBoard(boardId) {
    const response = await request.delete(`board/delete/${boardId}`, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    });
    console.log(response);
  }
};
