import requests

# 设置要发送的POST请求的URL
url = 'http://localhost:11434/v1/chat/completions'

# 设置请求的头部信息，例如Content-Type
headers = {
    'Content-Type': 'application/json',
}

# 设置请求的JSON数据
data = {
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
}

# 发送POST请求
response = requests.post(url, json=data, headers=headers)

# 打印响应的文本内容
print(response.text)


