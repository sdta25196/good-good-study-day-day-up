import * as tf from '@tensorflow/tfjs'

const modelUrl = 'https://example.com/model.json';
const input = tf.tensor([1, 2, 3]);

async function predict() {
  const model = await tf.loadLayersModel(modelUrl);
  const output = model.predict(input);
  output.print();
}

predict();