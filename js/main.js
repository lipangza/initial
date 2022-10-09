const body = document.body
let comArr = [];
const initLayout = () => {
    const layoutData = JSON.parse(localStorage.getItem('layoutData'))
    if (layoutData) {
        // 老用户
        // if (layoutData.version != components.version) return clearLocal()
        comArr = layoutData;
    } else {
        // 新用户
        comArr = components
        comArr.boxUrls.forEach(item => {
            item.id = 'L-' + createId()
        })
        comArr.coms.forEach(item => {
            item.id = 'C-' + createId()
        })
        localStorage.setItem('layoutData', JSON.stringify(components))
    }
    // 背景
    if (comArr.bgSrc) {
        body.style.background = `url(${comArr.bgSrc}) 0% 0% / cover no-repeat fixed`
    } else {
        body.style.background = `#35363A`
    }
    // 高度
    boxMain.style.height = comArr.height + 'px'
    // 渲染
    comArr.boxUrls.forEach((item) => {
        playUp(item, 'boxUrls')
    })
    comArr.coms.forEach((item) => {
        playUp(item, 'coms')
    })
}
initLayout()
let bgInfo = new GetPos(boxMain) // 主容器位置信息
const gridArr = [] // 网格
// 初始化容器网格
const gridInfo = {
    row: parseInt(bgInfo.width / 80),
    col: parseInt(bgInfo.height / 80),
    countNum: parseInt(bgInfo.width / 80) * parseInt(bgInfo.height / 80)
}
for (let i = 0; i < gridInfo.col; i++) {
    for (let j = 0; j < gridInfo.row; j++) {
        gridArr.push({
            x: j * 80,
            y: i * 80
        })
    }
}
// 拖拽
const whiRightBtn = document.querySelector('.whiRightBtn') // 空白处弹窗
let scollTop = null;
let nowOper = null;
const brforeMovePos = {
    x: null,
    y: null
}
let coverBox = document.getElementById('coverBox')
// 委托所有movebox
boxMain.addEventListener('mousedown', (e) => {
    e.composedPath().some(item => {
        if (item.className && item.className.includes('moveBox')) {
            nowOper = item
            return true
        } else {
            nowOper = null
        }
    })
    if (!nowOper) return
    bgInfo = new GetPos(boxMain) // 防止浏览器大小改变
    scollTop = document.querySelector('.main').scrollTop
    if (e.button != 0) return
    brforeMovePos.x = nowOper.offsetLeft
    brforeMovePos.y = nowOper.offsetTop
    isAddCom = false
    nowOper.style.transition = 'none'
    boxMain.onmousemove = null
    boxMain.onmousemove = (ev) => {
        nowOper.style.zIndex = '998'
        nowOper.style.left = ev.pageX - bgInfo.left - e.layerX + 'px'
        nowOper.style.top = ev.pageY - bgInfo.top + scollTop - e.layerY + 'px'
        if (nowOper.offsetLeft <= 0) nowOper.style.left = '0'
        if (nowOper.offsetTop <= 0) nowOper.style.top = '0'
        if (nowOper.offsetLeft >= (bgInfo.width - nowOper.offsetWidth)) nowOper.style.left = bgInfo.width - nowOper.offsetWidth + 'px'
        if (nowOper.offsetTop >= (bgInfo.height - nowOper.offsetHeight)) nowOper.style.top = bgInfo.height - nowOper.offsetHeight + 'px'
        // 跳转和遮盖优化
        if (Math.abs(nowOper.offsetTop - brforeMovePos.y) > 2 || Math.abs(nowOper.offsetLeft - brforeMovePos.x) > 2) {
            // 确定是移动了才给遮盖
            coverBox.style.zIndex = "999"
            coverBox.style.display = "block"
        }
    }
})
window.onmouseup = function (e) {
    if (e.button == 0 && whiRightBtn.style.display == "block") {
        setTimeout(() => {
            whiRightBtn.style.display = "none"
        }, 100)
        whiRightBtn.style.animation = 'readyPageRet 0.2s'
    }
    if (!nowOper) return
    nowOper.style.transition = '0.3s'
    coverBox.style.zIndex = "0"
    coverBox.style.display = "none"
    nowOper.style.zIndex = '1'
    nowOper.style.background = "none"
    boxMain.onmousemove = null
    getNullPos(nowOper)
}
// 空白处右键
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const delBtn = whiRightBtn.querySelector('div')
    if (nowOper) {
        delBtn.style.display = 'block'
    } else {
        delBtn.style.display = 'none'
    }
    whiRightBtn.style.left = e.pageX + 4 + 'px'
    whiRightBtn.style.top = e.pageY + scollTop + 4 + 'px'
    whiRightBtn.style.display = "block"
    whiRightBtn.style.animation = 'readyPage 0.3s'
    setTimeout(() => {
        divOverflow(whiRightBtn, document.body)
    }, 150)
})
// 右键删除
const delThis = () => {
    if (!nowOper) return
    nowOper.style.animation = 'readyPageRet .2s'
    setTimeout(() => {
        boxMain.removeChild(nowOper)
    }, 100)
    delCom(nowOper.getAttribute('comId'))
}
// 自动寻找最近的空位并存储
let isAddCom = false
function getNullPos(dom) {
    let moveBox = document.getElementsByClassName('moveBox'); // 所有组件
    // 最近的位置
    let shortDis = {
        distance: null,
        gridPos: null
    }
    for (let i = 0; i < gridArr.length; i++) {
        let dis = Math.sqrt(Math.pow(dom.offsetLeft - gridArr[i].x, 2) + Math.pow(dom.offsetTop - gridArr[i].y, 2))
        if ((shortDis.distance == null || dis < shortDis.distance)) {
            shortDis.distance = dis
            shortDis.gridPos = gridArr[i]
        }
    }
    // 检测是否和最近的位置碰撞
    let toMove = true
    for (let i = 0; i < moveBox.length; i++) {
        if (isCollision(dom, moveBox[i])) {
            toMove = false
        }
    }
    if (toMove) {
        nowOper.style.left = shortDis.gridPos.x + 'px'
        nowOper.style.top = shortDis.gridPos.y + 'px'
        toSaveLayout(shortDis.gridPos.x, shortDis.gridPos.y);
    } else {
        if (isAddCom) {
            fyNotice('请将组件放置到空位')
            delCom(nowOper.getAttribute('comid'))
            boxMain.removeChild(nowOper)
            return
        }
        nowOper.style.left = brforeMovePos.x + 'px'
        nowOper.style.top = brforeMovePos.y + 'px'
    }
}

