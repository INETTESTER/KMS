import http from 'k6/http';

export function courses() {
    const url = 'https://loadtest-lms.one.th/api/v1/login/courses?page=1&limit=20';

    const params = {
        headers: {},
    };

    const response = http.get(url, params);

    console.log('Response body:', response.body);

    return response;
}