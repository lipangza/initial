const boxMain = document.querySelector('.boxMain');
// 渲染
function playUp(item, type, ani) {
    if (type == 'boxUrls') {
        const moveBox = document.createElement('a');
        moveBox.href = item.url
        moveBox.className = 'moveBox boxUrl'
        moveBox.style.left = item.x + 'px';
        moveBox.style.top = item.y + 'px';
        moveBox.setAttribute('comId', item.id)
        moveBox.target = '_blank'
        moveBox.innerHTML = `<img src="${item.icoUrl}" /><span>${item.name}</span>`
        if (ani) moveBox.style.animation = 'readyPage 1s'
        boxMain.appendChild(moveBox)
    } else if (type == 'coms') {
        const moveBox = document.createElement('div');
        moveBox.className = 'moveBox'
        moveBox.style.position = 'absolute'
        moveBox.style.left = item.x + 'px';
        moveBox.style.top = item.y + 'px';
        moveBox.setAttribute('comId', item.id)
        moveBox.innerHTML = `<div class="moveBar">${item.name}</div><iframe width="${item.width}" height="${item.height}" src="${item.url}" allowTransparency="true" frameBorder="0" scrolling="no"></iframe>`
        if (ani) moveBox.style.animation = 'readyPage 1s'
        boxMain.appendChild(moveBox)
    }
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
// 子容器超出父容器就调整
function divOverflow(son, fa) {
    const sonOff = new GetPos(son)
    const faOff = new GetPos(fa)
    if ((sonOff.left + sonOff.width) > faOff.width) son.style.left = faOff.width - sonOff.width + 'px'
    if ((sonOff.top + sonOff.height) > faOff.height) son.style.top = faOff.height - sonOff.height + 'px'
}
// 清除缓存
function clearLocal() {
    localStorage.clear()
    window.location.reload()
}
// 消息提示
window.fyNotice = function (info) {
    const noticeBox = document.createElement('div')
    noticeBox.className = "noticeBox"
    noticeBox.innerHTML = info
    document.body.appendChild(noticeBox)
    setTimeout(() => {
        document.body.removeChild(noticeBox)
    }, 4000)
}
// 修改存储
function localLayout(comArr) {
    localStorage.setItem('layoutData', JSON.stringify(comArr))
}
// 生成唯一id
function createId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// 单元格碰撞检测
function isCollision(operDom, testDom) {
    if (operDom != testDom) {
        // 防止自己比自己
        const dom1Des = new GetPos(operDom)
        const dom2Des = new GetPos(testDom)
        // 设置偏移量
        if (dom1Des.topHeight <= (dom2Des.top + 30) || dom1Des.top >= (dom2Des.topHeight - 30) || dom1Des.leftWidth <= (dom2Des.left + 30) || dom1Des.left >= (dom2Des.leftWidth - 30)) {
            // 没有碰上
            return false
        } else {
            return true
        }
    }
}
// 公共模态框
const bodyCover = document.getElementById('bodyCover'); // 遮盖
const modelBtn = document.getElementsByClassName('modelBtn'); // 弹出按钮
let thisModel = null
for (let i = 0; i < modelBtn.length; i++) {
    modelBtn[i].onclick = function () {
        thisModel = document.getElementById(this.getAttribute('showModelId'));
        bodyCover.style.display = "block"
        thisModel.style.animation = "fromTop .3s"
        thisModel.style.display = "block"
        document.body.style.overflowY = "hidden"
    }
}
const closeModel = () => {
    document.body.style.overflowY = "auto"
    bodyCover.style.display = "none"
    thisModel.style.animation = "fromTopRet .3s"
    setTimeout(() => {
        thisModel.style.display = "none"
    }, 200)
}

const footNoti = () => {
    fyNotice('添加万能嵌入组件查看');
}