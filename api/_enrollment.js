import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('tokens', function () {
  return JSON.parse(open('../file/tokens.json'));
});

export function _enrollment(scenario) {
    const token = data[scenario.iterationInTest % data.length];
    //console.log(token.access_token);
    const url = 'https://loadtest-lms.one.th/api/v1/login/users/courses/a3b2d7d8-ee61-4382-b223-7ad2b9ac85d0/enrollment';

    const params = {
        headers: {
            'Authorization': 'Bearer ' + token.access_token,
        },
    };

    const response = http.post(url, null, params);

    console.log('Response body:', response.body);

    return response;
}