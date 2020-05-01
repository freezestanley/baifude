const path = require("path");
const portfinder = require('portfinder');
const DEV_SERVER = {
  host: "0.0.0.0",
  before: app => {
    app.post("*", (req, res, next) => {
      try {
        const __filename = `${path.join(
          __dirname,
          "../mock",
          req.originalUrl.split("?")[0]
        )}.json`;
        delete require.cache[__filename];
        const data = require(__filename);
        if (data) {
          if (data.switchData) {
            return res.json(data.switchData(req));
          }
          return res.json(data);
        }
      } catch (err) {}
      next();
    });
  }
};

module.exports = {
  DEV_SERVER
};
