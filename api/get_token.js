const fs = require('fs');
const axios = require('axios');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../file/users-login-ok.json');
const OUTPUT_FILE = path.join(__dirname, '../file/tokens.json');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    // อ่านไฟล์ user
    const users = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));

    const results = [];

    for (const user of users) {
        try {
            const response = await axios.post(
                'https://loadtest-lms.one.th/api/v1/login',
                {
                    encryted: user.encryted,
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json',
                        'origin': 'https://lms-dev.alldemics.com',
                        'referer': 'https://lms-dev.alldemics.com/login',
                        'Cookie': 'i18n_redirected=th',
                    },
                }
            );

            const access_token = response.data.access_token;

            console.log(`✅ ${user.username} login success`);

            results.push({
                username: user.username,
                access_token: access_token,
            });

        } catch (err) {
            console.log(`❌ ${user.username} login failed`);

            results.push({
                username: user.username,
                error: err.response ? err.response.data : err.message,
            });
        }

        // 🔥 หน่วงทุก request (สำคัญ)
        //await sleep(Math.random() * 1000 + 500); // 500–1500 ms
    }

    // เขียนไฟล์ token
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

    console.log(`\n🎯 Save tokens to ${OUTPUT_FILE}`);
}

main();