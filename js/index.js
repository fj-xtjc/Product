/*
*date:2016-2-22
*/
$(document).ready(function() {
	$("button[name='btn_turnLogin']").click(function () {
		$("#index_acount_select").addClass("hidden");
		$("#index_acount_login").removeClass("hidden");
	});
	$("button[name='btn_turnRegister']").click(function () {
		$("#index_acount_select").addClass("hidden");
		$("#index_acount_register").removeClass("hidden");
	});
	$("button[name='btn_back']").click(function () {
		$("#index_acount_select").removeClass("hidden");
		$("#index_acount_login").addClass("hidden");
		$("#index_acount_register").addClass("hidden");
	});
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
				url: "http://10.206.106.27/BridgeCount/Register/playerlogin.do",
				data: {
					Lusername: $("input[name='Lusername']").val(),
					Lpassword: $("input[name='Lpassword']").val()
				},
				dataType: "jsonp",
				jsonp: "callbackparam",
				jsonpCallback: "movieking",
				success: function (result) {
					if (result.result == "success") {
						alert("登录成功");
						if ($("input[name='_checkbox']").attr("checked") == true) {
							$.setCookie("username", $("input[name='Lusername']").val());
							$.setCookie("password", $("input[name='Lpassword']").val());
							$.setCookie("checkbox_status", "checked");
						}
						location.href = "newGame.html?";
					}
					else if(result.result=="wrong username or password"){
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
	$("button[name='btn_register']").click(function () {
		if ($("input[name='playername']").val() != "" & $("input[name='username']").val() != "" & $("input[name='password']").val() != "") {
			$.ajax({
				type: "get",
				async: false,
				data: {
					playername: $("input[name='playername']").val(),
					username: $("input[name='username']").val(),
					password: $("input[name='password']").val()
				},
				url: "http://10.206.106.27/BridgeCount/Register/newplayer.do",
				dataType: "jsonp",
				jsonp: "callbackparam",
				jsonpCallback: "movieking",
				success: function (result) {
					if (result.result == "success") {
						alert("玩家创建成功");
						location.href = "index.html?";
					}
					else if (result.result == "username exist")
						alert("玩家已经存在");
					else {
						alert("玩家创建失败");
					}
				},
				error: function () {
					alert("失败");
				}
			});
		}
		else {
			alert("信息输入不完整");
		}
	});
});
