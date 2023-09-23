// ==UserScript==
// @name         OA DAL
// @namespace    http://xxxxx.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http*://oa.dlp.com.tw/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dlp.com.tw
// @grant        GM_addStyle

// ==/UserScript==

(function() {
    'use strict';

var myHeader=document.querySelector("#header");
if (myHeader){
    var newHeader = `
    <div id="myHeader" class="left buttonStyle2" style="height:28px;width:100px;font-size:14px;margin-top:13px;margin-left:5px;align-items:center;display:flex">
    <marquee direction="left" behavior="scroll" scrollamount="2" id="myTypeWriter">
    To live a life that you will be proud of.
    </marquee>
    </div>`;
   myHeader.insertAdjacentHTML("beforeend", newHeader);
}


var myproElement = document.querySelector("#div_mypro_content")

if (myproElement){
    myproElement.setAttribute('style', 'display:flex; flex-direction: column; ');

}

var search1_title = document.querySelector("#div_search1_title");
    if (search1_title){
        search1_title.style.backgroundImage = 'url("")';
    }


var bodys = document.querySelectorAll('body');

bodys.forEach(function(body) {

const bgColor = getComputedStyle(body).backgroundColor;
  if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
body.style.backgroundColor = '#fff4';
  }
const bgImg = getComputedStyle(body).backgroundImage;
  if (bgImg && bgImg !== 'none') {
body.style.backgroundImage = 'url("")';
  }

});


var tbs = document.querySelectorAll('table');

tbs.forEach(function(tb) {

  tb.style.backgroundColor = '#f7f7f7';
  //tb.style.backgroundImage = 'url("")';

});


var tds = document.querySelectorAll('td');

tds.forEach(function(td) {
  var bgcolor = td.getAttribute('bgcolor');
  var title = td.getAttribute('title');
  var background = td.getAttribute('background');

  if (bgcolor && !title){
      td.setAttribute('bgcolor', '');
  }
  if (background){
      td.setAttribute('background', '');
  }

});


var ths = document.querySelectorAll('th');

ths.forEach(function(th) {
  //th.style.backgroundColor = '#f7f7f7';
  //th.style.backgroundImage = 'url("")';
  //th.setAttribute('width','');
});



var addNew= document.querySelector("#table116 > tbody > tr > td:nth-child(1)");
if (addNew){
    addNew.innerHTML =
	`
        <input value=OA程式申請 class=buttonStyle12 type=button onclick='$().href("oa_apply_710_001.do")'>
        <input value=保存布局 class=buttonStyle12 type=button id="saveLayout">
        <input value=CL簽核程式 class=buttonStyle12 type=button onclick='$().href("cnw?action=Content_misCheck")'>
        <input value=保密協議 class=buttonStyle12 type=button onclick='$().href("cnw?action=Xieyi&backUrl=content_new.do");'>
                <font color="#999999">
                <span class="style15">郵件發送狀態(發送)</span>&nbsp;
                <span class="style15"></span></font>`;
}



var saveLayoutElement = document.getElementById('saveLayout');
if (saveLayoutElement){
    saveLayoutElement.addEventListener('click', saveLayoutFunc);
    }
function saveLayoutFunc() {
		var content = "";
		$("div[name=content_mold]").each(function(i){
			var id = $(this).attr("id");
			var oDiv = $("#"+id);
			var hideFlag = "N";
			var detailDiv = $("#"+id+"_detail");
			if(detailDiv.is(":hidden"))
				hideFlag = "Y";
			var left = oDiv.css("left");
			var top = oDiv.css("top");
			var width = oDiv.css("width");
			var height = oDiv.css("height");
			content += "\""+id+"\":{\"hide\":\""+hideFlag+"\",\"left\":\""+left+"\",\"top\":\""+top+"\",\"width\":\""+width+"\",\"height\":\""+height+"\"},";
		});
		//增加div_web_show的定義
		var oDivWebShow = $("#content_web_show");
		var left = oDivWebShow .css("left");
		var top = oDivWebShow .css("top");
		var width = oDivWebShow .css("width");
		var height = oDivWebShow .css("height");
		content += "\"content_web_show\":{\"hide\":\"Y\",\"left\":\""+left+"\",\"top\":\""+top+"\",\"width\":\""+width+"\",\"height\":\""+height+"\"},";
		//保存菜單設置。
		var oDivLeft = $("#div_content_mold_7_detail_1");
		if(oDivLeft.is(":hidden")){
			content += "\"div_content_mold_7_detail_1\":\"hidden\",";
		}else{
			content += "\"div_content_mold_7_detail_1\":\"show\",";
		}

		if($().getNotNull(content)){
			content = "&layout={"+content.slice(0,content.length-1)+"}";
		}
		for(var i=0;i<myProList.length;i++){
			var myPro = myProList[i];
			content += "&code="+myPro.getCode()+"&name="+myPro.getName()+"&url="+myPro.getUrl()+"&seq="+i;
		}
		var typea = "";
		if(myProList.length<1)
			typea = "delAllPro";
		var url = "content_new.do?typee=saveLayout&typea="+typea;
		$().ajaxJsonPost(function(obj){
			var status = obj[0].no0; var info = obj[0].no1;
			alert(info);
		},url,content)
}

GM_addStyle("u { text-decoration: none ; }");
GM_addStyle("A:visited{COLOR:gray ;} A:hover{COLOR:#FF6600 ;}");
GM_addStyle(".sorte { border-bottom:none; background-color:unset;}");
GM_addStyle(".window { background : #f7f7f7;} ");
GM_addStyle(" table.tb th { background: none;}");
GM_addStyle(".headerStyl1 { border-bottom: unset;}");
GM_addStyle(".headStyle1 { border-bottom: unset;}");
GM_addStyle(" span.style3 { border: unset}");
GM_addStyle(" #span_apply_dept_name { border: unset}");
GM_addStyle("div#div_search1 { border: 1px solid rgb(153, 187, 232) !important;  }");
GM_addStyle(".inputHasOutSideWidthLov { background-color: unset; }");
GM_addStyle(".inputHasOutSideLov { background-color: unset; }");
GM_addStyle(".style6 { border: unset;}");
GM_addStyle(".postilStyle { width : 280px;}");
GM_addStyle("#div_mypro_content div > div:last-child{ height : 15 !important;}");
GM_addStyle(".height35 { height: 36px;}");
GM_addStyle(".taba  { border-width: 1px; border-collapse: collapse;  border-color: #99BBE8;}");
GM_addStyle("#table75  { border: 1px dashed #99BBE8; width: 994; }");
GM_addStyle("#table87  { border: 1px dashed #99BBE8;}");
GM_addStyle("#table84  { border: 1px dashed #99BBE8;}");
GM_addStyle("#table90  { border: 1px dashed #99BBE8;}");
GM_addStyle("#table98  { border: 1px dashed #99BBE8;}");
GM_addStyle("#table111 { border: 1px dashed #99BBE8;}");
GM_addStyle("#table103 { border: 1px dashed #99BBE8;}");
GM_addStyle("#table107 { border: 1px dashed #99BBE8;}");
GM_addStyle(".tbStyle3 td,th { min-width:1px; }");
GM_addStyle(".itemStyle1 { width: 252px;}");
GM_addStyle("#title { border-bottom: unset; }");


var corr_1 = document.querySelector("#div2 > form > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table");
    if (corr_1) {
        corr_1.setAttribute('width','338');
    }

var corr_2 = document.querySelector("div.style10");
if (corr_2){
    corr_2.setAttribute('class','');
}

var corr_3 = document.querySelector("div.divStyle10");
if (corr_3){
    corr_3.setAttribute('class','');
}

var corr_4 = document.querySelector("span.spanStyle10");
if (corr_4){
    GM_addStyle(".spanStyle10 { color: red }");

}

var corr_5 = document.querySelector("#postil");
    if(corr_5){
        corr_5.setAttribute('size',"50%");
    }

var corr_6 = document.querySelector("#oa_tree");
    if (corr_6){
        corr_6.closest("table").setAttribute("width", "");
    }

var corr_7 = document.querySelector("#oa_frame > frame:nth-child(3)");
    if (corr_7){
        corr_7.setAttribute('id', 'cont-id');
        GM_addStyle("frame#cont-id body {  display: flex;   justify-content: center;   align-items: center;   text-align: center; }");
    }


var calender_height = document.querySelector("#div_content_mold_2_detail > iframe");
    if (calender_height){
        calender_height.setAttribute('height','240');
        calender_height.setAttribute('width','100%');
    }



var personalInfo = document.querySelector("#table115");
    if (personalInfo){
        personalInfo.setAttribute('height','238');
    }

var login_line = document.querySelector("#table37 > tbody > tr:nth-child(6) > td");
    if (login_line){
        login_line.innerHTML = "";
    }
var login_vertical_img = document.querySelector("#table31 > tbody > tr > td:nth-child(2)");
    if (login_vertical_img){
        login_vertical_img.innerHTML = "";
    }

var login_bottom = document.querySelector("#table37 > tbody > tr:nth-child(9)")
if (login_bottom){
    var new_bottom = `
<td width="19%" height="22">&nbsp;</td>
<td height="22" width="81%">&nbsp;
<font color="#FF0000">&nbsp;注：建議使用1024*768分辯率的瀏覽器</br><img src="sysImg/chrome.gif" width="49" height="66">
<img src="sysImg/firefox.gif" width="49" height="66">
<a target="_blank" href="lockList_oa_status.do">
<img border="0" src="sysImg/titie.gif" width="15" height="13"></a></font>
<a href="/portal/portal?action=Temp_login">移動版</a></td>
`;
   login_bottom.innerHTML = new_bottom;
}


var hideColumns = document.querySelector("body > div.outSideStyle > table.tb");
    if (hideColumns){
        var cellindex = hideColumns.rows[0].cells.length ;
        if (cellindex > 19){
        GM_addStyle("table.tb td:nth-child(n+10):nth-child(-n+19) { display:none; }");
        GM_addStyle("table.tb th:nth-child(n+10):nth-child(-n+19) { display:none; }");
        GM_addStyle("table.tb th:nth-child(4) { display: none; }");
        GM_addStyle("table.tb td:nth-child(4) { display: none; }");
        GM_addStyle("table.tb th:nth-child(5) { width: 7%; }");
        }
    }



  //var table = document.getElementById("table8");
  var table = document.querySelector("#table8.tb");
  //var istb = table.getAttribute('border');
  if (table){
  var tbody = table.getElementsByTagName("tbody")[0];
  var rows = tbody.getElementsByTagName("tr");

  var rowsArray = Array.prototype.slice.call(rows, 0);

  var timeIndex = 3;

  rowsArray.sort(function(a, b) {
    var timeA = new Date(a.cells[timeIndex].textContent);
    var timeB = new Date(b.cells[timeIndex].textContent);
    return timeB - timeA;
  });

  var today = new Date();
  for (var i = 0; i < rowsArray.length; i++) {

    var cell = rowsArray[i].cells[timeIndex];
    var date = new Date(cell.textContent);

    if (date.toDateString() === today.toDateString()) {
      cell.style.backgroundColor = "lightgray";

    }
    tbody.appendChild(rowsArray[i]);
  }

  }

var div_3 = document.querySelector("#table109 > tbody > tr:nth-child(3) > td");
    if (div_3){
        div_3.setAttribute("valign","top");
      var div_3_detail = document.querySelector("#dl_show");
        if (div_3_detail){
        div_3_detail.setAttribute("height","400");
        }

        jQuery.fn.divMin = function(oDiv,flag){

		if(oDiv==null)
			oDiv = this;
		if(oDiv==null) return;
		var id = oDiv.attr("id");
		var detailDiv = $("#"+id+"_detail");
		if(flag!=null){
			if(flag==0){
				oDiv.css({width:320,height:26});
				detailDiv.hide();
				$("#"+id+"_min").attr("src","sysImg/divRecover.gif");
			}
			if(flag==1){
				if(id=="div_content_mold_3" || id=="div_content_mold_4"){
					oDiv.css({width:550,height:430});
				}
				if(id=="content_web_show"){
					oDiv.css({width:600,height:236});
				}
				detailDiv.show();
				$("#"+id+"_min").attr("src","sysImg/divMin.gif");
			}
			return;
		}
		if(detailDiv.is(":hidden")){
			if(id=="div_content_mold_3" || id=="div_content_mold_4"){
					oDiv.css({width:550,height:430});
			}
			detailDiv.show();
			$("#"+id+"_min").attr("src","sysImg/divMin.gif");
		}else{
			oDiv.css({width:320,height:26});
			detailDiv.hide();
			$("#"+id+"_min").attr("src","sysImg/divRecover.gif");
		}
	}
    }

})();
