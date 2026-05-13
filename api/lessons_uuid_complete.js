import http from 'k6/http';
import { token } from './env.js';

export function lessons_uuid_complete() {
    const url = 'https://loadtest-lms.one.th/api/v1/login/lessons/e52fb523-388f-4357-86b4-0fa895c16658/complete';

    const params = {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    };

    const response = http.post(url, null, params);

    console.log('Response body:', response.body);

    return response;
}