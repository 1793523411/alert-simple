/* eslint-disable no-unused-vars */
'use strict';
const Subscription = require('egg').Subscription;

const sendMessage = require('../utils/message');
const sendEmail = require('../utils/email');
const sendWorkWx = require('../utils/workWx');

class Task extends Subscription {
  /*
    https://eggjs.org/zh-cn/basics/schedule.html
    注意：cron-parser 支持可选的秒（linux crontab 不支持）。
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun) 其中 0、7 指周日，1 指周二，依次类推，6 指周六
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, optional)

    */
  static get schedule() {
    return {
      interval: '5s',
      // cron: '*/5 * * * * ?',
      type: 'worker',
    };
  }

  subscribe() {
    const { ctx } = this;
    ctx.app.config.dingMessage && sendMessage(ctx);
    ctx.app.config.qEmail && sendEmail(ctx);
    ctx.app.config.workWx && sendWorkWx(ctx);
  }
}

module.exports = Task;
