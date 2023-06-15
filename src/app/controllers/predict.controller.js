const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const Submission = require("../models/Submission");

class PredictController {
  

  async predict(req, res) {
    // performance.mark('start'); 
    let userId = req.user.id.toString();
    const imagePath = path.resolve(__dirname, `../../../public/images/ImageFromUser/${userId}`);
    let imageFiles;
  
    try {
      imageFiles = await fs.readdir(imagePath);
    } catch (err) {
      console.log(err);
      return "Error to read from server!";
    }
  
    imageFiles = imageFiles.filter((file) => {
      const extension = path.extname(file);
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension.toLowerCase());
    });
  
    if (imageFiles.length != 1) {
      console.log('No image file found in directory');
      return "File Not Found";
    }

    var sourcePath = path.resolve(path.join(imagePath, imageFiles[0]));
    var targetPath = path.resolve(__dirname, '../../../public/images/SaveImageFromUser/', imageFiles[0]);
    const isTarget = path.join(__dirname, '../../../public/images/SaveImageFromUser');
    try {
      await fs.access(isTarget);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.mkdir(isTarget, { recursive: true });
      } else {
        console.log(err);
      }
    }

    const imageData = await fs.readFile(path.join(imagePath, imageFiles[0]));

    const config = {
      headers: { "Content-Type": "image/jpeg" },
    };
  
    const layersPath = path.resolve(__dirname, '../../../data/db/layers.js');
    let dataLayers = require("fs").readFileSync(layersPath).toString();
    dataLayers = JSON.parse(dataLayers)
    // console.log(JSON.parse(dataLayers));
    
    let newSubmission = new Submission({
      userId: req.session.passport.user,
      linkImage: targetPath,
      createAt: Date.now(),
      pending: 1,
    });

    try {
      let response = await axios.post("http://localhost:5000/predict", imageData, config);
      if (response.error) throw new Error("Error from server Flask");
      await fs.rename(sourcePath, targetPath);
      try {
        await newSubmission.save();
      }catch{
        throw new Error("Error saving image to database: " + err.message);
      }
      const Top5Data = response.data.result[0]
        .map((value, index) => [value, index])
        .sort((a, b) => b[0] - a[0])
        .slice(0, 6);
      let top5Layers = Top5Data.map(data => ({name: dataLayers[data[1]].name,desp: dataLayers[data[1]].desp, predict: data[0]}))
      // console.log(top5Layers);
      return top5Layers;
    } catch (err) {
      console.log(err);
      throw new Error("Server Error");
    }
  }

}

module.exports = new PredictController();
