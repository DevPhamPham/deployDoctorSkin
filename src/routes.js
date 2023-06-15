const uploadImage = require("./api/uploadImage");
const multiparty = require("multiparty");
const connect = require("./config/db/index");
const login = require("./api/login");

const routes = (app) => {

  // Set home.hbs
  // app.get("/home",(req,res)=>{res.redirect("/")})

  //connect table
  // connect.connect();

  //sign up - login
  login(app)

  // xử lí upload file
  uploadImage(app, multiparty);

  //redirect
  app.get('/redirect/:ab', (req, res) => {
    const ab = req.params.ab;
    if(ab == "home")
    req.session.message = {
      msg: "Đã gửi ảnh lên thành công. Vui lòng chờ xử lí.",
    }
    res.redirect(`/${ab}`);
  });
};


module.exports = routes;
