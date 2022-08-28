import axios from 'axios';

const instance = axios.create({
    baseURL: '',
});

instance.interceptors.request.use(
    async (request) => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hcm9sYWFtYW45ODdAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL2FtYW5uYXJvbGEvQ2FzZVN0dWR5IiwiaWF0IjoxNjYxNTc0MTgyLCJleHAiOjE2NjIwMDYxODJ9.4cKCcUmMG2AWbhrckNSCunbjCjqT6n1Rq2URx9Q1fkU';

        request.headers.Authorization = `Bearer ${token}`;
        request.headers['Content-Type'] = 'application/json';
        request.headers['Access-Control-Allow-Methods'] =
            'GET, PUT, POST, DELETE, OPTIONS';
        return request;
    },
    (error) => {
        console.log("apiinstance", error)
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        return Promise.reject(error.response.data);
    },
);

export default instance;
