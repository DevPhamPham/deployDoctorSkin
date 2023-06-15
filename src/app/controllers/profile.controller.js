const User = require('../models/User')
class ProfileController{
    getUserProfile(req,res,next){
        if(req.isAuthenticated()){
            User.findById(req.user.id,(err,user)=>{
                if (err) return res.status(400).json({err: err});
                const result = {
                    name: user.name,
                    birthday: user.birthday,
                    gender: user.gender,
                    sdt: user.SDT,
                }
                return res.json(result)  // trả về json thông tin người dùng cho app
                // res.render("profile",{name: result.name,birthday: result.birthday,gender: result.gender,sdt: result.sdt})
            })
        }
        // next()
    }
}

module.exports = new ProfileController();