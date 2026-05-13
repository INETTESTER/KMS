import http from 'k6/http';
import { token } from './env.js';

export function courses_uuid_survey() {
    const url = 'https://loadtest-lms.one.th/api/v1/login/courses/a3b2d7d8-ee61-4382-b223-7ad2b9ac85d0/survey';

    const payload = JSON.stringify([
        {
            surveyId: 1,
            surveyHeaderId: 1,
            answers: [
                {
                    surveyQuestionId: 100,
                    score: 0,
                    comment: 'ตอบคำถามแล้วนะ virty',
                },
            ],
        },
        {
            surveyId: 1,
            surveyHeaderId: 2,
            answers: [
                {
                    surveyQuestionId: 102,
                    score: 4,
                    comment: '',
                },
            ],
        },
    ]);

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    };

    const response = http.post(url, payload, params);

    console.log('Response body:', response.body);

    return response;
}