//! 志愿填报模拟

import OpenAI from 'openai';
const model = 'doubao-1-5-pro-32k-250115'

this.doubao = new OpenAI({
  apiKey: "",
  baseURL: "https://ark.cn-beijing.volces.com/api/v3"
});
