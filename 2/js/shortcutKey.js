// 快捷键
let lastKey = null
window.addEventListener('keydown', (e) => {

    if ((lastKey == 'Control' && e.key == 's') || lastKey == 's' && e.key == 'Control') {
        e.preventDefault()
        document.querySelector('.addWebsiteKey').click();
    }
    lastKey = e.key
})
window.addEventListener('keyup', () => {
    lastKey = null
})