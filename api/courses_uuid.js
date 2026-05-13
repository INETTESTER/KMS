import http from 'k6/http';

export function courses_uuid() {
    const url = 'https://loadtest-lms.one.th/api/v1/login/courses/a3b2d7d8-ee61-4382-b223-7ad2b9ac85d0';

    const params = {
        headers: {},
    };

    const response = http.get(url, params);

    console.log('Response body:', response.body);

    return response;
}