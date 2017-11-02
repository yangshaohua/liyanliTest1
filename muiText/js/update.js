$('.recover').bind('tap', function() {
	$('#signModal').css('display', "none")
})
$('#confirmBtnfalse').bind('tap', function() {
	$('.myList').css('display', "none")
})
var pIndex = 0;
var e_name = document.getElementById("e_name");
var num_name = document.getElementById("num_name");
var nx_name = document.getElementById("nx_name");
var ms13;
var mid;
var userId;
var indexmt = 0;
var preid;
var mibd;
var pids;
var mmid;
var ids;
var usne;
var bimp;
var sql;
var self;
var namer;
var version;
var makerId;
var row = [];
var html;
var myDate = new Date();
var $table = jQuery("#table");

jQuery(function() {
	//初始化Table
	sql = "SELECT * FROM [EAM_StorageDevice] WHERE 1=1";

});

function searche() {
	var searchn = document.getElementById('searchn').value;
	var searchd = document.getElementById('searchd').value;

	var u_state = getStates()
	var sqlSearch = "SELECT * FROM [EAM_StorageDevice] WHERE 1=1 ";
	if(searchn != '' && searchn != null) {
		sqlSearch += "AND DeviceName like '%" + searchn + "%'";

	}
	if(searchd != '' && searchd != null) {
		sqlSearch += " AND TypeName like '%" + searchd + "%'";
	}

	InitTable(sqlSearch);
}

function getStatus(value, row, index) {
	return value = (value == "True") ? "是" : "否";
}

function deals(value, row, index) {
	return '无';
}

function InitTable(sqlStr) {
	console.log(sqlStr)
	$table.bootstrapTable("destroy");
	$table.bootstrapTable({
		url: urls,
		method: 'POST',
		dataType: 'json',
		contentType: "application/x-www-form-urlencoded",
		cache: false,
		sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,
		queryParams: queryParams,
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: 10, //每页的记录行数（*）
		pageList: [10, 20, 30, 100],
		clickToSelect: true,
		responseHandler: function(res) {

			var newJson = {
				total: 0,
				rows: ""
			};
			if(res.Code == 1) {
				var names = JSON.parse(res.Datas);
				newJson = {
					total: names.total,
					rows: names.rows
				};

			}
			return newJson;
		}
	});

	function queryParams(params) {
		var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit: params.limit, //页面大小
			offset: params.offset, //页码
			pageFlag: true,
			functionName: "QueryList",
			jsonStr: "[{\"jsonStr\":\"" + sqlStr + "\"}]"
		};
		console.log(temp)
		return temp;
	};
}
//得到查询的参数
function deleteRepair(value) {
	var content = $table.bootstrapTable('getSelections');
	if(content.length < 1) {
		mui.toast("当前没有选择数据")
	}
	$.each(content, function(index, item) {
		console.log(this.Id)
		var objs = {
			functionName: "NoneQuery",
			jsonStr: "[{\"jsonStr\":\"SELECT [Id],[PartsId],[PartsName],[PartsCode],[PartsPrice],[PartsCount],[PartsAllPrice],[Remark],[PMRepairReportId] FROM [EAM_PMRepairParts]\"}]"

		}
		AjaxFunction(objs, function(data) {
			console.log(data.Datas)

		})

	})

}

