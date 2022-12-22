const homeRouter = require("./home");
const userRouter = require("./user");
const adminRouter = require("./Admin/admin");
const emailRouter = require("./Mail/mail");
const apiRouter = require("./api/index")
//Auth login - register
const AuthRouter = require("./Auth/index");

function route(app) {

  app.use("*", (req, res, next) => {
    if(!req.session.token)
    {
      userGlobal = null;
    }
    next();
  });
  
  app.use("/", homeRouter);

  // auth routes
  app.use("/auth", AuthRouter);


  //client routes
  app.use("/user", userRouter);


  //email routes
  app.use("/email", emailRouter);


  // admin routes
  app.use('/admin', adminRouter);

  
  //api routes
  app.use('/api', apiRouter);
}

module.exports = route;
