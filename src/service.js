const { net } = require('electron');

exports.getQuestionService = () => {
    const result = new Promise((resolve, reject) => {
        const request = net.request({
            hostname: 'localhost',
            port: "9000",
            path: "/question",
            method: 'get'
        });
    
        request.on('response', (response) => {
            if (response.statusCode >= 300) {
                throw new Error(`${response.statusCode}:${response.statusMessage}`);
            } 

            const chunks = [];
            response.on('data', (chunk) => {
              chunks.push(chunk);
            })

            response.on('end', () => {
                const data = Buffer.concat(chunks).toString();
                
                resolve(JSON.parse(data));
            });

            response.on('error' , reject);
          });

          request.on('error', reject);
          request.end()
    });

    return result;
}

exports.getAnswerByQuestionIdService = (questionId) => {
    const result = new Promise((resolve, reject) => {
        const request = net.request({
            hostname: 'localhost',
            port: "9000",
            path: `/question/${questionId}/answer`,
            method: 'get'
        });
    
        request.on('response', (response) => {
            if (response.statusCode >= 300) {
                throw new Error(`${response.statusCode}:${response.statusMessage}`);
            } 

            const chunks = [];
            response.on('data', (chunk) => {
              chunks.push(chunk);
            })

            response.on('end', () => {
                const data = Buffer.concat(chunks).toString();
                
                resolve(JSON.parse(data));
            });

            response.on('error' , reject);
          });

          request.on('error', reject);
          request.end()
    });

    return result;
}