(function($, doc) {

	$.init();
	$.plusReady(function() {
		//plus.screen.lockOrientation("portrait-primary");
		self = plus.webview.currentWebview();
		version = self.version;
		usid = self.ids;
		usne = self.namer;

		//扫码
		var scan = document.getElementById('scan')
		scan.addEventListener('tap', function(event) {

			$.openWindow({
				url: 'barcode.html',
				id: 'barcode.html',
				show: {
					aniShow: 'pop-in'
				},
				waiting: {
					autoShow: false
				},
				extras: {
					idp: "update.html"
				}

			});

		})
		window.addEventListener("baInfo", function(event) {
			var deNumber = document.getElementById("num_name"); //机身编号
			var deviceName = document.getElementsByClassName("filter-option")[1];
			var prM = document.getElementById("prM");
			var deTnumber = document.getElementById("nx_name");
			deNumber.value = event.detail.baId;

			if(event.detail.baId != "") {
				var objm = {
					functionName: "QueryList",
					jsonStr: "[{\"jsonStr\":\"select * from eam_device where DeviceCode='" + event.detail.baId + "'\"}]"
				}
				AjaxFunction(objm, function(data) {
					deTnumber.value = JSON.parse(data.Datas).QueryList[0].DeviceModel;
					prM.value = JSON.parse(data.Datas).QueryList[0].ManufacturerName;
					deviceName.innerHTML = JSON.parse(data.Datas).QueryList[0].DeviceName;
					return;

				})

			} else {
				alert('没有数据');
				deNumber.value = "";
				deTnumber.value = "";
				prM.value = "";
				deviceName.innerHTML = "请选择";
			}

		})

		// 加载数据信息
		function search() {
			var myselect = document.getElementById("lunchs");
			var index = myselect.selectedIndex;
			var k_room = myselect.options[index].innerHTML;
			var mysel = document.getElementById("e_name");
			var inde = myselect.selectedIndex;
			var equna = mysel.options[inde].innerHTML;
			var guidOne = newGuid();
			var contact = document.getElementById('sq0').value;
			var timeG = document.getElementById("timeS").value;
			var e_name = document.getElementById("e_name").value;
			var num_name = document.getElementById("num_name").value;
			var nx_name = document.getElementById('nx_name').value;
			var prM = document.getElementById("prM").value;
			var phnm = document.getElementById("sq1").value;
			var mterail = document.getElementById("sq2").value;
			var result = document.getElementById('sq3').value;
			var timeS1 = document.getElementById("timeS1").value;
			var fail = document.getElementById("fobidden").value;
			var suggest = document.getElementById("suggests").value;
			var sucess = document.getElementById("timeS2").value;
			var slec = document.getElementById('lunchs').value;
			var objls = {
				functionName: "QueryList",
				jsonStr: "[{\"jsonStr\":\"SELECT [Id],[DeviceId],[OrganizationName],[RepairPerson], [RepairDate],[DeviceName], [DeviceCode], [DeviceModel],[ManufacturerName],[TroubleDescription], [RepairParts], [RepairResult],[FinishDate], [FinishState], [NoFinishReason], [AcceptanceOpinion], [AcceptanceDate],[AcceptancePerson],[OverhaulPerson] FROM [EAM_PMRepairReport] WHERE Id= '" + version + "'\"}]"

			}
			AjaxFunction(objls, function(data) {
				ids = JSON.parse(data.Datas).QueryList[0].Id;
				idb = JSON.parse(data.Datas).QueryList[0].RepairParts;
				console.log(JSON.parse(data.Datas).QueryList[0].AcceptancePerson);
//				alert(JSON.parse(data.Datas).QueryList[0].AcceptancePerson)
				var img = document.createElement('img');
				var imgs = document.createElement('img');
				if(JSON.parse(data.Datas).QueryList[0].AcceptancePerson == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC") {
					img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC";
					img.style.background = "0"
				} else {

					img.src = JSON.parse(data.Datas).QueryList[0].AcceptancePerson;
					img.style.width = '100px';
					img.style.height = '40px';
				}

				if(JSON.parse(data.Datas).QueryList[0].AcceptancePerson == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC") {
					imgs.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC";
					imgs.style.opacity = "0"
				} else {
					imgs.src = JSON.parse(data.Datas).QueryList[0].OverhaulPerson;
					imgs.style.width = '100px';
					imgs.style.height = '40px';
				}

				document.getElementById('sq0').value = JSON.parse(data.Datas).QueryList[0].RepairPerson;
				var timew = new Date(JSON.parse(data.Datas).QueryList[0].RepairDate).Format("yyyy-MM-dd");
				document.getElementById("timeS").value = timew

				document.getElementById('pImg').appendChild(img);
				document.getElementById('dImg').appendChild(imgs);

				document.getElementById("num_name").value = JSON.parse(data.Datas).QueryList[0].DeviceCode;
				document.getElementById('nx_name').value = JSON.parse(data.Datas).QueryList[0].DeviceModel;
				document.getElementById("prM").value = JSON.parse(data.Datas).QueryList[0].ManufacturerName;
				document.getElementById("sq1").value = JSON.parse(data.Datas).QueryList[0].TroubleDescription;
				document.getElementById("sq2").value = JSON.parse(data.Datas).QueryList[0].RepairParts;
				document.getElementById('sq3').value = JSON.parse(data.Datas).QueryList[0].RepairResult;

				document.getElementById("suggests").value = JSON.parse(data.Datas).QueryList[0].AcceptanceOpinion;
				var timea = new Date(JSON.parse(data.Datas).QueryList[0].AcceptanceDate).Format("yyyy-MM-dd");
				document.getElementById("timeS2").value = timea;
				document.getElementById("fobidden").value = JSON.parse(data.Datas).QueryList[0].NoFinishReason;
				if(JSON.parse(data.Datas).QueryList[0].FinishState == 'False') {
					document.getElementById("sq4").checked = JSON.parse(data.Datas).QueryList[0].FinishState;
					document.getElementById("timeS1").value = "";
					document.getElementById("fobidden").disabled = false;
				} else if(JSON.parse(data.Datas).QueryList[0].FinishState == 'True') {
					document.getElementById("complete").checked = JSON.parse(data.Datas).QueryList[0].FinishState;
					var timef = new Date(JSON.parse(data.Datas).QueryList[0].FinishDate).Format("yyyy-MM-dd");
					document.getElementById("timeS1").value = timef;
					document.getElementById("fobidden").disabled = true;
				}

				document.getElementsByClassName("filter-option")[1].innerHTML = JSON.parse(data.Datas).QueryList[0].DeviceName;
				document.getElementsByClassName("filter-option")[0].innerHTML = JSON.parse(data.Datas).QueryList[0].OrganizationName;
				var htmls = "";
				var objms = {
					functionName: "QueryList",
					jsonStr: "[{\"jsonStr\":\"SELECT * FROM [EAM_PMRepairParts]  WHERE PMRepairReportId= '" + version + "' \"}]"

				}

				AjaxFunction(objms, function(data) {
					if(data.Code == 1) {
						if(data.Datas == '{"QueryList":]}') {

						} else {
							var dataList = JSON.parse(data.Datas);
							//											
							$.each(dataList.QueryList, function(index, item) {

								htmls += '<li class="mui-table-view-cell" id="' + version + '">\
											<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div>\
											<div class="mui-slider-handle">\
												<ol class="datas">\
													<li style="margin-top:1.2%;margin-left:2.3%" class="PartsName" id="PartsName' + index + '">' + item.PartsName + '</li>\
													<li style="margin-top:1.2%;width:31%" class="PartsCode" id="PartsCode' + index + '">' + item.PartsCode + '</li>\
													<li style="margin-left:-0.5%"><input type="text" class="PartsPrice" id="PartsPrice' + index + '" value="' + item.PartsPrice + '"/></li>\
													<li style="margin-left:4%;"><div class="mui-numbox">\
														<button id="decrease"  class="mui-btn mui-btn-numbox-minus" type="button">-</button>\
														<input  type="number" class="PartsCount mui-input-numbox" id="PartsCount' + index + '" value="' + item.PartsCount + '"/>\
														<button id="increase" class="mui-btn mui-btn-numbox-plus" type="button">+</button></div></li>\
													</ol></div>\
												</li>';
							})
							document.getElementById('OA_task_1').innerHTML = htmls
						}

					}

				})

			})
		};

		function pas() {

			var html;
			var obj = {
				functionName: "QueryList",
				jsonStr: "[{\"jsonStr\":\"SELECT [Id],[PartsName],[PartsCode],[PartsPrice],[PartsCount],[Remark] FROM [EAM_PMRepairParts] WHERE Id= '" + version + "'\"}]"

			}
			AjaxFunction(obj, function(data) {

			})

		}
		pas()
		search(version)

		//					plus.nativeUI.toast("keke");
	});

	//报修的日期
	document.getElementById("data_l").addEventListener('click', function() {
		var dDate = new Date();
		//设置当前日期（不设置默认当前日期）
		dDate.setFullYear();
		var minDate = new Date();
		//最小时间
		minDate.setFullYear(2010, 0, 1);
		var maxDate = new Date();
		//最大时间
		maxDate.setFullYear(2060, 12, 31);
		plus.nativeUI.pickDate(function(e) {
			var d = e.date;
			var timep = document.getElementById('timeS');
			var dm = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
			console.log(dm)
			timep.value = dm;

			//						mui.toast('您选择的日期是:' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());

		}, {
			title: '请选择日期',
			date: dDate,
			minDate: minDate,
			maxDate: maxDate
		});
	});

	// 完成的日期
	document.getElementById("perfact").addEventListener('click', function() {
		var dDate = new Date();
		//设置当前日期（不设置默认当前日期）
		dDate.setFullYear();
		var minDate = new Date();
		//最小时间+3-
		minDate.setFullYear(2010, 0, 1);
		var maxDate = new Date();
		//最大时间
		maxDate.setFullYear(2060, 12, 31);
		plus.nativeUI.pickDate(function(e) {
			var d = e.date;
			var timep = document.getElementById('timeS1');
			var dm = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
			console.log(dm)
			timep.value = dm
				//						mui.toast('您选择的日期是:' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());

		}, {
			title: '请选择日期',
			date: dDate,
			minDate: minDate,
			maxDate: maxDate
		});
	});

	//验收日期

	document.getElementById("completes").addEventListener('click', function() {
		var dDate = new Date();
		//设置当前日期（不设置默认当前日期）
		dDate.setFullYear();
		var minDate = new Date();
		//最小时间
		minDate.setFullYear(2010, 0, 1);
		var maxDate = new Date();
		//最大时间
		maxDate.setFullYear(2060, 12, 31);
		plus.nativeUI.pickDate(function(e) {
			var d = e.date;
			var timep = document.getElementById('timeS2');
			var dm = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
			console.log(dm)
			timep.value = dm
				//						mui.toast-('您选择的日期是:' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());

		}, {
			title: '请选择日期',
			date: dDate,
			minDate: minDate,
			maxDate: maxDate
		});
	});

}(mui, document));

