// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
// console.log(jQuery)  测试（不提示错误就是成功）
// console.log($)

var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
//parse将字符串变成对象

var hashMap = xObject || [
//浏览器控制台，用parcel会加一个作用域，使得hashMap没有被定义。
//解决方式： window.hashMap = []
{ logo: 'A', url: 'https://acfun.cn' }, { logo: 'B', url: 'https://bilbili.com' }, { logo: 'G', url: 'https://google.com' }];
var simplifyUrl = function simplifyUrl(url) {
    //删除url里面的https://www.
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
    //正则表达式 表示删除以/开头的内容
};
var render = function render() {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach(function (node, index) {
        // console.log(index)
        //node节点  index参数
        var $li = $('<li> \n             <div class="site">\n                 <div class="logo">' + node.logo + '</div>\n                 <div class="link">' + simplifyUrl(node.url) + '</div>\n                 <div class=\'close\'>\n                    <svg class="icon">\n                        <use xlink:href="#icon-close"></use>\n                    </svg>\n                </div>\n             </div>\n     </li>').insertBefore($lastLi);
        $li.on('click', function () {
            window.open(node.url); //打开一个地址为url的新页面，代替a标签
        });
        $li.on('click', '.close', function (e) {
            // console.log('这里')
            e.stopPropagation(); //阻止冒泡
            hashMap.splice(index, 1); //删除索引为index的元素
            render(); //重新渲染一次
        });
    });
};

render();

$('.addButton').on('click', function () {
    var url = window.prompt('请问你要添加的网址是');
    if (!url) {
        alert('请输入网址');
        return null;
    } else if (url.indexOf('http') !== 0) {
        //indexOf返回数组中指定字符出现的次数
        //判断url是否含有http
        url = 'https://' + url;
    }
    hashMap.push({
        logo: simplifyUrl(url)[0],
        url: url
    });
    render();
});

window.onbeforeunload = function () {
    var string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
    //在本地设置一个变量x存的就是string
};
$(document).on('keypress', function (e) {
    console.log(e.key);
    // const key = e.key
    var key = e.key; //上面语句的另一种写法

    for (var i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        }
    }
});
// document.addEventListener()
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.7a861112.map