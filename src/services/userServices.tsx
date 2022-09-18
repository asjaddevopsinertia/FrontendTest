import requests from './httpServices';

const UserServices = {
  getDataByUsername(username:string) {
    return requests.get(`/users/${username}/gists`);
  },
};

export default UserServices;
