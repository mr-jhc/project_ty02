$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击上传，绑定file上传框，手动点击
    // 弹出文件筐选择文件
    $("#btnChooseImage").on('click', function () {
        $("#file").click();
    });

    // 4.2.3更换裁剪区的图片
    // 1.拿到用户的文件夹
    var layer = layui.layer;
    $('#file').on('change', function (e) {
        // console.log(e);
        // 通过e.target.files获取用户选择的文件列表
        var fileList = e.target.files;
        // 通过索引0获取文件
        if (fileList.length === 0) {
            return layer.msg('请选择图片!')
        }
        // 拿到用户选择的文件
        var file = e.target.files[0];
        // 将文件转化文路径
        var imgURL = URL.createObjectURL(file)
        // 重新初始化裁剪区
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    });


    // 获取用户信息成功，将头像上传到服务器
    // 给  确定 按钮绑定事件
    $("#btnUpload").on('click', function () {
        // 1.先获取裁剪后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2.发起ajax请求，将图片传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar:dataURL
            },
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，头像更换成功！')
                // 将index.html 页面上的头像也变化
                window.parent.getUserInfo();
            }
        })
    })
})