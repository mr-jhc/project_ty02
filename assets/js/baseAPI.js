// jQuery中提供了一个 过滤器，可以帮我们统一去进行设置，
// 而这个过滤器调用的时机是在我们调用 $.ajax() 之后，请求真正发给后台之前调用的： 
// $.ajax() > ajaxPrefilter过滤器 -> 发送请求给服务器
$.ajaxPrefilter(function (options) { 
    options.url = 'http://ajax.frontend.itheima.net'+options.url
})