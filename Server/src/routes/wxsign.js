const express = require("express");
const router = express.Router();
const sha1 = require("sha1");
const https = require("https");
const { wechatConfig ,testWechatConfig} = require("../config/tencent-sms.js");

router.get("/", (req, response) => {
  https.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${testWechatConfig.appid}&secret=${req.query.appsecret}`,
    (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        let result = JSON.parse(data);
        console.log("result:" + result); //调试打印信息 输出的信息： result:{result:-11,data:'',msg:'没有登录'}
        response.send({
          code: 0,
          des: "sucdess",
          result,
        });
      });
      res.on("error", (e) => {
        console.log(`错误:${e.message}`);
      });
    }
  );
});

module.exports = router;
