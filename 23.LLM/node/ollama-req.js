import axios from 'axios';

// 启动 ollama 即可开启11434端口
axios.post('http://localhost:11434/v1/chat/completions', {
  "model": "llama3",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "2023年山东省省控线是多少分？"
    }
  ]
})
  .then(function (response) {
    console.log(response.data);
    console.log(response.data.choices[0].message);
  })
  .catch(function (error) {
    console.log(error);
  });