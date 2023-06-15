const User = require('../models/User')

class HomeController {
  renderHome(req, res) {
    // Kiểm tra trạng thái đăng nhập
    const loggedIn = req.isAuthenticated();
    if (loggedIn) {
      User.findById(req.user.id,(err,user)=>{
        if (err) return res.status(400).json({err: err});
        const name = user.name
        // console.log(user)
        return res.render("home",{loggedIn:loggedIn, username: name})
    })
    } else
    return res.render("home",{loggedIn:loggedIn});
  }
}

module.exports = new HomeController();
