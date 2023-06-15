const multiparty = require("multiparty");
const path = require("path");
const mv = require("mv");
const fs = require("fs").promises;

class UploadController {
  async uploadImage(req, res) {
    if(!req.session.passport.user){
      res.redirect("/");
    }
    let userId = req.user.id.toString();
    const imageDir = path.join(__dirname, `../../../public/images/ImageFromUser/${userId}`);
    try {
      await fs.access(imageDir);
      const files = await fs.readdir(imageDir);
      for (const file of files) {
        await fs.unlink(path.join(imageDir, file));
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.mkdir(imageDir, { recursive: true });
      } else {
        console.log(err);
      }
    }

    const form = new multiparty.Form();
    // console.log(form)
    let oldPath, newPath;
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).send(err.message);
      // console.log(files)
      oldPath = files.myImage[0].path;
      newPath = path.join(
        __dirname,
        "../../../public/images",
        "ImageFromUser",
        userId,
        Date.now() + "_" + files.myImage[0].originalFilename
      );

      mv(oldPath, newPath,async (err) => {
        if (err) {
          console.log(err);
          res.json({ success: false, msg: "Gửi ảnh không thành công." });
        } else {
          console.log("Gui anh thanh cong")
          const predictController = require("../../app/controllers/predict.controller");
          let results = await predictController.predict(req,res) || "Loi"
          res.json({results});
          return;
        }
      });
    });

  }
}

module.exports = new UploadController();
