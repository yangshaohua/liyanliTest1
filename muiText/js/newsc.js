var signFlag = true;
			var ms13;
			var mid;
			var cons;
			var pids;
			var mibd;
			var mmid;
			var userId;
			var namee;
			var usne;
			var pda;
			var self;
			var usid;
			var preid;
			var makerId;
			var indexmt = 0;
			var myDate = new Date()

			var canvas = null,
				context = null;

			$('.recover').bind('tap', function() {
				$('#signModal').css('display', "none")
			})
			$('.recover1').bind('tap', function() {
				$('.myList').css('display', "none")
			});
			$('#confirmBtnfalse').bind('click', function() {
				$('.myList').css('display', "none")
			})
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
				return '无'
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
					var objml = {
						functionName: "NoneQuery",
						jsonStr: "[{\"jsonStr\":\"SELECT [Id],[PartsId],[PartsName],[PartsCode],[PartsPrice],[PartsCount],[PartsAllPrice],[Remark],[PMRepairReportId] FROM [EAM_PMRepairParts]\"}]"

					}
					AjaxFunction(objml, function(data) {

						console.log(data.Datas)
					})

				})

			}

			var pIndex = 0;
			var e_name = document.getElementById("e_name");
			var num_name = document.getElementById("num_name");
			var nx_name = document.getElementById("nx_name");

			(function($, doc) {
				$.init();
				$.plusReady(function() {
					plus.screen.lockOrientation("portrait-primary");
					self = plus.webview.currentWebview();
					usid = self.ids;
					usne = self.namee;
					cons = self.version
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
								idp: "newsc.html"
							}

						});

					})
					window.addEventListener("baInfo", function(event) {
						var deNumber = document.getElementById("num_name"); //机身编号
						var deviceName = document.getElementsByClassName("filter-option")[1];
						var prM = document.getElementById("prM");
						var deTnumber = document.getElementById("nx_name");
						deNumber.value = event.detail.baId;
						console.log(deNumber.value)
						if(event.detail.baId != "") {
							var objd = {
								functionName: "QueryList",
								jsonStr: "[{\"jsonStr\":\"select * from eam_device where DeviceCode='" + event.detail.baId + "'\"}]"

							}
							AjaxFunction(objd, function(data) {
								console.log("[{'jsonStr':'select * from eam_device where DeviceCode='" + event.detail.baId + "'}]")
								deTnumber.value = JSON.parse(data.Datas).QueryList[0].DeviceModel;
								prM.value = JSON.parse(data.Datas).QueryList[0].ManufacturerName;
								deviceName.innerHTML = JSON.parse(data.Datas).QueryList[0].DeviceName
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

				});
				//search()
				var dheight = jQuery(this).height() * 0.46;

				// 搜索
				ajas()
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
						

					}, {
						title: '请选择日期',
						date: dDate,
						minDate: minDate,
						maxDate: maxDate
					});
				});

				// 完成的日期
				document.getElementById("ov").addEventListener('click', function() {
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
							

					}, {
						title: '请选择日期',
						date: dDate,
						minDate: minDate,
						maxDate: maxDate
					});
				});
				// 默认日期
				var dDate = new Date();
				var minDate = new Date();
				timep = document.getElementById('timeS1');
				var timepps = document.getElementById('timeS');
				var timeps = document.getElementById('timeS2');
				timep.value = new Date(minDate).Format("yyyy-MM-dd");
				timeps.value = new Date(minDate).Format("yyyy-MM-dd");
				timepps.value = new Date(minDate).Format("yyyy-MM-dd");

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

			function ajas() {
				var ping = document.getElementsByClassName('form-control')[0];

				var objs = {
					functionName: "QueryList",
					jsonStr: "[{'jsonStr':'select Organizationid,FullName,ShortName FROM Auth_Organization WHERE Organizationid not in (select parentId from Auth_Organization) '}]"
				}

				AjaxFunction(objs, function(data) {
					if(data.Code == 1) {
						if(data.Datas == '{"QueryList":]}') {
							return;
						} else {
							var obj = JSON.parse(data.Datas).QueryList;
							var html = "";
							$.each(obj, function(index, item) {
								var shortName = item.ShortName.split(',');
								html += '<option value="' + this.Organizationid + '">' + obj[index].FullName + '-' + shortName[0] + '</option>'

							});

							document.getElementById("lunchs").innerHTML = html;
						}

					}

				})

			}

			function hid() {
				fobid.disabled = true
			};

			function appear() {
				fobid.disabled = false;

			}
			$("#seld #lunchs").change(function() {
				mid = this.value
				var objs = {
					functionName: "QueryList",
					jsonStr: '[{"jsonStr":"select * from eam_device where OrganizationId=\'' + mid + '\'"}]'
				};
				AjaxFunction(objs, function(data) {
					if(data.Code == 1) {
						if(data.Datas == '{"QueryList":]}') {
							document.getElementsByClassName("filter-option")[1].innerHTML = '';
							document.getElementById("nx_name").value = " ";
							document.getElementById("num_name").value = " ";
							document.getElementById("prM").value = " ";
							$('#lunch1').find('.dele').remove();
							$('#lunch1').selectpicker('refresh');

							return;
						} else {
							document.getElementsByClassName("filter-option")[1].innerHTML = '';
							document.getElementById("nx_name").value = " ";
							document.getElementById("num_name").value = " ";
							document.getElementById("prM").value = " ";
							var equName = JSON.parse(data.Datas).QueryList;
							var htmls = "";
							$.each(equName, function(index, item) {

								var shortName = item.DeviceNamePing.split(',');
								
								htmls += '<option class="dele" value="' + equName[index].Id + '">' + equName[index].DeviceName + '-' + shortName[0] + '</option>'
									
							});
							document.getElementById("lunch1").innerHTML = htmls;
						}

						$('#lunch1').selectpicker('refresh');
					}
				})

			})

			$("#e_name select").change(function() {
				
				mmid = this.value
					
				var objs = {
					functionName: "QueryList",
					jsonStr: '[{"jsonStr":"select  ManufacturerId,ManufacturerName,DeviceCode,DeviceModel from eam_device where id=\'' + mmid + '\'"}]'

				}

				AjaxFunction(objs, function(data) {
					if(data.Code == 1) {
						if(data.Datas == '{"QueryList":]}') {
							return;
						} else {
							var eqName = JSON.parse(data.Datas).QueryList;
							makerId = eqName[0].ManufacturerId;

							document.getElementById("num_name").value = eqName[0].DeviceCode;
							document.getElementById("nx_name").value = eqName[0].DeviceModel;
							document.getElementById("prM").value = eqName[0].ManufacturerName;
						}

					}
				})

			})

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

			$("#btns").bind('click', function() {
				$(".myList").css('display', 'block');

				function searPart() {

					var objs = {
						functionName: "QueryList",
						jsonStr: "[{\"jsonStr\":\"SELECT [Id],[PartsId],[PartsName],[PartsCode],[PartsPrice],[PartsCount],[PartsAllPrice],[Remark],[PMRepairReportId] FROM [EAM_PMRepairParts]\"}]"

					}

					AjaxFunction(objs, function(data) {
						if(data.Datas == "") {
							var ary = JSON.parse(data.Datas).QueryList;
							var tables;
							$.each(ary, function(index) {
								mibd = JSON.parse(data.Datas).QueryList[index].Id;

								tables += '<li class="mui-table-view-cell" id="' + mibd + '">\
											<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div>\
											<div class="mui-slider-handle">\
												<ol class="datas" >\
												<li class="PartsName" id="PartsName">' + JSON.parse(data.Datas).QueryList[0].PartsName + '</li>\
												<li><input type="text" class="PartsPrice" value="' + JSON.parse(data.Datas).QueryList[0].PartsPrice + '"/></li>\
													<li style="margin-left: -1%;"><input  type="text" class="PartsCount" value="' + JSON.parse(data.Datas).QueryList[0].PartsCount + '"/></li>\
													<li class="PartsCode">' + JSON.parse(data.Datas).QueryList[0].PartsCode + '</li>\
													<li><input type="text" class="Remark" value="' + JSON.parse(data.Datas).QueryList[0].Remark + '"/></li></ol></div>\
												</li>'

							});

						}

					})

				}
				searPart();
				InitTable(sql);

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
						if(data.Code == 1) {
							if(data.Datas == '{"QueryList":]}') {
								return;
							} else {
								preid = JSON.parse(data.Datas).QueryList[0].Id;

								indexmt = indexmt + 1;
								var mb = JSON.parse(data.Datas).QueryList[0].StorageAllNumber;
								if(mb == "" || mb == null) {
									mb = 0;
								}
								htmls += '<li class="mui-table-view-cell" id="' + bimp + '">\
											<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div>\
											<div class="mui-slider-handle">\
												<ol class="datas" >\
													<li class="PartsName" style="margin-top:1.2%;margin-left:2.3%" id="PartsName' + indexmt + '">' + JSON.parse(data.Datas).QueryList[0].DeviceName + '</li>\
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
							}

						}

					})

				})

			});

			//右滑删除

			$('#OA_task_1').on('tap', '.mui-disabled .mui-btn', function(event) {
				var elem = this;
				var li = elem.parentNode.parentNode;

				li.parentNode.removeChild(li);

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
				
				if(val == 1) {

					return 1;
				} else {
					return 0;
				}
			};
			(function($, doc) {
				
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

				});
			}(mui, document));
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

			var info = document.getElementById("info");
			document.getElementById("confirmBtn").addEventListener('tap', function() {
				var btnArray = ['否', '是'];
				var mos = getStates();
				if(mos == '1') {

					var k_room = (document.getElementsByClassName("filter-option")[0].innerHTML).replace(/[^\u4e00-\u9fa5]/gi, "");
					if(k_room == "") {
						mui.toast('科室名称不能为空');
						return;
					}
					var equna = (document.getElementsByClassName("filter-option")[1].innerHTML).replace(/[^\u4e00-\u9fa5]/gi, "");
					if(equna == "") {
						mui.toast('设备名称不能为空');
						return;
					}
					var contact = document.getElementById('sq0').value;
					if(contact == "") {

						mui.toast('联系人不能为空');
						return;

					}

					var dataClass = document.getElementsByClassName('datas');
					if(dataClass.length == 0) {
						mui.toast('配件不能为空');
						return;
					}
					var timeS1 = document.getElementById("timeS1").value;
					if(timeS1.value == "") {
						mui.toast("完成日期不能为空");
						return;
					}
					if($('#pImg').children('img').length == 0) {

						mui.toast("验收人不能为空");
						return;

					}
					if($('#dImg').children('img').length == 0) {
						mui.toast("检修人不能为空");
						return;

					}
					mui.confirm('当前设备维修工作已经完成，提交后将无法修改。确认提交？', '保存', btnArray, function(e) {
						if(e.index == 1) {

							var guidOne = newGuid();
							var gudsn = newGuid();
							var partList = "";

							$.each(dataClass, function(index, item) {
									var idpart = dataClass[index].firstElementChild.id;

									var indexdb = idpart.substring(9, idpart.length);
									partList += "('" + guidOne + "','" + $("#PartsName" + indexdb).text() + "','" + $("#PartsPrice" + indexdb).val() + "','" + $("#PartsCount" + indexdb).val() + "','" + $("#PartsCode" + indexdb).text() + "','','" + preid + "'),";
								})
								//数据存储

							var timeG = document.getElementById("timeS").value;
							var e_name = document.getElementById("lunch1").value;

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

							var nowday = getNowFormatDate();
							var uid = usid;
							var usnames = usne;
							// 转化base64 编码
							var loadCanvas = document.getElementById("simple");
							context = loadCanvas.getContext("2d");
							if($('#pImg').children('img').length == 0) {
								person_c = loadCanvas.toDataURL();

							} else {
								person_c = $('#pImg img')[0].src;
							}

							var loadCanvas1 = document.getElementById("simple");
							context1 = loadCanvas1.getContext("2d");
							if($('#dImg').children('img').length == 0) {

								person_b = loadCanvas.toDataURL();
							} else {

								person_b = $('#dImg img')[0].src;
							}

							var msg;

							//添加记录	
							var objn = {
								functionName: "NoneQuery",
								jsonStr: "[{\"jsonStr\":\"INSERT INTO [EAM_PMRepairReport]([Id],[OrganizationId],[RepairPerson], [RepairDate],[DeviceId], [DeviceCode], [DeviceModel],[ManufacturerName],[TroubleDescription], [RepairParts], [RepairResult],[FinishDate], [FinishState], [NoFinishReason], [AcceptanceOpinion], [AcceptanceDate],[CreateDate],[AcceptancePerson],[OverhaulPerson],[OrganizationName],[ManufacturerId],[DeviceName],[CreateUserId],[CreateUserName])VALUES('" + guidOne + "', '" + slec + "', '" + contact + "', '" + timeG + "', '" + e_name + "', '" + num_name + "', '" + nx_name + "', '" + prM + "' , '" + phnm + "', '" + mterail + "','" + result + "', '" + timeS1 + "', '" + getStates() + "', '" + fail + "', '" + suggest + "', '" + sucess + "', '" + nowday + "', '" + person_c + "', '" + person_b + "','" + k_room + "','" + makerId + "','" + equna + "','" + uid + "','" + usnames + "')\"}]"

							}

							AjaxFunction(objn, function(data) {
								var objm = {
									functionName: "NoneQuery",
									jsonStr: "[{\"jsonStr\":\"INSERT INTO [EAM_PMRepairParts] ( [PMRepairReportId], [PartsName], [PartsPrice], [PartsCount], [PartsCode], [Remark],[PartsId])VALUES " + partList.substring(0, partList.length - 1) + " \"}]"

								}

								AjaxFunction(objm, function(data) {
									if(data.Code == 1) {

										mui.toast('保存成功');

										//获得详情页面
										var detailPage = plus.webview.getWebviewById('list');
										//触发详情页面的newsId事件
										mui.fire(detailPage, 'audit', {
											namee: usne,
											userId: usid
										});

										var ws = plus.webview.currentWebview();
										ws.close();

									} else {
										mui.toast('保存失败');
									}

								})

							})

							info.innerText = '';
						} else {

							info.innerText = ''
						}
					})
				}
				if(mos == '0') {
					var contact = document.getElementById('sq0').value;
					if(contact == "") {
						mui.toast('联系人不能为空');
						return;

					}

					var dataClass = document.getElementsByClassName('datas');
					if(dataClass.length == 0) {
						mui.toast('配件不能为空');
						return;
					}
					var guidOne = newGuid();
					var gudsn = newGuid();

					var partList = "";

					$.each(dataClass, function(index, item) {
						var idpart = dataClass[index].firstElementChild.id;

						var indexdb = idpart.substring(9, idpart.length);
						partList += "('" + guidOne + "','" + $("#PartsName" + indexdb).text() + "','" + $("#PartsPrice" + indexdb).val() + "','" + $("#PartsCount" + indexdb).val() + "','" + $("#PartsCode" + indexdb).text() + "','','" + preid + "'),";
					})

					//数据存储
					var k_room = (document.getElementsByClassName("filter-option")[0].innerHTML).replace(/[^\u4e00-\u9fa5]/gi, "");
					var equna = (document.getElementsByClassName("filter-option")[1].innerHTML).replace(/[^\u4e00-\u9fa5]/gi, "");

					var timeG = document.getElementById("timeS").value;
					var e_name = document.getElementById("lunch1").value;
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
					var nowday = getNowFormatDate();
					var uid = usid;
					var usnames = usne;

					// 转化base64 编码
					var loadCanvas = document.getElementById("simple");
					context = loadCanvas.getContext("2d");
					console.log(loadCanvas.toDataURL())

					if($('#pImg').children('img').length == 0) {
						person_c = loadCanvas.toDataURL();

					} else {
						person_c = $('#pImg img')[0].src;
					}

					var loadCanvas1 = document.getElementById("simple");
					context1 = loadCanvas1.getContext("2d");
					if($('#dImg').children('img').length == 0) {

						person_b = loadCanvas.toDataURL();

					} else {

						person_b = $('#dImg img')[0].src;
					}

					var msg;

					//添加记录	
					var objs = {
						functionName: "NoneQuery",
						jsonStr: "[{\"jsonStr\":\"INSERT INTO [EAM_PMRepairReport]([Id],[OrganizationId],[RepairPerson], [RepairDate],[DeviceId], [DeviceCode], [DeviceModel],[ManufacturerName],[TroubleDescription], [RepairParts], [RepairResult],[FinishDate], [FinishState], [NoFinishReason], [AcceptanceOpinion], [AcceptanceDate],[CreateDate],[AcceptancePerson],[OverhaulPerson],[OrganizationName],[ManufacturerId],[DeviceName],[CreateUserId],[CreateUserName])VALUES('" + guidOne + "', '" + slec + "', '" + contact + "', '" + timeG + "', '" + e_name + "', '" + num_name + "', '" + nx_name + "', '" + prM + "' , '" + phnm + "', '" + mterail + "','" + result + "', '" + timeS1 + "', '" + getStates() + "', '" + fail + "', '" + suggest + "', '" + sucess + "', '" + nowday + "', '" + person_c + "', '" + person_b + "','" + k_room + "','" + makerId + "','" + equna + "','" + uid + "','" + usnames + "')\"}]"

					}
					AjaxFunction(objs, function(data) {
						var objl = {
							functionName: "NoneQuery",
							jsonStr: "[{\"jsonStr\":\"INSERT INTO [EAM_PMRepairParts]( [PMRepairReportId], [PartsName], [PartsPrice], [PartsCount], [PartsCode], [Remark],[PartsId])VALUES " + partList.substring(0, partList.length - 1) + " \"}]"

						}

						AjaxFunction(objl, function(data) {
							console.log("[{\"jsonStr\":\"INSERT INTO [EAM_PMRepairParts]([PMRepairReportId], [PartsName], [PartsPrice], [PartsCount], [PartsCode], [Remark],[PartsId])VALUES " + partList.substring(0, partList.length - 1) + " \"}]")

							if(data.Code == 1) {

								mui.toast('保存成功');

								//获得详情页面
								var detailPage = plus.webview.getWebviewById('list');
								//触发详情页面的newsId事件
								mui.fire(detailPage, 'audit', {
									namee: usne,
									userId: usid
								});

								var ws = plus.webview.currentWebview();
								ws.close();

							} else {
								mui.toast('保存失败');
							}

						})

					})

					info.innerText = '';

				}

			});