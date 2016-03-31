/*
*date:2016-2-22
*/
//生成产品页面方法
function Product_Html(product_name){
    $.ajax({
        type:"get",
        url:"js/production.json",
        async:false,
        dateType:"json",
        success:function(production){
            $("#info_title").html("");
            $("#info_title").append('<h1 class="no-top-margin">'+production[1][product_name].app_name+'</h1>');
            for(var i= 0;i<production[1][product_name].tag.length;i++) {
                $('<span>').addClass("badge").addClass("bg_badge"+i%5).text(production[1][product_name].tag[i]).appendTo("#info_title");
            }
            $("#info_logo").children("img").attr("src","img/logo/"+production[1][product_name].logo_url);
            $("#info_description").children("div").children("p").html(production[1][product_name].describtion);
            $("#info_QR").html("");
            for(var i=0;i<production[1][product_name].QR_url.length;i++) {
                if (production[1][product_name].QR_url[i]!="")
                    $('<img>').addClass("img-rounded QR_Code").attr("src","img/QR_Code/" + production[1][product_name].QR_url[i]).appendTo("#info_QR");
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
        },
        error:function(){
            alert("加载失败!");
        }
    })
}
$(document).ready(function(){
	//alert($.getUrlParam('page'));
    Product_Html($.getUrlParam('page'));
});