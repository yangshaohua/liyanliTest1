var urls = localStorage.getItem('urls');

//获取当前时间的详细信息
function getTimes() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if(month < 10) {
		month = "0" + month;
	}
	var day = date.getDate();
	if(day < 10) {
		day = "0" + day;
	}
	var hour = date.getHours();
	if(hour < 10) {
		hour = "0" + hour;
	}
	var minute = date.getMinutes();
	if(minute < 10) {
		minute = "0" + minute;
	}
	var second = date.getSeconds();
	if(second < 10) {
		second = "0" + second;
	}
	var milli = date.getMilliseconds();
	var timeStr = (year + ':' + month + ':' + day + ': ' + hour + ':' + minute + ':' + second + '.' + milli);
	return timeStr;
}
//js生成guid
function newGuid() {
	var guid = "";
	for(var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if((i == 8) || (i == 12) || (i == 16) || (i == 20))
			guid += "-";
	}
	return guid;
};

// 时间格式
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//  ajax 封装函数
function AjaxFunction(data1, callback) {
	jQuery.ajax({
		type: 'post',
		url: urls,
		crossDomain: true,
		data: data1,
		dataType: 'json',
		async: false,
		success: function(data) {
			callback(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpRequest.readyState);
			console.log(textStatus);
		}
	})
};