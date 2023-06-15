const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      // res.status(401).json({UnLogin: 1})
      res.status(401).json({login: 0})
      return;
    }
    return next();
  };

module.exports = isAuthenticated;