/* eslint-disable no-unused-vars */
/* eslint valid-jsdoc: "off" */

'use strict';
const feedCard = require('../app/model/sendMessage/feedCard.json');
const text = require('../app/model/sendMessage/text.json');
const link = require('../app/model/sendMessage/link.json');
const markdown = require('../app/model/sendMessage/markdown.json');
const actionCard = require('../app/model/sendMessage/actionCard.json');
const actionCards = require('../app/model/sendMessage/actionCards.json');

const wxtext = require('../app/model/sendWorkWx/text.json');
const wxmarkdown = require('../app/model/sendWorkWx/markdown.json');
const wximgtext = require('../app/model/sendWorkWx/imgtext.json');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611828682437_668';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {

    dingMessage: true,
    dingdingUrl: 'https://oapi.dingtalk.com/robot/send?access_token=cad179777fbad79b27a59eda2529657b4080098685a7e5f4e356f7840448d6ca',
    msgType: actionCards, // 可选值：feedCard, text ,link, markdown, actionCard, actionCards

    workWx: false,
    workWxUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=b2a85a02-ccbb-471a-9e39-69fecfb6565f',
    wxMegType: wximgtext, // 可选值： wxtext, wxmarkdown, wximgtext

    qEmail: false,
    form: '杨国杰',
    user: '1793523411@qq.com',
    pass: 'tkbifcthlaeabhhf',
    mails: [ '2293832948@qq.com', '1096767199@qq.com' ],
    subject: '阿里练习生头条',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  return {
    ...config,
    ...userConfig,
  };
};
