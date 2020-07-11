import axiosClient from "./axiosClient";

class UserEventApi {
  private url = "/events";
  getAll() {
    return axiosClient.get(this.url);
  }

  post(data: any) {
    return axiosClient.post(this.url, JSON.stringify(data));
  }

  put(id: number, data: any) {
    return axiosClient.put(`${this.url}/${id}`, JSON.stringify(data));
  }

  delete(id: number) {
    return axiosClient.delete(`${this.url}/${id}`);
  }
}

const userEventApi = new UserEventApi();
export default userEventApi;
