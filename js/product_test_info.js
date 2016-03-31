/**
 * Created by lenovo on 2016/3/28.
 */
//生成产品页面方法
function Product_Html(product_name,userkey){
    $.ajax({
        type:"get",
        url:"js/production.json",
        async:false,
        dateType:"json",
        success:function(production){
            $("title").html(production[1][product_name].app_name);
            $("#info_title").html("");
            $("#info_title").append('<h1 class="no-top-margin">'+production[1][product_name].app_name+'</h1>');
            for(var i= 0;i<production[1][product_name].tag.length;i++) {
                $('<span>').addClass("badge").addClass("bg_badge"+i%5).text(production[1][product_name].tag[i]).appendTo("#info_title");
            }
            $("#info_logo").children("img").attr("src","img/logo/"+production[1][product_name].logo_url);
            $("#info_description").html('<div class="Style_info_description">'+production[1][product_name].describtion+ '</div>');
            $("#info_QR").html("");
            for(var i=0;i<production[1][product_name].install_url.length;i++) {
                if (production[1][product_name].install_url[i]!="") {
                    if(i==0) {
                        $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].install_url[i]).html("ios客户端下载").appendTo("#info_QR");
                    }
                    else {
                        $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].install_url[i]).html("android客户端下载").appendTo("#info_QR");
                    }
                        $('<img>').addClass("img-rounded QR_Code").attr("src", "img/QR_Code/" + production[1][product_name].QR_url[i]).appendTo("#info_QR");
                        $("#info_QR").append('<br/>');
                }
            }
            $("#carousel_ol").html("");
            $("#carousel_img").html("");
            for(var i= 0,j=1;i<production[1][product_name].fuction_png_url;i++,j++){
                if(i==0) {
                    $('<li>').addClass("active").attr("data-target","#app_info_Carousel").attr("data-slide-to",i).appendTo("#carousel_ol");
                    $('<div>').addClass("item active").appendTo("#carousel_img").append('<img src="img/product_pic/'+product_name+'_Pic'+ j +'.png">');
                }
                else{
                    $('<li>').attr("data-target","#app_info_Carousel").attr("data-slide-to",i).appendTo("#carousel_ol");
                    $('<div>').addClass("item").appendTo("#carousel_img").append('<img src="img/product_pic/'+product_name+'_Pic'+ j +'.png">');
                }
            }
            $("#info_description").append('<div class="Style_info_description" id="download"></div>');
            $("#download").append('<strong>用户测试地址：</strong>')
            if(production[1][product_name].user_pc_url.login!="") {
                    $('<a>').attr("href", production[1][product_name].user_pc_url.login).attr("target","_blank").html(production[1][product_name].user_pc_url.login).appendTo("#download");
                    $("#download").append('<br/>');
                }
            $("#download").append('<strong>测试帐号：'+production[1][product_name].user_pc_url.username+'</strong><br/>'
                +'<strong>测试密码：'+production[1][product_name].user_pc_url.password+'</strong><br/>');
            if(product_name=="XSZL"){
                $("#download").append('<strong>企业前台id：'+production[1][product_name].user_pc_url.id+'</strong><br/>');
            }
            if(userkey=="1") {
                $("#download").append('<br/><strong>联通管理后台地址：</strong>')
                if (production[1][product_name].product_admin_url.login != "") {
                    $('<a>').attr("href", production[1][product_name].product_admin_url.login).attr("target", "_blank").html(production[1][product_name].product_admin_url.login).appendTo("#download");
                    $("#download").append('<br/>');
                }
                $("#download").append('<strong>管理员帐号：' + production[1][product_name].product_admin_url.username + '</strong><br/>'
                    + '<strong>管理员密码：' + production[1][product_name].product_admin_url.password + '</strong><br/>');
                if (product_name == "XSZL") {
                    $("#download").append('<strong>后台id：' + production[1][product_name].user_pc_url.id + '</strong><br/>');
                }
            }

            $("#download").append('<br/><strong>产品文档下载：</strong><br/>');
            for(var i=0;i<production[1][product_name].file_url.length;i++){
                if(production[1][product_name].file_url[i]!="") {
                    $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].file_url[i]).html(production[1][product_name].file_url[i]).appendTo("#download");
                    $("#download").append('<br/>');
                }
            }
        },
        error:function(){
            alert("加载失败!");
        }
    })
}
$(document).ready(function(){
    //alert($.getUrlParam('page'));
    var userkey=$.getUrlParam('userkey');
    Product_Html($.getUrlParam('page'),1);
});