// 删除组件存储的数据
const delCom = (comId) => {
    if (comId.substring(0, 1) == 'L') {
        comArr.boxUrls.forEach((item, index) => {
            if (comId == item.id) {
                comArr.boxUrls.splice(index, 1)
            }
        })
    } else if (comId.substring(0, 1) == 'C') {
        comArr.coms.forEach((item, index) => {
            if (comId == item.id) {
                comArr.coms.splice(index, 1)
            }
        })
    }
    localLayout(comArr);
}

// 存储移动后的数据
const toSaveLayout = (x, y) => {
    const typeId = nowOper.getAttribute('comId')
    if (typeId.substring(0, 1) == 'L') {
        comArr.boxUrls.forEach((item) => {
            if (item.id == typeId) {
                item.x = x
                item.y = y
            }
        })
    } else if (typeId.substring(0, 1) == 'C') {
        comArr.coms.forEach((item) => {
            if (item.id == typeId) {
                item.x = x
                item.y = y
            }
        })
    }
    localLayout(comArr);
}

// 获取布局信息
const layList = document.querySelector('.layList')
document.getElementById('layBtn').addEventListener('click', () => {
    // 暂时写死
    layList.innerHTML = `
        <div class="layItem">
            <img src="./layout/img/official1.jpg" alt="">
            <div>
                <h3>启航</h3>
                <p>添加了一些常用网站，和一个万能嵌入组件。</p>
                <div class="layMeta">
                    <div>推荐,官方,2022/9/19</div>
                    <div>id:PmTRBh8nCiGB8AU</div>
                    <button file-name="official1" class="fyBtn fyBtnFix">确定使用</button>
                </div>
            </div>
        </div>
        <div class="layItem">
            <img src="./layout/img/official2.jpg" alt="">
            <div>
                <h3>极简</h3>
                <p>极致简化页面内容，仅剩一个快捷搜索。</p>
                <div class="layMeta">
                    <div>推荐,官方,2022/9/19</div>
                    <div>id:UIHjfiiuhePlwij</div>
                    <button file-name="official2" class="fyBtn fyBtnFix">确定使用</button>
                </div>
            </div>
        </div>
        <div class="layItem">
            <img src="./layout/img/official3.jpg" alt="">
            <div>
                <h3>简洁</h3>
                <p>添加了一个快捷搜索和一些常用网站。</p>
                <div class="layMeta">
                    <div>推荐,官方,2022/9/19</div>
                    <div>id:tmsrtgssSERFffc</div>
                    <button file-name="official3" class="fyBtn fyBtnFix">确定使用</button>
                </div>
            </div>
        </div>
        <div class="layItem">
            <img src="./layout/img/official4.jpg" alt="">
            <div>
                <h3>前端</h3>
                <p>包含一个WEB安全色组件和一些常用网址。</p>
                <div class="layMeta">
                    <div>推荐,梦岑,2022/9/21</div>
                    <div>id:gyujhkjshdkjh</div>
                    <button file-name="official4" class="fyBtn fyBtnFix">确定使用</button>
                </div>
            </div>
        </div>
        <div class="layItem">
            <img src="./layout/img/official5.jpg" alt="">
            <div>
                <h3>设计</h3>
                <p>设计师必备，添加一些设计常用网站。</p>
                <div class="layMeta">
                    <div>推荐,梦岑,2022/9/21</div>
                    <div>id:iwuefgliwughflj</div>
                    <button file-name="official5" class="fyBtn fyBtnFix">确定使用</button>
                </div>
            </div>
        </div>
    `
})
layList.addEventListener('click', (e) => {
    const fileName = e.target.getAttribute('file-name')
    if (fileName) {
        fetch(`http://www.1mmk.com/layout/layouts/${fileName}.json`, { method: 'get' }).then(value => {
            return value.text()
        }).then(value => {
            comArr = JSON.parse(value)
            localLayout(comArr);
            window.location.reload()
        })
    }
})

