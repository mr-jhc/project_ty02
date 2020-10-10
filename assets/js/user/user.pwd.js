// 入口函数
$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        samePwd: function (value) {
            if (value === $('[name = oldPwd]').val()) {
                return '旧密码和新密码不能一致'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return "两次新密码输入不一致"
            }
        }
    });

    // 给表单绑定submit事件，取消默认事件
    // 发起请求实现重之密码的功能   
    $(".layui-form").on('submit', function (e) {
        // 取消保单默认提交事件
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您，密码更换成功！")
                //原生js 重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})