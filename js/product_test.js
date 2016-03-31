/**
 * Created by lenovo on 2016/3/28.
 */
function products_btn_html(result,i){
    $("<div>").addClass("col-md-4 col-sm-6 col-xs-12").html(
        '<button type="button" class="btn btn-default  btn-block btn-md btn_div" name="'+result[0]["app"][i]+'"data-appInfo="'+result[1][result[0]["app"][i]].app_name+'"> ' +
        '<div class="col-md-4 col-sm-4 col-xs-4"> ' +
        '<img src="img/logo/'+result[1][result[0]["app"][i]].logo_url+'" class="app_Logo"> ' +
        '</div> ' +
        '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
        '<h3 class="strong">'+result[1][result[0]["app"][i]].app_name +'</h3> ' +
        '<p class="small">点击查看产品说明</p> ' +
        '</div> ' +
        '<div class="col-md-2 col-sm-2 col-xs-2"> ' +
        '<div class="row"> ' +
        '<span class="badge col-md-12 col-sm-12 col-xs-12">安卓</span> ' +
        '<span class="badge col-md-12 col-sm-12 col-xs-12">IOS</span> ' +
        '</div> ' +
        '</div> ' +
        '</button>').appendTo("#index_unicom");
}
$(document).ready(function(){

    //加载窗口变化方法
    $(window).resize();
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
        location.href = "product_test_info.html?page=" + $(this).attr('name')+"&userkey="+$.getUrlParam('userkey');
    });
});