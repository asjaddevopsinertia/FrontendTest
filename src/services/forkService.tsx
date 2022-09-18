import requests from './httpServices';

const ForkService = {
  getForks(id:any) {
    return requests.get(`/gists/${id}`);
  },
};

export default ForkService;
