/*
*date:2016-2-22
*/
$(document).ready(function(){
	$("button[name='btn_newGame']").click(function(){
		if($("input[name='matchname']").val()!=""&$("input[name='matchteam']").val()!=""&$("input[name='cardsnum']").val()!=""
			&$("input[name='matchtime']").val()!="") {
			if ($("input[name='matchteam']").val() % 2 != 0) {
				alert("队伍数请填偶数");
			}
			else {
				$.ajax({
					type: "get",
					async: false,
					data: {
						matchname: $("input[name='matchname']").val(),
						matchteam: $("input[name='matchteam']").val(),
						cardsnum: $("input[name='cardsnum']").val(),
						matchtime: $("input[name='matchtime']").val()
					},
					url: "http://10.206.106.27/BridgeCount/NewGame/addmatch.do",
					dataType: "jsonp",
					jsonp: "callbackparam",
					jsonpCallback: "movieking",
					success: function (result) {
						if (result.result == "success") {
							alert("比赛创建成功");
							location.href = "grouping.html?matchid="+result.matchid+"&teamnum="+$("input[name='matchteam']").val();
							//alert(result.matchid);
						}
						else {
							alert("比赛创建失败");
						}
					},
					error: function () {
						alert("失败");
					}
				});
			}
		}
		else{
			alert("信息输入不完整");
		}
	});

	$("button[name='btn_newGameClean']").click(function(){
		//重置所有控件
		$("input[name='matchname']").val("");
		$("input[name='matchteam']").val("");
		$("input[name='cardsnum']").val("");
		$("input[name='matchtime']").val("");
	});
});