/*
*date:2016-2-22
*/
function products_btn_html(result,i){
	$("<div>").addClass("col-md-4 col-sm-6 col-xs-12").html(
	'<button type="button" class="btn btn-default  btn-block btn-md btn_div" name="'+result[0]["app"][i]+'"data-appInfo="'+result[1][result[0]["app"][i]].app_name+'"> ' +
		'<div class="col-md-4 col-sm-4 col-xs-4"> ' +
			'<img src="img/logo/'+result[1][result[0]["app"][i]].logo_url+'" class="app_Logo"> ' + 
		'</div> ' +
		'<div class="col-md-6 col-sm-6 col-xs-6"> ' +
			'<h3 class="strong">'+result[1][result[0]["app"][i]].app_name +'</h3> ' +
			'<p class="small">产品即将上线，敬请期待</p> ' +
		'</div> ' +
		'<div class="col-md-2 col-sm-2 col-xs-2"> ' +
			'<div class="row"> ' +
				'<span class="badge col-md-12 col-sm-12 col-xs-12">安卓</span> ' +
				'<span class="badge col-md-12 col-sm-12 col-xs-12">IOS</span> ' +
			'</div> ' +
		'</div> ' +
	'</button>').appendTo("#index_unicom");
}
function count_action(t_font,i){
	var flag  =0;
	for (var k = 0; k < i; k++) {
		flag += 300 * t_font[k].length;
	};
	flag += i * 1500;
	return flag;
}
function font_action(t_font,i,fg_X,fg_Y,font_size){
	var font_action_value = setTimeout(function(){
		//清空
		$("#fg").html("");
		//插入
		for (var j = 0; j < t_font[i].length; j++) {
			$("<span>").attr("fg_"+j,"").hide().html(t_font[i][j]).appendTo("#fg");
		};
		//确定宽度
		$(".marquee").css("width",(font_size + 5) * t_font[i].length);
		//出现
		for (var j = 0; j < t_font[i].length; j++) {
			$("span[fg_"+j+"]").delay(300*j).fadeIn(300);
		};
		//消失
		for (var j = 0; j < t_font[i].length; j++) {
			$("span[fg_"+j+"]").delay(300*(t_font[i].length-j+2)).fadeOut(300);
		};
	},count_action(t_font,i));
}

$(document).ready(function(){

	//自适应参数
	var font_size,fg_X,fg_Y,bg_width,bg_height;
	//文字特效参数
	var t_font = ["全方位的解决方案提供能力","随客户的发展而发展"];

	$(window).resize(function() {
		bg_width = $(window).width();
		bg_height = bg_width*0.5;
		if (bg_height >= $(window).height() - 80) {
			bg_height = $(window).height() - 80;
			fg_X = bg_width * 0.1;
			fg_Y = bg_height * 0.4;
			
		} else {
			fg_X = bg_width * 0.09;
			fg_Y = bg_height * 0.3;
		};
		$(".bg_unicom_app").css("height",bg_height);

		//初始化字体大小
		font_size = bg_height * 0.08;
		$(".marquee span").css("font-size",font_size);
		//固定位置
		$(".marquee").css("left",fg_X).css("top",fg_Y);
	});
	//加载窗口变化方法
	$(window).resize();

	//加载文字动画
	for (var i = 0; i < t_font.length; i++) {
		font_action(t_font,i,fg_X,fg_Y,font_size);
	};
	var t_font_action = setInterval(function(){
		for (var i = 0; i < t_font.length; i++) {
			font_action(t_font,i,fg_X,fg_Y,font_size);
		};
	}, count_action(t_font,t_font.length));

	$("#index_unicom").html("");
	$.ajax({
		type:"get",
		url:"js/production.json",
		async:false,
		dateType:"json",
		success:function(result){
			for (var i = 0; i < result[0]["app"].length; i++) {
				products_btn_html(result,i);
			};
		},
		error:function(){
			//alert("加载失败!");
		}
	});

	$("button[data-appInfo]").click(function() {
		location.href = "unicom_app_info.html?page=" + $(this).attr('name');
	});
});