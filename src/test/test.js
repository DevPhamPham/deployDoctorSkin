const fs = require('fs').promises;
const tf = require('@tensorflow/tfjs-node');
const path = require('path');

const modelPath = path.resolve(__dirname, '../../public/DataModel/saved_model.pb');
const weightPath = path.resolve(__dirname, '../../public/DataModel/weights.bin');

async function predict(imagePath) {
  const imageBuffer = await fs.readFile(imagePath);
  const image = tf.node.decodeImage(imageBuffer);
  const model = await tf.loadGraphModel(`file://${modelPath}`);
  const predictions = model.predict(image);
  return predictions.arraySync();
}

class PredictController {
  async predict(req, res,next) {
    try {
      const imagePath = path.resolve(__dirname, '../../public/images/anhgui/images.jpg');
      const predictions = await predict(imagePath);
      // res.json({ predictions });
      console.log(predictions)
      // next();
    } catch (err) {
      console.error(err);
      // res.status(500).json({ message: 'Error predicting image' });
    }
  }
}

test = new PredictController();
test.predict(1,2,3)