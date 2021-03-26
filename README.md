# 消息订阅

## 简单介绍

通过这个模板你可以实现，仅通过简单的设置(**其实只需要三步**)数据实现定期发送消息到 qq 邮箱，钉钉群，企业微信群，这意味着你不必需要掌握 nodejs 以及 eggjs 也可以实现一个消息推送功能，当然你也可以在此基础上拓展，开发出更丰富的应用

## 配置文件

在`config/config.default.js`,中你可以分别配置，下面来详细介绍他们

如果你只是仅仅想要实现一个消息推送功能，配置文件只需要对下面这些进行操作做即可

```js
const userConfig = {
  dingMessage: true, //是否开启钉钉机器人消息推送
  dingdingUrl: "钉钉机器人的webhook‘",
  msgType: actionCards, // 可选值：feedCard, text ,link, markdown, actionCard, actionCards

  workWx: false, //是否开启企业微信机器人消息推送
  workWxUrl: "企业微信机器人的webhook",
  wxMegType: wximgtext, // 可选值： wxtext, wxmarkdown, wximgtext

  qEmail: false, //是否开启邮件消息推送
  form: "发送人的姓名",
  user: "发送人的邮箱",
  pass: "发送者邮箱的授权码",
  mails: ["xxx@qq.com", "xxx@qq.com"], //要发送的邮箱，可以是多个
  subject: "发送邮件的主题",
};
```

## 设置发送时间

在`app/schedule/task.js`文件中：

```js {3,4}
  static get schedule() {
    return {
      interval: '5s',
      // cron: '*/5 * * * * ?',
      type: 'worker',
    };
  }
```

上面高亮处有两行，意味着这里有两种设置时间的方式：

第一种是直接通过 每隔多长时间发送一次，可以是秒，分钟，小时等等，这种方式比较固定，灵活性不是很大

第二种方式是通过 `cron-parser`来设置时间，下面是大致的规则：

```
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun) 其中 0、7 指周日，1 指周二，依次类推，6 指周六
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, optional)
    注意：cron-parser 支持可选的秒（linux crontab 不支持）。
```


>企业微信中：每个机器人发送的消息不能超过 20 条/分钟。


## 填入数据

数据在以下三个目录中,分别对应钉钉机器人，企业微信机器人，qq 邮箱的消息数据，根据自己需要填入即可(替换掉默认的数据)

```
app/model/sendMessage
app/model/sendWorkWx
app/model/email
```

### 钉钉机器人

**text 类型**

|   参数    | 是否必填 |  类型   |              说明              |
| :-------: | :------: | :-----: | :----------------------------: |
|  msgtype  |    是    | String  |             text。             |
|  content  |    是    | String  |           消息文本。           |
| atMobiles |    否    |  Array  |        被@人的手机号。         |
|  isAtAll  |    否    | Boolean | @所有人是 true，否则为 false。 |

**markdown 类型**

|   参数    | 是否必填 |  类型   |              说明              |
| :-------: | :------: | :-----: | :----------------------------: |
|  msgtype  |    是    | String  |           markdown。           |
|   title   |    是    | String  |    首屏会话透出的展示内容。    |
|   text    |    是    | String  |   markdown 格式的消息内容。    |
| atMobiles |    否    |  Array  |        被@人的手机号。         |
|  isAtAll  |    否    | Boolean | @所有人是 true，否则为 false。 |

**整体跳转 actionCard 类型**

|    参数     | 是否必填 |  类型  |           说明            |
| :---------: | :------: | :----: | :-----------------------: |
|   msgtype   |    是    | String |       actionCard。        |
|    title    |    是    | String | 首屏会话透出的展示内容。  |
|    text     |    是    | String | markdown 格式的消息内容。 |
| singleTitle |    是    | String |     单个按钮的标题。      |
|  singleURL  |    是    | String |   单个按钮的跳转链接。    |

**独立跳转 actionCard 类型**

|      参数      | 是否必填 |  类型  |              说明               |
| :------------: | :------: | :----: | :-----------------------------: |
|    msgtype     |    是    | String |          actionCard。           |
|     title      |    是    | String |    首屏会话透出的展示内容。     |
|      text      |    是    | String |    markdown 格式的消息内容。    |
|      btns      |    是    | Array  |             按钮。              |
|     title      |    是    | String |           按钮标题。            |
|   singleURL    |    是    | String |      点击按钮触发的 URL。       |
| btnOrientation |    否    | String | 0：按钮竖直排列 1：按钮横向排列 |

**feedCard 类型**

|    参数    | 是否必填 |  类型  |           说明           |
| :--------: | :------: | :----: | :----------------------: |
|  msgtype   |    是    | String |        feedCard。        |
|   title    |    是    | String |      单条信息文本。      |
| messageURL |    是    | String |    单条信息跳转链接。    |
|   picURL   |    是    | String | 单条信息后面图片的 URL。 |

**[更多资料请查看钉钉开放平台（比如如何获取webhook）](https://ding-doc.dingtalk.com/document/app/develop-enterprise-internal-robots/title-mno-3qd-5f9)**


>使用钉钉机器人是一定要注意，填入的数必须**包含**设置机器人的定义的关键词，加签和ip地址段可以不勾选


### 企业微信机器人

**文本类型**

|         参数          | 是否必填 |                                                             说明                                                             |
| :-------------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------: |
|        msgtype        |    是    |                                                  消息类型，此时固定为 text                                                   |
|        content        |    是    |                                      文本内容，最长不超过 2048 个字节，必须是 utf8 编码                                      |
|    mentioned_list     |    否    | userid 的列表，提醒群中的指定成员(@某个成员)，@all 表示提醒所有人，如果开发者获取不到 userid，可以使用 mentioned_mobile_list |
| mentioned_mobile_list |    否    |                              手机号列表，提醒手机号对应的群成员(@某个成员)，@all 表示提醒所有人                              |

**markdown 类型**
| 参数 | 是否必填 | 说明 |
| :-------------------: | :------: | :-----------: |
|msgtype |是| 消息类型，此时固定为 markdown|
|content| 是| markdown 内容，最长不超过 4096 个字节，必须是 utf8 编码|

**图文类型**

|    参数     | 是否必填 |                                         说明                                         |
| :---------: | :------: | :----------------------------------------------------------------------------------: |
|   msgtype   |    是    |                              消息类型，此时固定为 news                               |
|  articles   |    是    |                       图文消息，一个图文消息支持 1 到 8 条图文                       |
|    title    |    是    |                       标题，不超过 128 个字节，超过会自动截断                        |
| description |    否    |                       描述，不超过 512 个字节，超过会自动截断                        |
|     url     |    是    |                                  点击后跳转的链接。                                  |
|   picurl    |    否    | 图文消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 `1068*455`，小图`150*150`。 |

**[更多资料请查看企业微信开放平台（比如如何获取webhook）](https://work.weixin.qq.com/api/doc/90000/90136/91770)**

### qq 邮箱

这里发送的消息模板是可以自定义的，不过默认有一个很好看的模板

| 参数  |  类型  |   说明   |
| :---: | :----: | :------: |
|  img  | String | 一张图片 |
| title | String |   标题   |
| date  | String |   日期   |
| text  | String |   正文   |


