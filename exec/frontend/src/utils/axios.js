import axios, { AxiosInstance } from "axios";

const request = axios.create({
  //baseURL: "http://localhost:8080/",
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
  async addFavorite(code) {
    let params=new Object();
    params.certificateCode=code;
    const response = await request.post(`favorite/create`, params, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
        }
      });
      return response.data;
  },
  async deleteFavorite(code) {
    const response = await request.delete(`favorite/delete/${code}`, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
        }
      });
      return response.data;
  }
};

export const statisticsApi = {
  async getStatsList(code) {
    const response = await request.get(`certificate/statistics/${code}`, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      }
    })
    return response.data[0];
  },
  async getPassRate(code) {
    const response = await request.get(`certificate/acceptancerate/${code}`, {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      }
    })
    return response.data;
  }
}

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
  }
};
