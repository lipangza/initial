// 使用默认组件自动布局
const components = {
    "boxUrls": [
        {
            "name": "推荐",
            "icoUrl": "./img/linkIco/dir.png",
            "url": "javascript:;",
            "x": 80,
            "y": 320,
            "canDel": true,
            "chid": [
                {
                    "name": "阿里云特价",
                    "icoUrl": "./img/linkIco/aliyun.png",
                    "url": "https://www.aliyun.com/activity/daily/bestoffer?userCode=7jvoe5ia",
                    "id": "L-10000"
                }
            ],
            "id": "L-1"
        },
        {
            "name": "知乎",
            "icoUrl": "./img/linkIco/zhihu.png",
            "url": "https://www.zhihu.com/",
            "x": 320,
            "y": 400,
            "id": "L-5"
        },
        {
            "name": "bilibili",
            "icoUrl": "./img/linkIco/bilibili.png",
            "url": "https://www.bilibili.com/",
            "x": 80,
            "y": 400,
            "id": "L-6"
        },
        {
            "name": "西瓜视频",
            "icoUrl": "./img/linkIco/xgsp.png",
            "url": "https://www.ixigua.com/",
            "x": 400,
            "y": 400,
            "id": "L-9"
        },
        {
            "name": "网易云音乐",
            "icoUrl": "./img/linkIco/wyyyy.png",
            "url": "https://music.163.com/",
            "x": 160,
            "y": 480,
            "id": "L-10"
        },
        {
            "name": "虎牙直播",
            "icoUrl": "./img/linkIco/hy.png",
            "url": "https://www.huya.com/",
            "x": 240,
            "y": 400,
            "id": "L-11"
        },
        {
            "name": "微博",
            "icoUrl": "./img/linkIco/weibo.png",
            "url": "https://weibo.com/",
            "x": 160,
            "y": 400,
            "id": "L-15"
        },
        {
            "name": "wallhaven",
            "icoUrl": "./img/linkIco/wallhaven.png",
            "url": "https://wallhaven.cc/",
            "x": 560,
            "y": 400,
            "id": "L-18"
        },
        {
            "name": "抖音",
            "icoUrl": "./img/linkIco/douyin.png",
            "url": "http://douyin.com/",
            "x": 80,
            "y": 480,
            "id": "L-19"
        },
        {
            "name": "豆瓣网",
            "icoUrl": "./img/linkIco/douban.png",
            "url": "http://douban.com/",
            "x": 480,
            "y": 400,
            "id": "L-25"
        },
        {
            "name": "简书",
            "icoUrl": "./img/linkIco/jianshu.png",
            "url": "http://www.jianshu.com/",
            "x": 240,
            "y": 480,
            "id": "L-26"
        },
        {
            "name": "工具",
            "icoUrl": "./img/linkIco/dir.png",
            "url": "javascript:;",
            "x": 160,
            "y": 320,
            "id": "L-41",
            "chid": [
                {
                    "name": "QQ邮箱",
                    "icoUrl": "./img/linkIco/qqyouxiang.png",
                    "url": "https://mail.qq.com/",
                    "id": "L-22"
                },
                {
                    "name": "阿里云盘",
                    "icoUrl": "./img/linkIco/aliyunpan.png",
                    "url": "https://www.aliyundrive.com/",
                    "id": "L-14"
                },
                {
                    "name": "草料二维码",
                    "icoUrl": "./img/linkIco/cailiaoerweima.png",
                    "url": "https://cli.im/",
                    "x": 480,
                    "y": 560,
                    "id": "L-12"
                },
                {
                    "name": "U钙网",
                    "icoUrl": "./img/linkIco/ugai.png",
                    "url": "https://www.uugai.com/",
                    "x": 320,
                    "y": 560,
                    "id": "L-23"
                },
                {
                    "name": "天眼查",
                    "icoUrl": "./img/linkIco/tianyancha.png",
                    "url": "http://tianyancha.com/",
                    "x": 560,
                    "y": 480,
                    "id": "L-27"
                }
            ]
        },
        {
            "name": "财经",
            "icoUrl": "./img/linkIco/dir.png",
            "url": "javascript:;",
            "x": 240,
            "y": 320,
            "id": "L-42",
            "chid": [
                {
                    "name": "雪球",
                    "icoUrl": "./img/linkIco/xueqiu.png",
                    "url": "https://xueqiu.com/",
                    "id": "L-33"
                },
                {
                    "name": "东方财富",
                    "icoUrl": "./img/linkIco/dongfangcaifu.png",
                    "url": "https://www.eastmoney.com/",
                    "id": "L-7"
                },
                {
                    "name": "淘股吧",
                    "icoUrl": "./img/linkIco/taoguba.png",
                    "url": "https://www.taoguba.com.cn/",
                    "x": 480,
                    "y": 720,
                    "id": "L-16"
                },
                {
                    "name": "华尔街见闻",
                    "icoUrl": "./img/linkIco/huaerjie.png",
                    "url": "https://wallstreetcn.com/",
                    "x": 640,
                    "y": 560,
                    "id": "L-32"
                },
                {
                    "name": "财联社",
                    "icoUrl": "./img/linkIco/cailians.png",
                    "url": "https://m.cls.cn/",
                    "x": 640,
                    "y": 480,
                    "id": "L-38"
                }
            ]
        },
        {
            "name": "学习",
            "icoUrl": "./img/linkIco/dir.png",
            "url": "javascript:;",
            "x": 320,
            "y": 320,
            "id": "L-43",
            "chid": [
                {
                    "name": "腾讯课堂",
                    "icoUrl": "./img/linkIco/txkt.png",
                    "url": "https://ke.qq.com/",
                    "id": "L-31"
                },
                {
                    "name": "wikiHow",
                    "icoUrl": "./img/linkIco/wikiHow.png",
                    "url": "https://zh.wikihow.com/",
                    "id": "L-29"
                },
                {
                    "name": "菜鸟教程",
                    "icoUrl": "./img/linkIco/cainiaojiaoc.png",
                    "url": "https://www.runoob.com/",
                    "x": 1040,
                    "y": 480,
                    "id": "L-4"
                },
                {
                    "name": "吾爱破解",
                    "icoUrl": "./img/linkIco/wuaipojie.png",
                    "url": "https://www.52pojie.cn/",
                    "x": 720,
                    "y": 720,
                    "id": "L-13"
                }
            ]
        },
        {
            "name": "游戏",
            "icoUrl": "./img/linkIco/dir.png",
            "url": "javascript:;",
            "x": 400,
            "y": 320,
            "id": "L-44",
            "chid": [
                {
                    "name": "免费游戏",
                    "icoUrl": "./img/linkIco/youxi.png",
                    "url": "https://poki.cn/",
                    "id": "L-30"
                },
                {
                    "name": "网易云游戏",
                    "icoUrl": "./img/linkIco/wangyiyunyouxi.png",
                    "url": "https://cg.163.com/",
                    "id": "L-37"
                },
                {
                    "name": "小霸王",
                    "icoUrl": "./img/linkIco/xiaobawang.png",
                    "url": "https://www.yikm.net/",
                    "x": 400,
                    "y": 480,
                    "id": "L-36"
                },
                {
                    "name": "游侠网",
                    "icoUrl": "./img/linkIco/youxia.png",
                    "url": "http://ali213.net/",
                    "x": 240,
                    "y": 560,
                    "id": "L-28"
                }
            ]
        },
        {
            "name": "科技",
            "icoUrl": "./img/linkIco/dir.png",
            "url": "javascript:;",
            "x": 560,
            "y": 320,
            "id": "L-50",
            "chid": [
                {
                    "name": "虎嗅网",
                    "id": "L-49",
                    "icoUrl": "./img/linkIco/huxiu.png",
                    "url": "http://www.huxiu.com/"
                },
                {
                    "name": "36Kr",
                    "icoUrl": "./img/linkIco/36k.png",
                    "url": "https://www.36kr.com/",
                    "id": "L-35"
                }
            ]
        },
        {
            "name": "娱乐",
            "icoUrl": "./img/linkIco/dir.png",
            "url": "javascript:;",
            "x": 480,
            "y": 320,
            "id": "L-51",
            "chid": [
                {
                    "name": "toonme",
                    "icoUrl": "./img/linkIco/toonme.png",
                    "url": "https://toonme.com/",
                    "id": "L-17"
                },
                {
                    "name": "优酷",
                    "icoUrl": "./img/linkIco/youku.png",
                    "url": "http://youku.com/",
                    "id": "L-24"
                },
                {
                    "name": "斗鱼直播",
                    "icoUrl": "./img/linkIco/douyu.png",
                    "url": "https://www.douyu.com/",
                    "x": 80,
                    "y": 480,
                    "id": "L-8"
                },
                {
                    "name": "茶杯狐",
                    "icoUrl": "./img/linkIco/chabeihu.png",
                    "url": "https://www.cupfox.app/",
                    "x": 480,
                    "y": 480,
                    "id": "L-20"
                },
                {
                    "name": "汽车之家",
                    "icoUrl": "./img/linkIco/qichezhijia.png",
                    "url": "https://www.autohome.com.cn/",
                    "x": 160,
                    "y": 480,
                    "id": "L-34"
                },
                {
                    "name": "今日热榜",
                    "icoUrl": "./img/linkIco/jrrd.png",
                    "url": "https://tophub.today/",
                    "x": 240,
                    "y": 480,
                    "id": "L-21"
                }
            ]
        },
        {
            "name": "有道云笔记",
            "id": "L-52",
            "icoUrl": "./img/linkIco/youdao.png",
            "url": "http://note.youdao.com/",
            "x": 320,
            "y": 480
        }
    ],
    "coms": [
        {
            "name": "快捷搜索",
            "url": "./components/search/index.html",
            "x": 80,
            "y": 160,
            "width": "560",
            "height": "130",
            "id": "C-39"
        },
        {
            "name": "跳动电子时钟",
            "url": "./components/beatTime/index.html",
            "id": "C-46",
            "x": 240,
            "y": 80,
            "width": "240",
            "height": "50"
        },
        {
            "name": "万能嵌入",
            "url": "./components/iframe/index.html",
            "id": "C-48",
            "x": 720,
            "y": 80,
            "width": "400",
            "height": "530"
        }
    ],
    "ad": [
        {
            "name": "阿里云特价",
            "icoUrl": "./img/linkIco/aliyun.png",
            "url": "https://www.aliyun.com/activity/daily/bestoffer?userCode=7jvoe5ia",
            "id": "L-10000"
        }
    ],
    "nowMinId": 52,
    "bgSrc": "",
    "version": 8,
    "height": "1600"
}