//完成禁用表单

var fobid = document.getElementById('fobidden');
var finsh = document.getElementById('complete');

function hid() {
	fobid.disabled = true
};

function appear() {
	fobid.disabled = false;

}

var signFlag = true;
jQuery(document).ready(function() {

	var dheight = jQuery(this).height() * 0.46;

});

var canvas = null,
	context = null;
window.onload = function() {

	var oBtn = document.getElementById('save');
	var img_box = document.getElementById('img_box');
	var clear = document.getElementById('clear');

	// 确认提交
	var pImg = document.getElementById('pImg')
	oBtn.onclick = function() {
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		image.style.width = 100 + 'px';
		image.style.height = 40 + 'px';
		var child = pImg.children;
		if(child.length >= 1) {
			if(signFlag) {
				removeChildren(pImg);
				pImg.appendChild(image);
				sig.style.display = 'none';
			} else {
				removeChildren(dImg);
				dImg.appendChild(image);
				sig.style.display = 'none';
			}

		} else {
			if(signFlag) {
				pImg.appendChild(image);
				sig.style.display = 'none';
			} else {
				dImg.appendChild(image);
				sig.style.display = 'none';
			}

		}

	};

	//清除画布
	clear.onclick = function() {
		var sigWid = document.getElementById('signModal').offsetWidth;
		var sigHei = document.getElementById('signModal').offsetHeight;
		var btnHei = document.getElementById('buttons').offsetHeight;
		context.clearRect(0, 0, sigWid, sigHei - btnHei)
	}

	//弹出签字div
	var pSign = document.getElementById('pSign');
	var dSign = document.getElementById('dSign');
	pSign.onclick = function() {
		signFlag = true;
		sig.style.display = 'block';
		sigWid = document.getElementById('signModal').offsetWidth;
		sigHei = document.getElementById('signModal').offsetHeight;
		btnHei = document.getElementById('buttons').offsetHeight;
		var sigTop = document.getElementById('signModal').offsetTop;

		//画布签名功能
		resetCanvas();

		canvas.addEventListener('touchstart', function(evt) {
			evt.preventDefault();
			context.beginPath();
			context.moveTo(evt.touches[0].pageX, evt.touches[0].pageY - sigTop);
		}, false);
		canvas.addEventListener('touchmove', function(evt) {
			context.lineTo(evt.touches[0].pageX, evt.touches[0].pageY - sigTop);
			context.stroke();
		}, false);
		canvas.addEventListener('touchend', function(evt) {

		}, false);

		canvas.onmousedown = function(evt) {
			context.beginPath();
			context.moveTo(evt.pageX, evt.pageY - sigTop);
			canvas.onmousemove = function(evt) {
				context.lineTo(evt.pageX, evt.pageY - sigTop);
				context.stroke();
			}
		}
		canvas.onmouseup = function() {
			canvas.onmousemove = null;
		}
		canvas.onmouseout = function() {
			canvas.onmousemove = null;
		}
	};

	dSign.onclick = function() {
			signFlag = false;
			sig.style.display = 'block';
			sigWid = document.getElementById('signModal').offsetWidth;
			sigHei = document.getElementById('signModal').offsetHeight;
			btnHei = document.getElementById('buttons').offsetHeight;
			var sigTop = document.getElementById('signModal').offsetTop;

			//画布签名功能
			resetCanvas();

			canvas.addEventListener('touchstart', function(evt) {
				evt.preventDefault();
				context.beginPath();
				context.moveTo(evt.touches[0].pageX, evt.touches[0].pageY - sigTop);
			}, false);
			canvas.addEventListener('touchmove', function(evt) {
				context.lineTo(evt.touches[0].pageX, evt.touches[0].pageY - sigTop);
				context.stroke();
			}, false);
			canvas.addEventListener('touchend', function(evt) {

			}, false);

			canvas.onmousedown = function(evt) {
				context.beginPath();
				context.moveTo(evt.pageX, evt.pageY - sigTop);
				canvas.onmousemove = function(evt) {
					context.lineTo(evt.pageX, evt.pageY - sigTop);
					context.stroke();
				}
			}
			canvas.onmouseup = function() {
				canvas.onmousemove = null;
			}
			canvas.onmouseout = function() {
				canvas.onmousemove = null;
			}
		}
		//定义canvas 方法
	function resetCanvas() {
		canvas = document.getElementById('simple');
		canvas.width = sigWid;
		canvas.height = sigHei - btnHei;
		context = canvas.getContext('2d');
		context.lineWidth = 6; //线条的宽度
		context.strokeStyle = "#000"; //线条的颜色
	}

	//删除所用子节点方法  pnode == 父级
	function removeChildren(pnode) {
		var childs = pnode.childNodes;
		for(var i = childs.length - 1; i >= 0; i--) {
			pnode.removeChild(childs.item(i));
		}
	}

	//取消
	var cancelCanvas = document.getElementById('cancelCanvas');
	var sig = document.getElementById('signModal');
	cancelCanvas.onclick = function() {
		sig.style.display = 'none';
	}

};

