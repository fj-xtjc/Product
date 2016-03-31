/**
 * Created by Administrator on 2016/3/30.
 */
$(document).ready(function() {

    $('input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris',
        increaseArea: '-10' // optional
    });

    function CheckCookie() {
        if ($.getCookie("checkbox_status") == "checked") {
            $("input[name='Lusername']").val($.getCookie("username"));
            $("input[name='Lpassword']").val($.getCookie("password"));
            $('input').iCheck('check');
        }
    }
    window.onload = CheckCookie();
    $("button[name='btn_login']").click(function () {
        if ($("input[name='Lusername']").val() != "" & $("input[name='Lpassword']").val() != "") {
            $.ajax({
                type: "get",
                async: false,
                url: "http://10.206.106.27/User/usermanager/login.do",
                data: {
                    appid:1,
                    username: $("input[name='Lusername']").val(),
                    userpassword: $("input[name='Lpassword']").val()
                },
                dataType: "jsonp",
                jsonp: "callbackparam",
                jsonpCallback: "movieking",
                success: function (result) {
                    if (result.result != "null") {
                        alert("登录成功");
                        if ($("input[name='_checkbox']").attr("checked") == true) {
                            $.setCookie("username", $("input[name='Lusername']").val());
                            $.setCookie("password", $("input[name='Lpassword']").val());
                            $.setCookie("checkbox_status", "checked");
                        }
                        location.href = "product_test.html?userkey="+result.result.userkey;
                    }
                    else if(result.result=="null"){
                        alert("用户名或密码错误");
                    }
                    else{
                        alert("登录失败");
                    }
                },
                error: function () {
                    alert("失败");
                }
            });
        }
        else
        {
            alert("信息填写不完整");
        }
    });
});