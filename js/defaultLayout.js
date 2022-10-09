// 使用默认组件自动布局
const components = {
    "boxUrls": [
        {
            "name": "菜鸟教程",
            "icoUrl": "./img/linkIco/cainiaojiaoc.png",
            "url": "https://www.runoob.com/",
            "x": 1040,
            "y": 480
        },
        {
            "name": "知乎",
            "icoUrl": "./img/linkIco/zhihu.png",
            "url": "https://www.zhihu.com/",
            "x": 800,
            "y": 400
        },
        {
            "name": "bilibili",
            "icoUrl": "./img/linkIco/bilibili.png",
            "url": "https://www.bilibili.com/",
            "x": 80,
            "y": 400
        },
        {
            "name": "东方财富",
            "icoUrl": "./img/linkIco/dongfangcaifu.png",
            "url": "https://www.eastmoney.com/",
            "x": 160,
            "y": 480
        },
        {
            "name": "斗鱼直播",
            "icoUrl": "./img/linkIco/douyu.png",
            "url": "https://www.douyu.com/",
            "x": 320,
            "y": 400
        },
        {
            "name": "西瓜视频",
            "icoUrl": "./img/linkIco/xgsp.png",
            "url": "https://www.ixigua.com/",
            "x": 400,
            "y": 400
        },
        {
            "name": "网易云音乐",
            "icoUrl": "./img/linkIco/wyyyy.png",
            "url": "https://music.163.com/",
            "x": 880,
            "y": 480
        },
        {
            "name": "虎牙直播",
            "icoUrl": "./img/linkIco/hy.png",
            "url": "https://www.huya.com/",
            "x": 240,
            "y": 400
        },
        {
            "name": "草料二维码",
            "icoUrl": "./img/linkIco/cailiaoerweima.png",
            "url": "https://cli.im/",
            "x": 480,
            "y": 560
        },
        {
            "name": "吾爱破解",
            "icoUrl": "./img/linkIco/wuaipojie.png",
            "url": "https://www.52pojie.cn/",
            "x": 1040,
            "y": 400
        },
        {
            "name": "阿里云盘",
            "icoUrl": "./img/linkIco/aliyunpan.png",
            "url": "https://www.aliyundrive.com/",
            "x": 480,
            "y": 400
        },
        {
            "name": "微博",
            "icoUrl": "./img/linkIco/weibo.png",
            "url": "https://weibo.com/",
            "x": 160,
            "y": 400
        },
        {
            "name": "淘股吧",
            "icoUrl": "./img/linkIco/taoguba.png",
            "url": "https://www.taoguba.com.cn/",
            "x": 160,
            "y": 560
        },
        {
            "name": "toonme",
            "icoUrl": "./img/linkIco/toonme.png",
            "url": "https://toonme.com/",
            "x": 80,
            "y": 560
        },
        {
            "name": "wallhaven",
            "icoUrl": "./img/linkIco/wallhaven.png",
            "url": "https://wallhaven.cc/",
            "x": 880,
            "y": 400
        },
        {
            "name": "抖音",
            "icoUrl": "./img/linkIco/douyin.png",
            "url": "http://douyin.com/",
            "x": 720,
            "y": 400
        },
        {
            "name": "茶杯狐",
            "icoUrl": "./img/linkIco/chabeihu.png",
            "url": "https://www.cupfox.app/",
            "x": 400,
            "y": 560
        },
        {
            "name": "今日热榜",
            "icoUrl": "./img/linkIco/jrrd.png",
            "url": "https://tophub.today/",
            "x": 640,
            "y": 400
        },
        {
            "name": "QQ邮箱",
            "icoUrl": "./img/linkIco/qqyouxiang.png",
            "url": "https://mail.qq.com/",
            "x": 480,
            "y": 480
        },
        {
            "name": "U钙网",
            "icoUrl": "./img/linkIco/ugai.png",
            "url": "https://www.uugai.com/",
            "x": 320,
            "y": 560
        },
        {
            "name": "优酷",
            "icoUrl": "./img/linkIco/youku.png",
            "url": "http://youku.com/",
            "x": 560,
            "y": 560
        },
        {
            "name": "豆瓣网",
            "icoUrl": "./img/linkIco/douban.png",
            "url": "http://douban.com/",
            "x": 240,
            "y": 480
        },
        {
            "name": "简书",
            "icoUrl": "./img/linkIco/jianshu.png",
            "url": "http://www.jianshu.com/",
            "x": 800,
            "y": 480
        },
        {
            "name": "天眼查",
            "icoUrl": "./img/linkIco/tianyancha.png",
            "url": "http://tianyancha.com/",
            "x": 560,
            "y": 480
        },
        {
            "name": "游侠网",
            "icoUrl": "./img/linkIco/youxia.png",
            "url": "http://ali213.net/",
            "x": 240,
            "y": 560
        },
        {
            "name": "wikiHow",
            "icoUrl": "./img/linkIco/wikiHow.png",
            "url": "https://zh.wikihow.com/",
            "x": 720,
            "y": 560
        },
        {
            "name": "免费游戏",
            "icoUrl": "./img/linkIco/youxi.png",
            "url": "https://poki.cn/",
            "x": 720,
            "y": 480
        },
        {
            "name": "腾讯课堂",
            "icoUrl": "./img/linkIco/txkt.png",
            "url": "https://ke.qq.com/",
            "x": 560,
            "y": 400
        },
        {
            "name": "华尔街见闻",
            "icoUrl": "./img/linkIco/huaerjie.png",
            "url": "https://wallstreetcn.com/",
            "x": 640,
            "y": 560
        },
        {
            "name": "雪球",
            "icoUrl": "./img/linkIco/xueqiu.png",
            "url": "https://xueqiu.com/",
            "x": 80,
            "y": 480
        },
        {
            "name": "汽车之家",
            "icoUrl": "./img/linkIco/qichezhijia.png",
            "url": "https://www.autohome.com.cn/",
            "x": 320,
            "y": 480
        },
        {
            "name": "36Kr",
            "icoUrl": "./img/linkIco/36k.png",
            "url": "https://www.36kr.com/",
            "x": 960,
            "y": 480
        },
        {
            "name": "小霸王",
            "icoUrl": "./img/linkIco/xiaobawang.png",
            "url": "https://www.yikm.net/",
            "x": 400,
            "y": 480
        },
        {
            "name": "网易云游戏",
            "icoUrl": "./img/linkIco/wangyiyunyouxi.png",
            "url": "https://cg.163.com/",
            "x": 960,
            "y": 400
        },
        {
            "name": "财联社",
            "icoUrl": "./img/linkIco/cailians.png",
            "url": "https://m.cls.cn/",
            "x": 640,
            "y": 480
        }
    ],
    "coms": [
        {
            "name": "快捷搜索",
            "url": "./components/search/index.html",
            "x": 320,
            "y": 160,
            "width": "560",
            "height": "130"
        },
        {
            "name": "跳动电子时钟",
            "url": "./components/beatTime/index.html",
            "x": 480,
            "y": 80,
            "width": "240",
            "height": "50"
        }
    ],
    "bgSrc": "",
    "height": "1600",
    "version": "2.1"
}