// list 列表
$("#btns").bind('click', function() {

	function searPart() {
		var objs = {
			functionName: "QueryList",
			jsonStr: "[{\"jsonStr\":\"SELECT [Id],[PartsId],[PartsName],[PartsCode],[PartsPrice],[PartsCount],[PartsAllPrice],[Remark],[PMRepairReportId] FROM [EAM_PMRepairParts] \"}]"

		}
		AjaxFunction(objs, function(data) {
			if(data.Code == 1) {
				if(data.Datas == '{"QueryList":]}') {
					return;
				} else {
					var ary = JSON.parse(data.Datas).QueryList;
					var tables;
					$.each(ary, function(index) {
						mibd = JSON.parse(data.Datas).QueryList[index].Id;
						indexmt = index;
						tables += '<li class="mui-table-view-cell" id="' + mibd + '">\
											<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div>\
											<div class="mui-slider-handle">\
												<ol class="datas" >\
												<li class="PartsName" id="PartsName">' + JSON.parse(data.Datas).QueryList[0].PartsName + '</li>\
												<li><input type="text" class="PartsPrice" value="' + JSON.parse(data.Datas).QueryList[0].PartsPrice + '"/></li>\
												<li style="margin-left: -1%;"><div class="mui-numbox">\
												<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>\
													<input  type="number" class="PartsCount mui-input-numbox" value="' + JSON.parse(data.Datas).QueryList[0].PartsCount + '"/>\
												<button class="mui-btn mui-btn-numbox-plus" type="button">+</button></div></li>\
													<li class="PartsCode">' + JSON.parse(data.Datas).QueryList[0].PartsCode + '</li>\
													<li><input type="text" class="Remark" value="' + JSON.parse(data.Datas).QueryList[0].Remark + '"/></li></ol></div>\
												</li>'
					});
				}

			}

		})

	}
	searPart();

	InitTable(sql);
	$(".myList").css('display', 'block');
});
$('#listForm #confirmBtns').bind('click', function() {
	var content = $table.bootstrapTable('getSelections');
	if(content.length < 1) {
		mui.toast("当前没有选择数据")
	}
	$.each(content, function(index, item) {
		var bimp = this.Id;
		var htmls = '';
		var objs = {
			functionName: "QueryList",
			jsonStr: "[{\"jsonStr\":\"SELECT * FROM [EAM_StorageDevice] WHERE Id= '" + bimp + "'\"}]"
		}
		AjaxFunction(objs, function(data) {
			console.log(data.Datas)
			preid = JSON.parse(data.Datas).QueryList[0].Id;

			indexmt = indexmt + 1;
			var mb = JSON.parse(data.Datas).QueryList[0].StorageAllNumber;
			if(mb == "" || mb == null) {
				mb = 0;
			}
			htmls += '<li class="mui-table-view-cell" id="' + bimp + '">\
											<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div>\
											<div class="mui-slider-handle">\
												<ol class="datas ' + preid + '" >\
													<li class="PartsName " style="margin-top:1.2%;margin-left:2.3%" id="PartsName' + indexmt + '">' + JSON.parse(data.Datas).QueryList[0].DeviceName + '</li>\
													<li style="margin-top:1.2%;width:31%" class="PartsCode" id="PartsCode' + indexmt + '">' + JSON.parse(data.Datas).QueryList[0].DeviceCode + '</li>\
													<li style="margin-left:-0.5%"><input type="text" class="PartsPrice" id="PartsPrice' + indexmt + '" value="' + JSON.parse(data.Datas).QueryList[0].BuyMoney + '"/></li>\
													<li style="margin-left: 4%;"><div class="mui-numbox"><button id="decrease" class="mui-btn mui-btn-numbox-minus" type="button">-</button>\
													<input  type="number" class="PartsCount mui-input-numbox" id="PartsCount' + indexmt + '" value="' + mb + '"/>\
													<button class="mui-btn mui-btn-numbox-plus" id="increase" type="button">+</button>\
													</div></li>\
													</ol></div>\
												</li>'
			$('#OA_task_1').append(htmls);
			$(".myList").css('display', 'none');

		})

	})
});
//右滑删除

