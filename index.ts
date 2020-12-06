import express = require("express");
import session = require("express-session");
import bodyParser = require("body-parser");
import redis = require("redis");
import _redisStore = require("connect-redis");
const redisStore = _redisStore(session);
const client = redis.createClient();
const router = express.Router();
const app = express();
import userController from "./controller/user";
import subjectController from "./controller/subject";
import config = require("./config");
const _redis = config.redis;

app.use(
  session({
    secret: "ssshhhhh",
    store: new redisStore({
      host: _redis.host,
      port: _redis.port,
      client: client,
      ttl: 15 * 24 * 3600
    }),
    saveUninitialized: false,
    resave: false
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  let sess = req.session;
  if (req.path == "/user/login" || req.path == "/user/signup") next();
  else if (sess.key && sess.key.email) next();
  else next("Unauthorized");
});

router.post("/user/signup", async (req, res) => {
  try {
    let { body } = req;
    let result = await userController.signUp(body);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    let { body } = req;
    let result = await userController.login(body);
    delete result.password;
    req.session.key = result;
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/subject", async (req, res) => {
  try {
    let { body } = req;
    let sess = req.session;
    let { id, type } = sess.key || {};
    if (type == "teacher") {
      let result = await subjectController.create(body, id);
      res.status(200).json(result);
    } else throw new Error(`Studen can't create subject`);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/subject", async (req, res) => {
  try {
    let sess = req.session;
    let { id, type } = sess.key || {};
    if (type == "teacher") {
      let result = await subjectController.getSubjects({ taughtBy: id });
      res.status(200).json(result);
    } else {
      let result = await subjectController.getAllSubjects();
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/subject/:sid", async (req, res) => {
  try {
    let { body } = req;
    let { sid } = req.params;
    let sess = req.session;
    let { id, type } = sess.key || {};
    if (type == "teacher") {
      let result = await subjectController.update(body, sid, id);
      res.status(200).json(result);
    } else throw new Error(`Studen can't edit subject`);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/subject/:sid", async (req, res) => {
  try {
    let { body } = req;
    let { sid } = req.params;
    let sess = req.session;
    let { id, type } = sess.key || {};
    if (type == "teacher") {
      let result = await subjectController._delete(sid, id);
      res.status(200).json(result);
    } else throw new Error(`Studen can't delete subject`);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/subject/:sid/enroll", async (req, res) => {
  try {
    let { sid } = req.params;
    let sess = req.session;
    let { id, type } = sess.key || {};
    if (type == "student") {
      let result = await subjectController.enroll(sid, id);
      res.status(200).json(result);
    } else throw new Error(`Teacher can't enroll`);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/subject/:sid/attendence", async (req, res) => {
  try {
    let { sid } = req.params;
    let sess = req.session;
    let { id, type } = sess.key || {};
    if (type == "student") {
      let result = await subjectController.getAttendence(sid, id);
      res.status(200).json(result);
    } else {
      let result = await subjectController.getAttendenceByTeacher(sid, id);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/student/:stid/subject/:sid/attendence", async (req, res) => {
  try {
    let { body } = req;
    let { stid, sid } = req.params;
    let sess = req.session;
    let { id, type } = sess.key || {};
    if (type == "teacher") {
      let result = await subjectController.updateAttendence(
        body,
        stid,
        sid,
        id
      );
      res.status(200).json(result);
    } else throw new Error(`Studen can't edit attendence`);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ message: err.message });
    }
  });
  res.status(200).json({ success: true });
});

app.use("/", router);

app.listen(3000, async () => {
  console.log(`App Started on PORT 3000`);
});
