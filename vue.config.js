const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/PD_AjudeSteve/" : "/",
  transpileDependencies: true,
});
