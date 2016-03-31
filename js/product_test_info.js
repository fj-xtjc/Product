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
            $("#download").append('<strong>用户测试地址：</strong>');
            if(production[1][product_name].user_pc_url.login!="") {
                    $('<a>').attr("href", production[1][product_name].user_pc_url.login).attr("target","_blank").html(production[1][product_name].user_pc_url.login).appendTo("#download");
                    $("#download").append('<br/>');
                }
            $("#download").append('<strong>测试帐号：'+production[1][product_name].user_pc_url.username+'</strong><br/>'
                +'<strong>测试密码：'+production[1][product_name].user_pc_url.password+'</strong><br/>');
            if(product_name=="XSZL") {
                $("#download").append('<strong>企业前台id：' + production[1][product_name].user_pc_url.id + '</strong><br/>');
            }
                if(product_name=="GZZL"){
                    $("#download").append('<strong>单位帐号：'+production[1][product_name].user_pc_url.company+'</strong><br/>');
            }
            if(userkey==1) {
                $("#download").append('<br/><strong>联通管理后台地址：</strong>')
                if (production[1][product_name].product_admin_url.login != "") {
                    $('<a>').attr("href", production[1][product_name].product_admin_url.login).attr("target", "_blank").html(production[1][product_name].product_admin_url.login).appendTo("#download");
                    $("#download").append('<br/>');
                }
                $("#download").append('<strong>管理员帐号：' + production[1][product_name].product_admin_url.username + '</strong><br/>'
                    + '<strong>管理员密码：' + production[1][product_name].product_admin_url.password + '</strong><br/>');
                if (product_name == "XSZL") {
                    $("#download").append('<strong>后台id：' + production[1][product_name].product_admin_url.id + '</strong><br/>');
                }
                if(product_name=="GZZL") {
                    $("#download").append('<strong>单位帐号：' + production[1][product_name].product_admin_url.company + '</strong><br/>');
                }
            }
            $("#download").append('<br/><strong>产品文档下载：</strong><br/>');
            if(userkey==1) {
                for (var i = 0; i < production[1][product_name].file_url.xtjc.length; i++) {
                    if (production[1][product_name].file_url.xtjc[i] != "") {
                        $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].file_url.xtjc[i]).html(production[1][product_name].file_url.xtjc[i]).appendTo("#download");
                        $("#download").append('<br/>');
                    }
                }
                for (var i = 0; i < production[1][product_name].file_url.unicom.length; i++) {
                    if (production[1][product_name].file_url.unicom[i] != "") {
                        $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].file_url.unicom[i]).html(production[1][product_name].file_url.unicom[i]).appendTo("#download");
                        $("#download").append('<br/>');
                    }
                }
                for (var i = 0; i < production[1][product_name].file_url.client.length; i++) {
                    if (production[1][product_name].file_url.client[i] != "") {
                        $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].file_url.client[i]).html(production[1][product_name].file_url.client[i]).appendTo("#download");
                        $("#download").append('<br/>');
                    }
                }
            }
            else if(userkey==2) {
                for (var i = 0; i < production[1][product_name].file_url.unicom.length; i++) {
                    if (production[1][product_name].file_url.unicom[i] != "") {
                        $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].file_url.unicom[i]).html(production[1][product_name].file_url.unicom[i]).appendTo("#download");
                        $("#download").append('<br/>');
                    }
                }
                for (var i = 0; i < production[1][product_name].file_url.client.length; i++) {
                    if (production[1][product_name].file_url.client[i] != "") {
                        $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].file_url.client[i]).html(production[1][product_name].file_url.client[i]).appendTo("#download");
                        $("#download").append('<br/>');
                    }
                }
            }
            else if(userkey==3){
                for (var i = 0; i < production[1][product_name].file_url.client.length; i++) {
                    if (production[1][product_name].file_url.client[i] != "") {
                        $('<a>').attr("href", "file/" + product_name + "/" + production[1][product_name].file_url.client[i]).html(production[1][product_name].file_url.client[i]).appendTo("#download");
                        $("#download").append('<br/>');
                    }
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
    if(userkey==1) {
        $("#user_container").append('<label  class="col-md-2 col-sm-2 col-xs-2 control-label">你好！产品管理部 '+ $.session.get('username')+'</label>');
    }
    else if(userkey==2){
        $("#user_container").append('<label  class="col-md-2 col-sm-2 col-xs-2 control-label">你好！市分 '+ $.session.get('username')+'</label>');
    }
    else if(userkey==3){
        $("#user_container").append('<label  class="col-md-2 col-sm-2 col-xs-2 control-label">你好！用户 '+ $.session.get('username')+'</label>');
    }
    $('a[name="logout"]').click(function(){
        $.session.clear();
    });
    $("#user_container").append('<a href="product_login.html" name="logout">退出</a>');
    Product_Html($.getUrlParam('page'),userkey);
});