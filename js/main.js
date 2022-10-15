// 拖拽
const whiRightBtn = document.querySelector('.whiRightBtn') // 空白处右键
let scollTop = null;
let nowOper = null;
const moveBeforePos = { x: null, y: null }
let coverBox = document.getElementById('coverBox')
// 委托
boxMain.addEventListener('mousedown', (e) => {
    // 找到需要操作的dom
    e.composedPath().some(item => {
        if (item.className && item.className.includes('moveBox') || item.className && item.className.includes('moveUrls')) {
            nowOper = item
            return true
        } else {
            nowOper = null
        }
    })
    if (!nowOper || e.button != 0 || nowOper.parentNode.getAttribute('domType') == 'urlsContainer') return
    bgInfo = new GetPos(boxMain);
    moveBeforePos.x = nowOper.offsetLeft
    moveBeforePos.y = nowOper.offsetTop
    scollTop = body.scrollTop
    nowOper.style.zIndex = '998'
    isAddCom = false
    boxMain.onmousemove = (ev) => {
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
document.addEventListener('mouseup', (e) => {
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
    // 弹出网址集
    if (e.target.tagName == 'BODY') return nowOper = null
    if (!nowOper || e.button == 2) return
    if (nowOper.href && nowOper.href == 'javascript:;' && moveBeforePos.x == nowOper.offsetLeft && moveBeforePos.y == nowOper.offsetTop) {
        bodyCover.style.display = 'block'
        urlsModel.style.display = 'block'
        urlsModel.style.animation = 'urls .3s'
        urlsModel.querySelector('div').innerHTML = ''
        getItemById(nowOper.getAttribute('comId')).chid?.forEach(item => { playUp(item, 'urls') })
    }
})
// 空白处右键
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (thisModel) return
    if (nowOper && nowOper.getAttribute('comId') == 'L-1') {
        return fyNotice('此网址集不可操作')
    }
    const delBtn = whiRightBtn.querySelector('div')
    const reNBtn = whiRightBtn.querySelector('div:nth-child(2)')
    reNBtn.style.display = 'none'
    delBtn.style.display = 'none'
    if (nowOper) {
        delBtn.style.display = 'block'
        if (nowOper?.href == 'javascript:;') {
            reNBtn.style.display = 'block'
        }
    }
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
// 右键删除
const delThis = () => {
    delCom(nowOper)
}
// 自动寻找最近的空位并存储
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
        if(dom.parentNode.getAttribute('domType')=='urlsContainer') return
        // 有一方是组件，或者正在操作的是网址集就退出
        if (dom.getAttribute('comId').substring(0, 1) == 'C' || overlap.getAttribute('comId').substring(0, 1) == 'C' || (dom.getAttribute('href') && dom.getAttribute('href') == 'javascript:;')) return resPos()
        // 正在操作的是网址，目标是网址集就放入
        if (overlap.getAttribute('comId') == 'L-1') {
            fyNotice('此网址集不可操作');
            resPos();
            return
        }
        if (overlap.href && overlap.href == 'javascript:;') {
            const putDom=getItemById(dom.getAttribute('comId'))
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
// 将正在操作的网址放回原位
const resPos = () => {
    nowOper.style.left = moveBeforePos.x + 'px'
    nowOper.style.top = moveBeforePos.y + 'px'
}
window.addEventListener('load', () => {
    // 重命名
    document.querySelector('#reNameBtn').addEventListener('click', () => {
        const reNameValue = document.querySelector('#reNameValue')
        if (reNameValue.value.length < 1) return fyNotice('名字不能为空~')
        const operDomId = lastUrls.getAttribute('comId')
        getItemById(operDomId).name = reNameValue.value
        boxMain.removeChild(lastUrls)
        playUp(getItemById(operDomId), 'boxUrls')
        localLayout(comArr)
        reNameValue.value = ''
        closeModel()
    })
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
                id: 'L-' + ++nowMinId,
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
                nowOper = document.querySelector('.moveBox:last-child')
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

    // 背景更换
    const bgBtn = document.getElementById('bgBtn')
    let nowSelBg = null;
    let nowSelUrl = null
    bgBtn.addEventListener('click', () => {
        const bgContent = document.querySelector('#mainBg > section > .bgList')
        bgContent.innerHTML = ""
        fetch('https://api.1mmk.com/getBg', {
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
// 切换布局冗余代码
const layList = document.querySelector('.layList')
document.getElementById('layBtn').addEventListener('click', () => {
    // 暂时写死
    layList.innerHTML = `
        <div class="layItem">
            <img src="./layout/img/official1.jpg" alt="">
            <div>
                <h3>默认</h3>
                <p>添加了一些常用网站，和一个万能嵌入组件。</p>
                <div class="layMeta">
                    <div>推荐,官方,2022/9/19</div>
                    <div>id:PmTRBh8nCiGB8AU</div>
                    <button file-name="official1" class="fyBtn fyBtnFix">确定使用</button>
                </div>
            </div>
        </div>
        <div class="layItem">
            <img src="./layout/img/official3.jpg" alt="">
            <div>
                <h3>简约</h3>
                <p>仅显示一些常用网站。</p>
                <div class="layMeta">
                    <div>推荐,官方,2022/9/19</div>
                    <div>id:tmsrtgssSERFffc</div>
                    <button file-name="official3" class="fyBtn fyBtnFix">确定使用</button>
                </div>
            </div>
        </div>
        <div>敬请期待...</div>
    `
})
layList.addEventListener('click', (e) => {
    const fileName = e.target.getAttribute('file-name')
    if (fileName) {
        fetch(`../layout/layouts/${fileName}.json`, { method: 'get' }).then(value => {
            return value.text()
        }).then(value => {
            comArr = JSON.parse(value)
            localLayout(comArr);
            window.location.reload()
        })
    }
})
