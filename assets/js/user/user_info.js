$(function() {
  var form = layui.form;
  var layer = layui.layer;
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })
  
  // 调用初始化
  initUserInfo();
  // 初始化基本信息
  function initUserInfo() { 
    // 发送ajax请求
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) { 
        // console.log(res);
        if (res.status !== 0) { 
          return layer.msg(res.message)
        }
        form.val('formUserInfo',res.data)
      }
    })
  }

  // 重置表单事件
  $("#btnReset").on('click', function (e) { 
    // 阻止表单默认重置行为
    e.preventDefault();
    initUserInfo();
  })

  //发起更新用户的请求
  $('.layui-form').on('submit', function (e) { 
    // 阻止表单默认提交
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) { 
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        layer.msg('修改成功！');

        // 调用父页面中的方法重新渲染用户头像和信息
        window.parent.getUserInfo();
      }
    })
  })
  })