var btnArray = ['取消', '确认'];
$('#OA_task_1').on('tap', '.mui-disabled .mui-btn', function(event) {
	var elem = this;
	var li = elem.parentNode.parentNode;
	mui.confirm('确认删除该条记录？', '删除', btnArray, function(e) {
		if(e.index == 0) {
			setTimeout(function() {
				$.swipeoutClose(li);
			}, 0);

		} else {
			li.parentNode.removeChild(li);
		}
	});
});
$('#OA_task_1').on('tap', '#decrease', function(event) {
	var elem = this;
	var PartsCount = elem.nextElementSibling.value;
	elem.nextElementSibling.value = --elem.nextElementSibling.value;
	if(elem.nextElementSibling.value < 0) {
		elem.nextElementSibling.value = 0
	}

});

$('#OA_task_1').on('tap', '#increase', function(event) {
	var elem = this;
	var PartsCount = elem.previousElementSibling.value;
	elem.previousElementSibling.value = ++elem.previousElementSibling.value;

});

//guid
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

function getStates() {
	var val = $('input:radio[name="radio1"]:checked').val();
	//console.log(val)
	if(val == 1) {

		return 1;
	} else {
		return 0;
	}
};
(function($, doc) {
	//				$.init();
	$.plusReady(function() {
		window.addEventListener('orientationchange', function(event) {
			var body = document.body;
			body.style.display = 'none';
			setTimeout(function() {
				body.style.display = '';
			}, 10);
			if(window.orientation === 180 || window.orientation === 0) {
				jQuery(document).ready(function() {
					jQuery("#signature").jSignature();
				});

			}
			if(window.orientation === 90 || window.orientation === -90) {
				jQuery(document).ready(function() {
					jQuery("#signature").jSignature();
				});
			}
		});
		var confirm = doc.getElementById("confirm");

	});
}(mui, document));

