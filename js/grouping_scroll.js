/*
*date:2016-2-22
*/
var myScroll,
   pullDownEl, pullDownOffset,
   generatedCount = 0;

function pullDownAction () {
   setTimeout(function () {   // <-- Simulate network congestion, remove setTimeout from production!
      var el, li, i;
      el = document.getElementById('grouping_ul_groups');

      for (i=0; i<3; i++) {
         li = document.createElement('li');
         li.className='list-group-item';
         li.innerText = 'Generated row ' + (++generatedCount);
         el.insertBefore(li, el.childNodes[0]);
      }
      
      myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
   }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}
function listteammate(matchid,teamid){
    $('<li>').addClass("list-group-item row").attr("data-teamid",teamid).appendTo("#grouping_ul_groups");
    $('<div>').addClass("col-md-12 col-sm-12 col-xs-12").attr("id","div"+teamid).appendTo($("li[data-teamid="+teamid+"]"));
    $("#div"+teamid).html('<strong class="teamName">'+teamid+'队:</strong>');
    $.ajax({
        type: "get",
        async: false,
        data: {
            "matchid":matchid,
            "teamid":teamid
        },
        url: "http://10.206.106.27/BridgeCount/NewGame/listteammate.do",
        dataType: "jsonp",
        jsonp: "callbackparam",
        jsonpCallback: "movieking",
        success: function (result) {
            if(result.result!="null") {
                for (var i = 0; i < result.result.length; i++) {
                    $("#div" + teamid).append('<strong class="playerNameEnd" data-toggle="modal" data-target="#modal_miniMenu"'
                        + 'data-mateid=' + result.result[i].mate_id + '>' + result.result[i].playername + '</strong>');
                }
            }
        },
        error: function () {
            //alert("失败");
        }
    });
    $("#div" + teamid).append('<div class="addPlayer" id="plus_div' + teamid + '" data-toggle="modal" data-target="#modal_playerList">' +
        '<span class="glyphicon glyphicon-plus" plus data-teamid=' + teamid + '></span></div>');
}
var playernum,matchid,teamnum;
$(document).ready(function(){
     matchid=$.getUrlParam('matchid');
     teamnum=$.getUrlParam('teamnum');
    //列出已参赛人员
    $("#grouping_ul_groups").html("");
   for(var i=0;i<teamnum;i++){
       listteammate(matchid,i+1);
   }
    //列出人员
    $("span[plus]").click(function(){
        $("button[name='addmate_btn']").attr("data-teamid",$(this).attr("data-teamid"));
        var temp_teamid=$(this).attr("data-teamid");
        $("#grouping_ul_addPlayers").html("");
        $.ajax({
            type: "get",
            async: false,
            url: "http://10.206.106.27/BridgeCount/NewGame/listmate.do",
            dataType: "jsonp",
            jsonp: "callbackparam",
            jsonpCallback: "movieking",
            success: function (result) {
                for(var i=0;i<result.result.length;i++){
                    $('<li class="list-group-item">' +
                        '<input type="checkbox" id="checkbox'+i+'" data-mateid='+result.result[i].playerid+'>'+result.result[i].playername +
                        '</li>').appendTo("#grouping_ul_addPlayers");
                    $("#checkbox"+i).attr("data-teamid",temp_teamid);
                }
                playernum=result.result.length;
            },
            error: function () {
                alert("失败");
            }
        });
    });
    //添加队员
    $("button[name='addmate_btn']").click(function(){
        var player;
        for(var i= 0,j=0;i<playernum;i++){
            if($("#checkbox"+i).is(':checked')){
                $.ajax({
                    type: "get",
                    async: false,
                    data: {
                        "matchid":matchid,
                        "teamid":$("#checkbox"+i).attr("data-teamid"),
                        "mateid":$("#checkbox"+i).attr("data-mateid")
                    },
                    url: "http://10.206.106.27/BridgeCount/NewGame/addmate.do",
                    dataType: "jsonp",
                    jsonp: "callbackparam",
                    jsonpCallback: "movieking",
                    success: function (result) {
                       if(result.result=="success"){
                           //alert($("button[name='addmate_btn']").attr("data-teamid"));
                           $("#plus_div1").before('<strong class="playerNameEnd" data-mateid='+$("#checkbox"+i).attr("data-mateid")+' data-toggle="modal" data-target="#modal_miniMenu">'+$("#checkbox"+i).text()+'</strong>');
                           alert("添加队员成功");
                           $('button[data-dismiss="modal"]').trigger("click");
                       }
                        else{
                           alert("添加队员错误");
                           $('button[data-dismiss="modal"]').trigger("click");
                       }
                    },
                    error: function () {
                       // alert("失败");
                    }
                });
                //player[j++]=$("#checkbox"+i).val();
            }
        }
    });
    //删除队员
    $(".playerName").click(function(){
        alert($(this).html());

        $(".playerName").attr("data_id","xxx");
    });
    $(".playerName").click(function(){
        $(".playerName").attr("data_id");
    });
    //alert($.getUrlParam('matchid'));

	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	myScroll = new iScroll('grouping_scroller_groups', {
      useTransition: true,
      topOffset: pullDownOffset,
      onRefresh: function () {
         if (pullDownEl.className.match('loading')) {
            pullDownEl.className = '';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
         } 
      },
      onScrollMove: function () {
         if (this.y > 5 && !pullDownEl.className.match('flip')) {
            pullDownEl.className = 'flip';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
            this.minScrollY = 0;
         } else if (this.y < 5 && pullDownEl.className.match('flip')) {
            pullDownEl.className = '';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
            this.minScrollY = -pullDownOffset;
         } 
      },
      onScrollEnd: function () {
         if (pullDownEl.className.match('flip')) {
            pullDownEl.className = 'loading';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';          
            pullDownAction(); // Execute custom function (ajax call?)
         }
      }
   });
	setTimeout(function () { document.getElementById('grouping_scroller_groups').style.left = '0'; }, 800);
});
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);