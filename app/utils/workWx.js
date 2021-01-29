/* eslint-disable no-unused-vars */
'use strict';

module.exports = async function(ctx) {
  await ctx.curl(ctx.app.config.workWxUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: ctx.app.config.wxMegType,
  });
};
