// console.log(jQuery)  测试（不提示错误就是成功）
// console.log($)

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
//parse将字符串变成对象

const hashMap = xObject || [
    //浏览器控制台，用parcel会加一个作用域，使得hashMap没有被定义。
    //解决方式： window.hashMap = []
    { logo: 'W', url: 'https://webjike.com/web.html#row-1' },
    { logo: 'A', url: 'http://www.alloyteam.com/nav' },
    { logo: 'H', url: 'https://www.htmltrip.com' },
]
const simplifyUrl = (url) => {//删除url里面的https://www.
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
    //正则表达式 表示删除以/开头的内容
}
const render = () => {
    $siteList.find(`li:not(.last)`).remove()
    hashMap.forEach((node, index) => {
        // console.log(index)
        //node节点  index参数
        const $li = $(`<li> 
             <div class="site">
                 <div class="logo">${node.logo}</div>
                 <div class="link">${simplifyUrl(node.url)}</div>
                 <div class='close'>
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
             </div>
     </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)//打开一个地址为url的新页面，代替a标签
        })
        $li.on('click', '.close', (e) => {
            // console.log('这里')
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1) //删除索引为index的元素
            render() //重新渲染一次
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是')
        if (!url) {
            alert('请输入网址')
            return null
        } else if (url.indexOf('http') !== 0) {
            //indexOf返回数组中指定字符出现的次数
            //判断url是否含有http
            url = `https://` + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        })
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
    //在本地设置一个变量x存的就是string
}
// 键盘快捷键，按下对应logo的字母自动跳转到相应的页面
$(document).on('keypress', (e) => {
    console.log(e.key)
    // const key = e.key
    const { key } = e  //上面语句的另一种写法
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
// document.addEventListener()