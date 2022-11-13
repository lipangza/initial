const boxMain = document.querySelector('.boxMain');
const urlsModel = document.querySelector('#urlsModel');
let nowMinId = 0;
let lastUrls = null;
// 初始化
const body = document.body
let comArr = [];
const initLayout = () => {
    const layoutData = JSON.parse(localStorage.getItem('layoutData'))
    if (layoutData) {
        // 老用户
        if (layoutData.version != components.version) return clearLocal()
        comArr = layoutData;
    } else {
        // 新用户
        comArr = components
    }
    // 载入最大id
    if (comArr.nowMinId) nowMinId = comArr.nowMinId
    // 背景
    if (comArr.bgSrc) {
        body.style.background = `url(${comArr.bgSrc}) 0% 0% / cover no-repeat fixed`
    } else {
        body.style.background = '#35363A'
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
    // 载入推荐
    getItemById('L-1').chid = components.ad
    getItemById('L-1').disabled = true
}
// 获取dom到各个父边距信息
class GetPos {
    constructor(dom) {
        this.width = dom.offsetWidth
        this.height = dom.offsetHeight
        this.top = dom.offsetTop
        this.left = dom.offsetLeft
        this.bottom = boxMain.offsetHeight - this.height - dom.offsetTop
        this.right = boxMain.offsetWidth - dom.offsetLeft - this.width
        this.topHeight = this.top + this.height
        this.leftWidth = this.left + this.width
        this.bottomHeight = this.bottom + this.height
        this.rightWidth = this.right + this.width
    }
}
// 渲染
function playUp(item, type, ani) {
    let moveBox = null
    switch (type) {
        case 'boxUrls':
            moveBox = document.createElement('a');
            moveBox.href = item.url
            if (item.name.length > 6) moveBox.title = item.name
            moveBox.className = 'moveBox boxUrl'
            moveBox.style.left = item.x + 'px';
            moveBox.style.top = item.y + 'px';
            moveBox.setAttribute('comId', item.id)
            if (item.url != 'javascript:;') moveBox.target = '_blank'
            moveBox.innerHTML = `<img src="${item.icoUrl}" /><span>${item.name}</span>`
            if (ani) moveBox.style.animation = 'readyPage .8s'
            boxMain.appendChild(moveBox)
            break;
        case 'coms':
            moveBox = document.createElement('div');
            moveBox.className = 'moveBox'
            moveBox.style.left = item.x + 'px';
            moveBox.style.top = item.y + 'px';
            moveBox.setAttribute('comId', item.id)
            moveBox.innerHTML = `<div class="moveBar"><span>${item.name}</span></div><iframe width="${item.width}" height="${item.height}" src="${item.url}" allowTransparency="true" frameBorder="0" scrolling="no"></iframe>`
            if (ani) moveBox.style.animation = 'readyPage .8s'
            boxMain.appendChild(moveBox)
            break;
        case 'urls':
            moveBox = document.createElement('a');
            moveBox.href = item.url
            moveBox.target = '_blank'
            moveBox.className = 'moveBox fileItem'
            moveBox.setAttribute('comId', item.id)
            moveBox.innerHTML = `<img src="${item.icoUrl}" /><span>${item.name}</span>`
            if (ani) moveBox.style.animation = 'readyPage .8s'
            urlsModel.querySelector('div').appendChild(moveBox)
            break;
        default:
            break;
    }
}
// 清除缓存
function clearLocal() {
    localStorage.clear()
    window.location.reload()
}
// id找对象拷贝res
const getItemById = (comId, level2) => {
    const comType = comId.substring(0, 1)
    let res = null
    if (level2 == true) {
        // 网址集内的
        comArr.boxUrls.some(item => {
            if (!(item.chid instanceof Array && item.chid.length > 0)) return
            if (item.chid.some(i => { if (i.id == comId) return res = i })) return 1
        })
    } else {
        // 普通的
        if (comType == 'L') comArr.boxUrls.some(item => { if (item.id == comId) return res = item })
        if (comType == 'C') comArr.coms.some(item => { if (item.id == comId) return res = item })
    }
    return res
}
// 开始初始化
initLayout();
// 子容器超出父容器就调整
function divOverflow(son, fa) {
    const sonOff = new GetPos(son)
    const faOff = new GetPos(fa)
    if ((sonOff.left + sonOff.width) > faOff.width) son.style.left = faOff.width - sonOff.width + 'px'
    if ((sonOff.top + sonOff.height) > faOff.height) son.style.top = faOff.height - sonOff.height + 'px'
}
// 消息提示
const fyNotice = (info) => {
    const noticeBox = document.createElement('div')
    noticeBox.className = "noticeBox"
    noticeBox.innerHTML = `<img src='./img/index/notice.png' /><span>${info}</span>`
    document.body.appendChild(noticeBox)
    setTimeout(() => {
        document.body.removeChild(noticeBox)
    }, 4000)
}
// 修改存储
function localLayout(comArr) {
    comArr.nowMinId = nowMinId
    // console.log(comArr)
    localStorage.setItem('layoutData', JSON.stringify(comArr))
}
// 碰撞检测
function isCollision(operDom, testDom) {
    if (operDom == testDom) return
    const dom1Des = new GetPos(operDom)
    const dom2Des = new GetPos(testDom)
    // 设置偏移量
    if (dom1Des.topHeight <= (dom2Des.top + 40) || dom1Des.top >= (dom2Des.topHeight - 40) || dom1Des.leftWidth <= (dom2Des.left + 40) || dom1Des.left >= (dom2Des.leftWidth - 40)) {
        return false
    } else {
        return true
    }
}
// 删除组件存储的数据
const delCom = (dom) => {
    if (!dom) return
    if (getItemById(dom.getAttribute('comId'))?.disabled) return fyNotice('此网址集不可操作!')
    dom.style.animation = 'readyPageRet .2s'
    if (dom?.parentNode?.getAttribute('domType') == 'urlsContainer') {
        // 删除子网址
        const fItem = getItemById(lastUrls.getAttribute('comId'))
        fItem?.chid.forEach((item, index) => {
            if (item.id == dom.getAttribute('comId')) {
                setTimeout(() => {
                    urlsModel.querySelector('div').removeChild(dom)
                }, 100)
                fItem.chid.splice(index, 1)
            }
        })
    } else {
        // 普通删除
        const comId = dom.getAttribute('comId')
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
        setTimeout(() => {
            boxMain.removeChild(dom)
        }, 100)
    }
    nowOper = null
    localLayout(comArr);
}
// 模态框
const bodyCover = document.getElementById('bodyCover'); // 遮盖
let thisModel = null
const showModel = (domId) => {
    thisModel = document.getElementById(domId);
    bodyCover.style.display = "block"
    thisModel.style.animation = "fromTop .3s"
    thisModel.style.display = "block"
    document.body.style.overflowY = "hidden"
}
const closeModel = () => {
    if (!thisModel) return
    document.body.style.overflowY = "auto"
    if (urlsModel.style.display != 'block') bodyCover.style.display = "none"
    thisModel.style.animation = "fromTopRet .3s"
    setTimeout(() => {
        thisModel.style.display = "none"
        thisModel = null
    }, 200)
}
// 初始化网格
let bgInfo = null
let gridArr = null
let gridInfo = null
const initGrid = () => {
    bgInfo = new GetPos(boxMain)
    gridArr = []
    gridInfo = {
        row: parseInt(bgInfo.width / 80),
        col: parseInt(bgInfo.height / 80)
    }
    for (let i = 0; i < gridInfo.col; i++) {
        for (let j = 0; j < gridInfo.row; j++) {
            gridArr.push({
                x: j * 80,
                y: i * 80
            })
        }
    }
}
initGrid()
// 找到空位
const getNullGrid = () => {
    let allUrls = document.querySelectorAll('.boxUrl')
    let findPos = null
    gridArr.some(item => {
        let beFind = true
        for (let i = 0; i < allUrls.length; i++) {
            if (item.x == allUrls[i].offsetLeft && item.y == allUrls[i].offsetTop) return beFind = false
        }
        if (beFind) return findPos = item
    })
    if (findPos) return findPos
    fyNotice('恐怖!')
}