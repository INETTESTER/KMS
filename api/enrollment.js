import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('tokens', function () {
  return JSON.parse(open('../file/tokens.json'));
});

export function enrollment(scenario) {
  const token = data[scenario.iterationInTest % data.length];
  //console.log(token.access_token);
  const url = 'https://loadtest-lms.one.th/api/v1/users/courses/957dd68c-db92-4395-9dfb-1aef2ee6db09/enrollment';

  const payload = null; // ไม่มี body

  const params = {
    headers: {
      'Authorization': 'Bearer ' + token.access_token,
    },
  };

  const response = http.post(url, payload, params);

  //console.log('Response body:', response.body);

  return response;
}