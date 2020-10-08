// jQuery中提供了一个 过滤器，可以帮我们统一去进行设置，
// 而这个过滤器调用的时机是在我们调用 $.ajax() 之后，请求真正发给后台之前调用的： 
// $.ajax() > ajaxPrefilter过滤器 -> 发送请求给服务器
$.ajaxPrefilter(function (options) { 
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) { 
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 回调函数
    options.complete = function (res) { 
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') { 
            // 强制清空 token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})