window.addEventListener('load', () => {
    // 添加网址
    const addWebsiteBtn = document.getElementById('addWebsiteBtn');
    const websiteUrl = document.getElementById('websiteUrl')
    const websiteName = document.getElementById('websiteName')
    const checkIco = document.getElementById('checkIco')
    addWebsiteBtn.addEventListener('click', () => {
        // 判断网址格式
        let url = websiteUrl.value
        if (!url.includes('.')) return fyNotice('请输入正确的网址')
        if (url.substring(0, 4) != 'http') url = 'http://' + url
        if (websiteName.value.length < 1) return fyNotice('请输入名字')
        if (url.split('/').length < 4) url += '/'
        // 尝试获取ico
        let ico = new Image()
        // 有两个点获取第一个点后面的第一个字母，一个点获取/后面的第一个字母
        let letter = null
        if (url.split('.').length > 2) {
            letter = url.substring(url.indexOf('.') + 1, url.indexOf('.') + 2)
        } else {
            letter = url.substring(url.indexOf('/') + 2, url.indexOf('/') + 3)
        }
        if (/^[a-zA-Z]*$/.test(letter)) {
            letter = letter.toUpperCase()
        } else {
            letter = 'hz'
        }
        if (checkIco.checked) {
            ico.src = url + 'favicon.ico'
            ico.onerror = function () {
                // 获取本地图标
                ico.src = `./img/icos/${'16gl-' + letter}.png`
            }
        } else {
            // 获取本地图标
            ico.src = `./img/icos/${'16gl-' + letter}.png`
        }
        ico.onload = function () {
            const newLinkInfo = {
                name: websiteName.value,
                id: 'L-' + createId(),
                icoUrl: ico.src,
                url: url,
                x: 0,
                y: 0,
            }
            comArr.boxUrls.push(newLinkInfo)
            playUp(newLinkInfo, 'boxUrls', true)
            localLayout(comArr);
            closeModel()
            fyNotice('添加成功');
        }
    })

    // 组件库
    const showComs = document.getElementById('showComs')
    const comNav = document.querySelector('.comNav')
    const comFormatInfo = {
        '尝鲜': [],
        '阅读': [],
        '工具': [],
        '游戏': [],
        '社交': [],
        '音乐': [],
        '视频': [],
        '摆件': [],
        '其他': []
    }
    let comsList = []
    comNav.addEventListener('click', (e) => {
        if (e.target.className == 'comNav' || e.target.className.includes('comNavActive')) return
        document.querySelector('.comNavActive').className = ""
        e.target.className = "comNavActive"
        setComCon(e.target.innerHTML)
    })
    showComs.addEventListener('click', () => {
        // 格式化数据，暂时前端区分tag
        if (comsList.length != 0) return
        fetch('http://api.1mmk.com/getComs', { method: 'get' }).then(value => { return value.json() }).then(async value => {
            comsList = value
            await value.forEach(item => {
                let tagsArr = item.tags.split(',')
                tagsArr.forEach(tag => {
                    comFormatInfo[tag].push(item)
                })
            })
            setComCon('尝鲜');
        })
    })
    // 传入导航名渲染列表
    const setComCon = (navName) => {
        const comCon = document.querySelector('.comCon')
        comCon.innerHTML = ""
        if (comFormatInfo[navName].length == 0) return comCon.innerHTML = "<p style='font-size:14px;margin:0'>此分类没有还没有组件.</p>"
        comFormatInfo[navName].forEach(item => {
            const comItem = document.createElement('div')
            comItem.className = 'comItem'
            comItem.setAttribute('data-comid', item.id)
            comItem.innerHTML = `<img src="http://www.1mmk.com/img/comLogo/${item.imgUrl}" alt="${item.name}"><div class="comMeta"><h2>${item.name}</h2><div class="comInfo"><span>作者：${item.author}</span></div><p>${item.des}</p></div>`
            comCon.appendChild(comItem)
        })
        // 组件拖拉到页面
        comCon.onmousedown = null
        comCon.onmousedown = (e) => {
            if (e.target.className == 'comItem') {
                const comId = e.target.getAttribute('data-comid')
                const putCom = {}
                comsList.some(item => {
                    if (item.id == comId) {
                        putCom.name = item.name
                        putCom.url = `./components/${item.id}/index.html`
                        putCom.id = 'C-' + createId()
                        putCom.x = e.pageX - bgInfo.left - (item.width / 2)
                        putCom.y = e.pageY - bgInfo.top - 15
                        putCom.width = item.width
                        putCom.height = item.height
                        return true
                    }
                })
                comArr.coms.push(putCom)
                playUp(putCom, 'coms', true)
                nowOper = document.querySelector('.moveBox:last-child')
                nowOper.style.zIndex = '998'
                coverBox.style.zIndex = "999"
                coverBox.style.display = "block"
                isAddCom = true
                closeModel()
                boxMain.onmousemove = (ev) => {
                    nowOper.style.left = ev.pageX - bgInfo.left - (nowOper.offsetWidth / 2) + 'px'
                    nowOper.style.top = ev.pageY - bgInfo.top + scollTop - 15 + 'px'
                    if (nowOper.offsetLeft <= 0) nowOper.style.left = '0'
                    if (nowOper.offsetTop <= 0) nowOper.style.top = '0'
                    if (nowOper.offsetLeft >= (bgInfo.width - nowOper.offsetWidth)) nowOper.style.left = bgInfo.width - nowOper.offsetWidth + 'px'
                    if (nowOper.offsetTop >= (bgInfo.height - nowOper.offsetHeight)) nowOper.style.top = bgInfo.height - nowOper.offsetHeight + 'px'
                }
            }
        }
    }

    // 背景更换
    const bgBtn = document.getElementById('bgBtn')
    let nowSelBg = null;
    let nowSelUrl = null
    bgBtn.addEventListener('click', () => {
        const bgContent = document.querySelector('#mainBg > section > .bgList')
        bgContent.innerHTML = ""
        fetch('http://api.1mmk.com/getBg', {
            method: 'get'
        }).then(value => {
            return value.json()
        }, error => {
            comsContent.innerHTML = '错误信息：' + error + '，刷新网页如果继续报错请联系我们。'
        }).then(data => {
            data.forEach(item => {
                bgContent.innerHTML += `
                    <img src="./img/ku/${item}" alt="${item}"/>
                `;
            })
            const bgs = document.querySelectorAll('#mainBg > section > .bgList > img');
            bgs.forEach(item => {
                item.addEventListener('click', () => {
                    if (nowSelBg) nowSelBg.style.opacity = ".6"
                    item.style.opacity = "1"
                    nowSelUrl = item.src
                    nowSelBg = item
                })
            })
        })
    })
    const changeBgBtn = document.querySelector('#mainBg > footer > button');
    changeBgBtn.addEventListener('click', () => {
        if (!nowSelUrl) return fyNotice("请选择一张图片")
        document.body.style.background = `url(${nowSelUrl}) 0% 0% / cover no-repeat fixed`
        comArr.bgSrc = nowSelUrl
        localLayout(comArr)
        fyNotice("更换背景成功")
    })
})

