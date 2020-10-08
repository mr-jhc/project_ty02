// 入口函数
$(function () {
    // 点击注册账号，隐藏登录区域，显示注册区域
    $("#link_reg").on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 点击去登陆，隐藏注册区域，显示登录区域
    $("#link_login").on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    });

    // 自定义验证规则
    var form = layui.form;
    form.verity({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val()
            if (value !== pwd) {
                return "两次密码不一样"
            }
        }
    });
    // 注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name-username]").val(),
                password: $(".reg-box [name-password]").val()
            },
            success: function (res) {
                // 返回状态判断
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提交成功处理代码
                layer.msg(res.message);
                // 手动切换表单
                $('#link_login').click()
                // 重置表单
                $("#form_reg")[0].reset();

            }
        })
    });
    // 登陆功能
    $("#form_login").submit(function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // 校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示信息，保存token，跳转界面
                layer.msg("恭喜您，登陆成功")
                // 保存token，未来的接口使用token
                localStorage.setItem("token", res.token);
                // 跳转
                location.href = "/index.html"

            }
        })
    })

})