var info = document.getElementById("info");
var obj = {
	functionName: "QueryList",
	jsonStr: "[{'jsonStr':'select Organizationid,FullName,ShortName FROM Auth_Organization WHERE Organizationid not in (select parentId from Auth_Organization)'}]"

}
AjaxFunction(obj, function(data) {
	if(data.Code == "1") {
		if(data.Datas == '{"QueryList":]}') {
			document.getElementsByClassName("filter-option")[1].innerHTML = '';
			document.getElementById("nx_name").value = " ";
			document.getElementById("num_name").value = " ";
			document.getElementById("prM").value = " ";
			$('#lunchs').find('.dele').remove();
			$('#lunchs').selectpicker('refresh');
			return;
		} else {

			var obj = JSON.parse(data.Datas).QueryList;
			var html = "";
			$.each(obj, function(index, item) {
				var shortName = item.ShortName.split(',');
				html += '<option value="' + this.Organizationid + '">' + obj[index].FullName + '-' + shortName[0] + '</option>'
					//						html += '<option value="' + this.Organizationid + '">' + obj[index].FullName + '</option>'
			});
			document.getElementById("lunchs").innerHTML = html;
		}
	}

})

$("#seld #lunchs").change(function() {
	mid = this.value
		//console.log(mid)
	var objs = {
		functionName: "QueryList",
		jsonStr: '[{"jsonStr":"select * from eam_device where OrganizationId=\'' + mid + '\'"}]'
	}
	AjaxFunction(objs, function(data) {
		if(data.Code == "1") {
			if(data.Datas == '{"QueryList":]}') {
				document.getElementsByClassName("filter-option")[1].innerHTML = '';
				document.getElementById("nx_name").value = " ";
				document.getElementById("num_name").value = " ";
				document.getElementById("prM").value = " ";
				$('#e_name').find('.dele').remove();
				$('#e_name').selectpicker('refresh');

				return;
			} else {
				//								document.getElementsByClassName("filter-option")[1].innerHTML = '';
				document.getElementById("nx_name").value = " ";
				document.getElementById("num_name").value = " ";
				document.getElementById("prM").value = " ";
				var equName = JSON.parse(data.Datas).QueryList;
				var htmls = " ";
				$.each(equName, function(index, item) {
					var shortName = item.DeviceNamePing.split(',');
					htmls += '<option class="dele" value="' + equName[index].Id + '">' + equName[index].DeviceName + '-' + shortName[0] + '</option>'
						//							htmls += '<option value="' + equName[index].Id + '">' + equName[index].DeviceName + '</option>'
				});
				document.getElementById("e_name").innerHTML = htmls;

				$('#e_name').selectpicker('refresh');
			}
		}

	})

})
$("#e_name").change(function() {
	//console.log(this)
	mmid = this.value;
	var objm = {
		functionName: "QueryList",
		jsonStr: '[{"jsonStr":"select  ManufacturerId,ManufacturerName,DeviceCode,DeviceModel from eam_device where id=\'' + mmid + '\'"}]'

	}
	AjaxFunction(objm, function(data) {
		if(data.Code == "1") {
			if(data.Datas == '{"QueryList":]}') {
				$('#e_name').selectpicker('refresh');
				return;
			} else {

				document.getElementById("nx_name").value = " ";
				document.getElementById("num_name").value = " ";
				document.getElementById("prM").value = " ";
			}
		}
		//console.log(data);
		var eqName = JSON.parse(data.Datas).QueryList;
		makerId = eqName[0].ManufacturerId;

		document.getElementById("num_name").value = eqName[0].DeviceCode;
		document.getElementById("nx_name").value = eqName[0].DeviceModel;
		document.getElementById("prM").value = eqName[0].ManufacturerName;

	})

})

// 获取当前时间
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

