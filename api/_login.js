import http from 'k6/http';

export function _login() {
    const url = 'https://loadtest-lms.one.th/api/v1/login/login';

    const payload = JSON.stringify({
        encrypted: 'UgtcWkxbR0hETAsTC1tAR1tAR11MWl0YCwULWUhaWl5GW00LEwtLSEVFU0hTSBgYHBALVA=='
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    console.log('Response body:', response.body);

    return response;
}