const whiRightBtn = document.querySelector('.whiRightBtn')
const moveBeforePos = { x: null, y: null }
let scollTop = null;
let nowOper = null;
let coverBox = document.getElementById('coverBox')
let toDrag = true
// 拖拉
boxMain.addEventListener('mousedown', (e) => {
    if (bgInfo.width != 1200) initGrid();
    nowOper = null
    e.composedPath().some(item => { if (item.className && item.className.includes('moveBox')) return nowOper = item })
    if (!toDrag) return
    if (!nowOper || e.button != 0 || nowOper.parentNode.getAttribute('domType') == 'urlsContainer') return
    bgInfo = new GetPos(boxMain);
    moveBeforePos.x = nowOper.offsetLeft
    moveBeforePos.y = nowOper.offsetTop
    scollTop = body.scrollTop
    nowOper.style.zIndex = '998'
    isAddCom = false
    boxMain.onmousemove = (ev) => {
        if (!(Math.abs(e.pageX - ev.pageX) > 2 || Math.abs(e.pageY - ev.pageY) > 2)) return // 解决移动敏感
        coverBox.style.display = "block"
        nowOper.style.transition = 'none'
        nowOper.style.left = ev.pageX - bgInfo.left - e.layerX + 'px'
        nowOper.style.top = ev.pageY - bgInfo.top + scollTop - e.layerY + 'px'
        // 位置调整
        if (nowOper.offsetLeft <= 0) nowOper.style.left = '0'
        if (nowOper.offsetTop <= 0) nowOper.style.top = '0'
        if (nowOper.offsetLeft >= (bgInfo.width - nowOper.offsetWidth)) nowOper.style.left = bgInfo.width - nowOper.offsetWidth + 'px'
        if (nowOper.offsetTop >= (bgInfo.height - nowOper.offsetHeight)) nowOper.style.top = bgInfo.height - nowOper.offsetHeight + 'px'
    }
})
// 鼠标松起
document.addEventListener('mouseup', (e) => {
    if (!toDrag) return
    // 关闭右键
    if (e.button == 0 && whiRightBtn.style.display == "block") {
        setTimeout(() => {
            whiRightBtn.style.display = "none"
        }, 100)
        whiRightBtn.style.animation = 'readyPageRet 0.2s'
    }
    boxMain.onmousemove = null
    if (!nowOper) return
    if (nowOper.href == 'javascript:;') lastUrls = nowOper;
    nowOper.style.transition = '0.3s'
    coverBox.style.display = "none"
    nowOper.style.zIndex = '1'
    getNullPos(nowOper)
    if (e.target.tagName == 'BODY') return nowOper = null
    // 弹出网址集
    if (!e.composedPath().some(item => { return item.href == 'javascript:;' }) || !nowOper || e.button == 2) return
    if (nowOper.href == 'javascript:;' && moveBeforePos.x == nowOper.offsetLeft && moveBeforePos.y == nowOper.offsetTop) {
        bodyCover.style.display = 'block'
        urlsModel.style.display = 'block'
        urlsModel.style.animation = 'urls .3s'
        urlsModel.querySelector('div').innerHTML = ''
        urlsModel.querySelector('h3').innerHTML = nowOper.querySelector('span').innerHTML
        getItemById(nowOper.getAttribute('comId')).chid?.forEach(item => { playUp(item, 'urls') })
    }
})
// 右键
document.addEventListener('contextmenu', (e) => {
    if (thisModel || !nowOper) return
    if (nowOper && nowOper.getAttribute('comId') == 'L-1') {
        return fyNotice('此网址集不可操作')
    }
    e.preventDefault();
    const delBtn = whiRightBtn.querySelector('div')
    const reNameBtn = whiRightBtn.querySelector('div:nth-child(2)')
    const exportHome = whiRightBtn.querySelector('div:nth-child(3)')
    exportHome.style.display = 'none'
    delBtn.style.display = 'block'
    reNameBtn.style.display = 'block'
    if (nowOper?.parentNode.getAttribute('domType') == 'urlsContainer') exportHome.style.display = 'block'
    whiRightBtn.style.left = e.pageX + 4 + 'px'
    whiRightBtn.style.top = e.pageY + scollTop + 4 + 'px'
    whiRightBtn.style.display = "block"
    whiRightBtn.style.animation = 'readyPage 0.2s'
    setTimeout(() => {
        divOverflow(whiRightBtn, document.body)
    }, 150)
})
// 关闭所有弹窗
bodyCover.onclick = function () {
    if (thisModel) return closeModel()
    bodyCover.style.display = 'none'
    urlsModel.style.animation = 'urlsRet .3s'
    setTimeout(() => {
        urlsModel.style.display = 'none'
    }, 200)
}
// 移出
const exportHomeFun = () => {
    if (getItemById(lastUrls.getAttribute('comId'))?.disabled) return fyNotice('此网址集不可操作');
    let newObj = getItemById(nowOper.getAttribute('comId'), true)
    const nullPos = getNullGrid()
    newObj.x = nullPos.x
    newObj.y = nullPos.y
    playUp(newObj, 'boxUrls', true)
    comArr.boxUrls.push(newObj)
    delCom(nowOper)
    localLayout(comArr)
}
// 重命名
const reNameFun = () => {
    toDrag = false
    const operDom = nowOper
    // 删除href属性防止选中bug
    let hrefInfo = operDom.href
    if (operDom.href) operDom.removeAttribute('href')
    const inputNewName = document.createElement('input')
    const showNameSpan = operDom.querySelector('span')
    inputNewName.value = showNameSpan.innerHTML
    inputNewName.style.width = "100%"
    operDom.appendChild(inputNewName)
    inputNewName.focus()
    inputNewName.setSelectionRange(0, -1);
    showNameSpan.style.display = 'none'
    const savaName = () => {
        toDrag = true
        // 复原href
        if (hrefInfo) operDom.href = hrefInfo
        // dom复原
        showNameSpan.innerHTML = inputNewName.value
        showNameSpan.style.display = 'block'
        operDom.removeChild(inputNewName)
        // 数据保存：首先看是否为子集
        if (operDom.parentNode.getAttribute('domtype') == 'urlsContainer') {
            if (inputNewName.value.length > 21 && operDom.getAttribute('comId').substring(0, 1) == 'L') operDom.title = inputNewName.value
            getItemById(operDom.getAttribute('comId'), true).name = inputNewName.value
        } else {
            if (inputNewName.value.length > 6 && operDom.getAttribute('comId').substring(0, 1) == 'L') operDom.title = inputNewName.value
            getItemById(operDom.getAttribute('comId')).name = inputNewName.value
        }
        localLayout(comArr)
    }
    let toSave = true // 防止两次执行报错
    inputNewName.onkeyup = (e) => { if (e.key == 'Enter') { toSave = false; savaName() } }
    inputNewName.onblur = () => { if (toSave) savaName() }
}
// 寻找最近的空位
let isAddCom = false
function getNullPos(dom) {
    let moveBox = document.getElementsByClassName('moveBox');
    // 最近的位置
    let shortDis = { distance: null, gridPos: null }
    for (let i = 0; i < gridArr.length; i++) {
        let dis = Math.sqrt(Math.pow(dom.offsetLeft - gridArr[i].x, 2) + Math.pow(dom.offsetTop - gridArr[i].y, 2))
        if ((shortDis.distance == null || dis < shortDis.distance)) {
            shortDis.distance = dis
            shortDis.gridPos = gridArr[i]
        }
    }
    // 移动后的碰撞检测
    let toMove = true
    let overlap = null
    for (let i = 0; i < moveBox.length; i++) {
        if (isCollision(dom, moveBox[i])) {
            toMove = false
            overlap = moveBox[i]
        }
    }
    if (toMove) {
        // 子网址
        if (nowOper?.parentNode?.getAttribute('domType') == 'urlsContainer') return
        // 没有碰撞且位置没变，找到空位
        nowOper.style.left = shortDis.gridPos.x + 'px'
        nowOper.style.top = shortDis.gridPos.y + 'px'
        const chanItem = getItemById(nowOper.getAttribute('comId'))
        chanItem.x = shortDis.gridPos.x
        chanItem.y = shortDis.gridPos.y
        localLayout(comArr);
    } else {
        // 新添加的组件碰撞了
        if (isAddCom) {
            fyNotice('请按住组件,并放置到空位~');
            delCom(nowOper)
            return
        }
        // wuwuw
        if (dom.parentNode.getAttribute('domType') == 'urlsContainer') return
        // 有一方是组件，或者正在操作的是网址集就退出
        if (dom.getAttribute('comId').substring(0, 1) == 'C' || overlap.getAttribute('comId').substring(0, 1) == 'C' || (dom.getAttribute('href') && dom.getAttribute('href') == 'javascript:;')) return resPos()
        // 正在操作的是网址，目标是网址集就放入
        if (overlap.getAttribute('comId') == 'L-1') {
            fyNotice('此网址集不可操作');
            resPos();
            return
        }
        if (overlap.href && overlap.href == 'javascript:;') {
            const putDom = getItemById(dom.getAttribute('comId'))
            delete putDom.x
            delete putDom.y
            getItemById(overlap.getAttribute('comId')).chid?.push(putDom)
            delCom(dom)
            return
        }
        // 两边都是网址，生成网址集
        const newUrls = {
            "name": "新网址集",
            "icoUrl": "./img/linkIco/dir.png",
            "url": "javascript:;",
            "x": overlap.offsetLeft,
            "y": overlap.offsetTop,
            "id": 'L-' + ++nowMinId,
            "chid": []
        }
        const thisItem = [getItemById(dom.getAttribute('comId')), getItemById(overlap.getAttribute('comId'))]
        thisItem.forEach(item => {
            delete item.x
            delete item.y
            newUrls.chid.push(item)
        })
        delCom(dom)
        delCom(overlap)
        playUp(newUrls, 'boxUrls', true)
        comArr.boxUrls.push(newUrls)
        localLayout(comArr)
    }
}
// 放回原位
const resPos = () => {
    nowOper.style.left = moveBeforePos.x + 'px'
    nowOper.style.top = moveBeforePos.y + 'px'
}
// 添加网址
const getPrimaryUrl = (url) => {
    let stopCount = 0
    for (let i = 0; i < url.length; i++) {
        if (url.substring(i, i + 1) == '/') stopCount++
        if (stopCount == 3) return url.substring(0, i + 1)
    }
}
const addSiteFun = () => {
    showModel('addWebsite')
    websiteUrl.focus()
}
const addSiteYes = () => {
    const websiteUrl = document.getElementById('websiteUrl')
    const websiteName = document.getElementById('websiteName')
    const checkIco = document.getElementById('checkIco')
    // 判断网址格式
    let url = websiteUrl.value
    if (!url.includes('.')) return fyNotice('请输入正确的网址')
    if (url.substring(0, 4) != 'http') url = 'http://' + url
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
    let primaryUrl = null // 主域名识别
    primaryUrl = getPrimaryUrl(url)
    console.log("主域名：" + primaryUrl)
    if (checkIco.checked) {
        ico.src = primaryUrl + 'favicon.ico'
        ico.onerror = function () {
            ico.src = `./img/icos/${'16gl-' + letter}.png`
        }
    } else {
        ico.src = `./img/icos/${'16gl-' + letter}.png`
    }
    const nullPos = getNullGrid()
    closeModel()
    ico.onload = function () {
        const newLinkInfo = {
            name: websiteName.value,
            id: 'L-' + ++nowMinId,
            icoUrl: ico.src,
            url: url,
            x: nullPos.x,
            y: nullPos.y,
        }
        comArr.boxUrls.push(newLinkInfo)
        playUp(newLinkInfo, 'boxUrls', true)
        localLayout(comArr);
        websiteUrl.value = ""
        websiteName.value = ""
    }
}
// 组件库
const addComFun = () => {
    showModel('comList')
    const comNav = document.querySelector('.comNav')
    const comFormatInfo = { '尝鲜': [], '阅读': [], '工具': [], '游戏': [], '社交': [], '音乐': [], '视频': [], '摆件': [], '其他': [] }
    let comsList = []
    if (comsList.length != 0) return // 当前已经加载过数据了
    fetch('https://api.1mmk.com/getComs', { method: 'get' }).then(value => { return value.json() }).then(async value => {
        comsList = value
        await value.forEach(item => {
            let tagsArr = item.tags.split(',')
            tagsArr.forEach(tag => {
                comFormatInfo[tag].push(item)
            })
        })
        setComCon('尝鲜');
    })
    comNav.addEventListener('click', (e) => {
        if (e.target.className == 'comNav' || e.target.className.includes('comNavActive')) return
        document.querySelector('.comNavActive').className = ""
        e.target.className = "comNavActive"
        setComCon(e.target.innerHTML)
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
            comItem.innerHTML = `<img src="https://www.1mmk.com/img/comLogo/${item.imgUrl}" alt="${item.name}"><div class="comMeta"><h2>${item.name}</h2><div class="comInfo"><span>作者：${item.author}</span></div><p>${item.des}</p></div>`
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
                        putCom.id = 'C-' + ++nowMinId
                        putCom.x = e.pageX - bgInfo.left - (item.width / 2)
                        putCom.y = e.pageY - bgInfo.top - 15
                        putCom.width = item.width
                        putCom.height = item.height
                        return true
                    }
                })
                comArr.coms.push(putCom)
                playUp(putCom, 'coms', true)
                let allMoveBox = boxMain.querySelectorAll('.moveBox')
                nowOper = allMoveBox[allMoveBox.length - 1]
                nowOper.style.zIndex = '998'
                coverBox.style.display = "block"
                isAddCom = true
                closeModel()
                boxMain.onmousemove = (ev) => {
                    nowOper.style.left = ev.pageX - bgInfo.left - (nowOper.offsetWidth / 2) + 'px'
                    nowOper.style.top = ev.pageY - bgInfo.top + scollTop - 15 + 'px'
                    // 位置调整
                    if (nowOper.offsetLeft <= 0) nowOper.style.left = '0'
                    if (nowOper.offsetTop <= 0) nowOper.style.top = '0'
                    if (nowOper.offsetLeft >= (bgInfo.width - nowOper.offsetWidth)) nowOper.style.left = bgInfo.width - nowOper.offsetWidth + 'px'
                    if (nowOper.offsetTop >= (bgInfo.height - nowOper.offsetHeight)) nowOper.style.top = bgInfo.height - nowOper.offsetHeight + 'px'
                }
            }
        }
    }
}
// 背景
let nowSelUrl = null
const changeBgFun = () => {
    showModel('mainBg')
    let nowSelBg = null;
    const bgContent = document.querySelector('#mainBg > section > .bgList')
    bgContent.innerHTML = ""
    fetch('https://api.1mmk.com/getBg', {}).then(value => { return value.json() }).then(data => {
        data.forEach(item => { bgContent.innerHTML += ` <img src="./img/ku/${item}" alt="${item}"/> `; })
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
}
const changeBgYes = () => {
    if (!nowSelUrl) return fyNotice("请选择一张图片")
    closeModel()
    document.body.style.background = `url(${nowSelUrl}) 0% 0% / cover no-repeat fixed`
    comArr.bgSrc = nowSelUrl
    localLayout(comArr)
}
// 网址集（获取的网址集名字不能相同）
let urlsListData = null
let lastSelDom = null
const showAllUrlsFun = () => {
    let content = document.querySelector('#allUrls > section')
    content.innerHTML = ""
    showModel('allUrls')
    fetch('https://lipangza.github.io/initial/2/links/index.json', { method: 'get' }).then(value => value.json()).then(data => {
        urlsListData = data
        urlsListData.forEach(item => {
            content.innerHTML += `<a href="javascript:;" class="boxUrl" onclick="selThisUrls(this)"><img src="./img/linkIco/dir.png"><span>${item.name}</span></a>`
        })
    }).catch(err => {
        content.innerHTML = err
    })
}
const selThisUrls = (dom) => {
    if (lastSelDom) lastSelDom.style.background = 'none'
    dom.style.background = '#ccc'
    lastSelDom = dom
}
const selUrlsYes = () => {
    if (!lastSelDom) return fyNotice('请选择一个网址集~');
    let findUrls = null
    urlsListData.some(item => { if (item.name == lastSelDom.querySelector('span').innerHTML) return findUrls = item })
    // 设置ID
    findUrls.id = 'L-' + ++nowMinId
    findUrls?.chid.forEach(item => {
        item.id = 'L-' + ++nowMinId
    })
    // 找到空位
    const nullPos = getNullGrid()
    findUrls.x = nullPos.x
    findUrls.y = nullPos.y
    // 渲染
    comArr.boxUrls.push(findUrls)
    playUp(findUrls, 'boxUrls', true)
    localLayout(comArr);
    closeModel()
}
// 恢复默认布局
const defaultLayout = () => {
    if (confirm('这将清除您的所有数据无法恢复,确认恢复默认布局吗？')) return clearLocal()
}
// 分享活动
const copyShareLink = () => {
    navigator.clipboard.writeText('发现一款桌面式浏览器起始页插件，把我自制的布局分享给你用！网站地址：www.1mmk.com').then(() => {
        fyNotice('已复制链接到粘贴板！')
    });
}
// user
const regLog = (type) => {
    fyNotice('暂未开放')
    const rePass = document.querySelectorAll('.rePass')
    const allInput = document.querySelectorAll('.userBox input');
    const accountValue = allInput[0]
    const passwordVlaue = allInput[1]
    const rePassValue = allInput[2]
    if (type == '注册') {
        rePass[0].style.display = 'block'
        rePass[1].style.display = 'block'
    } else if (type == '登录') {
        rePass[0].style.display = 'none'
        rePass[1].style.display = 'none'
    }
}