//修改数据
document.getElementById("confirmBtn").addEventListener('tap', function() {

	var btnArray = ['否', '是'];
	var mos = getStates();
	if(mos == '1') {

		var timeS1 = document.getElementById("timeS1").value;
		if(timeS1 == "") {
			mui.toast("工作完成日期不能为空");
			return;
		}
		if($('#pImg img')[0].src == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC") {

			mui.toast('验收人不能为空');

			return;
		}

		if($('#dImg img')[0].src == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC") {
			mui.toast('检修人不能为空');

			return;
		}

		mui.confirm('当前设备维修工作已经完成，提交后将无法修改。确认提交？', '修改', btnArray, function(e) {

			if(e.index == 1) {

				var partList = "";
				var dataClass = document.getElementsByClassName('datas');
				$.each(dataClass, function(index, item) {
					var idpart = dataClass[index].firstElementChild.id;

					var indexdb = idpart.substring(9, idpart.length);

					partList += "('" + version + "','" + $("#PartsName" + indexdb).text() + "','" + $("#PartsPrice" + indexdb).val() + "','" + $("#PartsCount" + indexdb).val() + "','" + $("#PartsCode" + indexdb).text() + "','','" + preid + "'),";
				})
				var guidOne = newGuid();
				var k_room = (document.getElementsByClassName("filter-option")[0].innerHTML).replace(/[^\u4e00-\u9fa5]/gi, "");
				var equna = (document.getElementsByClassName("filter-option")[1].innerHTML).replace(/[^\u4e00-\u9fa5]/gi, "");

				var contact = document.getElementById('sq0').value;
				var timeG = document.getElementById("timeS").value;
				var e_name = document.getElementById("e_name").value;
				var num_name = document.getElementById("num_name").value;
				var nx_name = document.getElementById('nx_name').value;
				var prM = document.getElementById("prM").value;
				var phnm = document.getElementById("sq1").value;
				var mterail = document.getElementById("sq2").value;
				var result = document.getElementById('sq3').value;

				var fail = document.getElementById("fobidden").value;
				var suggest = document.getElementById("suggests").value;
				var sucess = document.getElementById("timeS2").value;
				var slec = document.getElementById('lunchs').value;

				// 转化base64 编码
				var loadCanvas = document.getElementById("simple");
				context = loadCanvas.getContext("2d");
				if($('#pImg img')[0].src == loadCanvas.toDataURL()) {

					person_c = loadCanvas.toDataURL();

				} else {
					person_c = $('#pImg img')[0].src;
				}

				var loadCanvas1 = document.getElementById("simple");
				context1 = loadCanvas1.getContext("2d");
				if($('#dImg img')[0].src == loadCanvas.toDataURL()) {

					person_b = loadCanvas.toDataURL();

				} else {

					person_b = $('#dImg img')[0].src;

				}
				var objf = {
					functionName: "NoneQuery",
					jsonStr: "[{\"jsonStr\":\"UPDATE [EAM_PMRepairReport] SET [ModifyDate]='" + getNowFormatDate() + "', [ModifyUserName]='" + usne + "', [ModifyUserId]='" + usid + "', [DeviceName]='" + equna + "', [ManufacturerId]= '" + makerId + "',[OrganizationName]='" + k_room + "', [OrganizationId]='" + slec + "',[RepairPerson]='" + contact + "', [RepairDate]='" + timeG + "',[DeviceId]='" + e_name + "', [DeviceCode]='" + num_name + "', [DeviceModel]= '" + nx_name + "',[ManufacturerName]='" + prM + "',[TroubleDescription]='" + phnm + "', [RepairParts]='" + mterail + "', [RepairResult]='" + result + "',[FinishDate]='" + timeS1 + "', [FinishState]='" + getStates() + "', [NoFinishReason]='" + fail + "', [AcceptanceOpinion]='" + suggest + "', [AcceptanceDate]='" + sucess + "',[CreateDate]='" + myDate.toLocaleDateString() + "',[AcceptancePerson]='" + person_c + "',[OverhaulPerson]='" + person_b + "'WHERE Id = '" + ids + "'\"}]"

				}
				AjaxFunction(objf, function(data) {
					var objs = {
						functionName: "NoneQuery",
						jsonStr: "[{\"jsonStr\":\"DELETE FROM [EAM_PMRepairParts] where PMRepairReportId='" + version + "'\"}]"

					}
					AjaxFunction(objs, function(data) {
						if(data.Code == 1) {

							var objld = {
								functionName: "NoneQuery",
								jsonStr: "[{\"jsonStr\":\"INSERT INTO [EAM_PMRepairParts]([PMRepairReportId], [PartsName], [PartsPrice], [PartsCount], [PartsCode], [Remark],[PartsId])VALUES " + partList.substring(0, partList.length - 1) + " \"}]"

							}
							AjaxFunction(objld, function(data) {
								if(data.Code == 1) {
									mui.toast('修改成功');

									//													获得详情页面
									var detailPage = plus.webview.getWebviewById('list');
									//触发详情页面的newsId事件
									mui.fire(detailPage, 'audit', {
										namee: usne,
										userId: usid
									});

									var ws = plus.webview.currentWebview();
									ws.close();

								} else {
									mui.toast('修改失败');
								}

							})

						}

					})

				})

				info.innerText = '';
			} else {

			}
		})
	} else if(mos == '0') {
		var guidOne = newGuid();
		var k_room = (document.getElementsByClassName("filter-option")[0].innerHTML).replace(/[^\u4e00-\u9fa5]/gi, "");
		var equna = (document.getElementsByClassName("filter-option")[1].innerHTML).replace(/[^\u4e00-\u9fa5]/gi, "");

		var contact = document.getElementById('sq0').value;
		var timeG = document.getElementById("timeS").value;
		var e_name = document.getElementById("e_name").value;
		var num_name = document.getElementById("num_name").value;
		var nx_name = document.getElementById('nx_name').value;
		var prM = document.getElementById("prM").value;
		var phnm = document.getElementById("sq1").value;
		var mterail = document.getElementById("sq2").value;
		var result = document.getElementById('sq3').value;
		var timeS1 = document.getElementById("timeS1").value;
		var fail = document.getElementById("fobidden").value;
		var suggest = document.getElementById("suggests").value;
		var sucess = document.getElementById("timeS2").value;
		var slec = document.getElementById('lunchs').value;

		// 转化base64 编码
		var loadCanvas = document.getElementById("simple");

		context = loadCanvas.getContext("2d");

		if($('#pImg img')[0].src == loadCanvas.toDataURL()) {

			person_c = loadCanvas.toDataURL();

		} else {
			person_c = $('#pImg img')[0].src;
		}

		var loadCanvas1 = document.getElementById("simple");
		context1 = loadCanvas1.getContext("2d");

		if($('#dImg img')[0].src == loadCanvas.toDataURL()) {

			person_b = loadCanvas.toDataURL();

		} else {

			person_b = $('#dImg img')[0].src;

		}
		var objml = {
			functionName: "NoneQuery",
			jsonStr: "[{\"jsonStr\":\"UPDATE [EAM_PMRepairReport] SET [ModifyDate]='" + getNowFormatDate() + "', [ModifyUserName]='" + usne + "', [ModifyUserId]='" + usid + "', [DeviceName]='" + equna + "', [ManufacturerId]= '" + makerId + "',[OrganizationName]='" + k_room + "', [OrganizationId]='" + slec + "',[RepairPerson]='" + contact + "', [RepairDate]='" + timeG + "',[DeviceId]='" + e_name + "', [DeviceCode]='" + num_name + "', [DeviceModel]= '" + nx_name + "',[ManufacturerName]='" + prM + "',[TroubleDescription]='" + phnm + "', [RepairParts]='" + mterail + "', [RepairResult]='" + result + "',[FinishDate]='" + timeS1 + "', [FinishState]='" + getStates() + "', [NoFinishReason]='" + fail + "', [AcceptanceOpinion]='" + suggest + "', [AcceptanceDate]='" + sucess + "',[CreateDate]='" + myDate.toLocaleDateString() + "',[AcceptancePerson]='" + person_c + "',[OverhaulPerson]='" + person_b + "'WHERE Id = '" + ids + "'\"}]"

		}
		AjaxFunction(objml, function(data) {
			var objt = {
				functionName: "NoneQuery",
				jsonStr: "[{\"jsonStr\":\"DELETE FROM [EAM_PMRepairParts] where PMRepairReportId='" + version + "'\"}]"

			}
			AjaxFunction(objt, function(data) {
				if(data.Code == 1) {
					var partList = "";
					var dataClass = document.getElementsByClassName('datas');
					$.each(dataClass, function(index, item) {
						var idpart = dataClass[index].firstElementChild.id;
						var indexdb = idpart.substring(9, idpart.length);

						partList += "('" + version + "','" + $("#PartsName" + indexdb).text() + "','" + $("#PartsPrice" + indexdb).val() + "','" + $("#PartsCount" + indexdb).val() + "','" + $("#PartsCode" + indexdb).text() + "','','" + preid + "'),";
					})
					var obje = {
						functionName: "NoneQuery",
						jsonStr: "[{\"jsonStr\":\"INSERT INTO [EAM_PMRepairParts]([PMRepairReportId], [PartsName], [PartsPrice], [PartsCount], [PartsCode], [Remark],[PartsId])VALUES " + partList.substring(0, partList.length - 1) + " \"}]"

					}
					AjaxFunction(obje, function(data) {
						if(data.Code == 1) {
							mui.toast('修改成功');

							//													获得详情页面
							var detailPage = plus.webview.getWebviewById('list');
							//触发详情页面的newsId事件
							mui.fire(detailPage, 'audit', {
								namee: usne,
								userId: usid
							});

							var ws = plus.webview.currentWebview();
							ws.close();

						} else {
							mui.toast('修改失败');
						}

					})

				}

			})

		})

		info.innerText = '';
	}

});