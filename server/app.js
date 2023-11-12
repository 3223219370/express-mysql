var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("./utils/jwt");
var loginRouter = require("./routes/login");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// 路由拦截，校验token
app.use((req, res, next) => {
  // 过滤登录接口
  if (req.url === "/login") {
    next();
    return;
  }
  const token = req.headers["authorization"];
  const paload =  jwt.verify(token || '');
  // 重新生成token
  if (token && paload) {
    const {username, password} = paload
    const newToken = jwt.creat({username, password})
    // 重新设置token
    res.header('Authorization',newToken );
    next();
  }else{
    // 返回错误
    res.status(401);
    res.send({
      success:false,
      message:'token失效'
    });
  }
});
app.use("/users", usersRouter);
app.use("/login", loginRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
