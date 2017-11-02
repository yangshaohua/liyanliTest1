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
			var mibd;
			var pids;
			var mmid;
			var ids;
			var bimp;
			var sql;
			var version;
			var makerId;
			var row = [];
			var html;
			var myDate = new Date();
			var $table = jQuery("#table");

			(function($, doc) {

				$.init();
				$.plusReady(function() {
					//plus.screen.lockOrientation("portrait-primary");
					var self = plus.webview.currentWebview();
					version = self.version;

					function search() {
						var myselect = document.getElementById("slect");
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
						var slec = document.getElementById('slect').value;

						jQuery.ajax({
							type: 'post',
							url: urls,
							data: {
								functionName: "QueryList",
								jsonStr: "[{\"jsonStr\":\"SELECT [Id],[DeviceId],[OrganizationName],[RepairPerson], [RepairDate],[DeviceName], [DeviceCode], [DeviceModel],[ManufacturerName],[TroubleDescription], [RepairParts], [RepairResult],[FinishDate], [FinishState], [NoFinishReason], [AcceptanceOpinion], [AcceptanceDate],[AcceptancePerson],[OverhaulPerson] FROM [EAM_PMRepairReport] WHERE Id= '" + version + "'\"}]"
							},
							//sql语句按照json格式进行传递
							crossDomain: true,
							dataType: 'json',
							success: function(data) {
								//								console.log(data.Code)
								ids = JSON.parse(data.Datas).QueryList[0].Id;
								idb = JSON.parse(data.Datas).QueryList[0].RepairParts;
								var img = document.createElement('img');
								var imgs = document.createElement('img');
								img.src = JSON.parse(data.Datas).QueryList[0].AcceptancePerson;
								img.style.width = '100px';
								img.style.height = '40px';
								imgs.src = JSON.parse(data.Datas).QueryList[0].OverhaulPerson;
								imgs.style.width = '100px';
								imgs.style.height = '40px';

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
								if(JSON.parse(data.Datas).QueryList[0].FinishState == 'True') {
									var timef = new Date(JSON.parse(data.Datas).QueryList[0].FinishDate).Format("yyyy-MM-dd");
									document.getElementById("timeS1").value = timef;
									document.getElementById("complete").checked = JSON.parse(data.Datas).QueryList[0].FinishState;
								} else if(JSON.parse(data.Datas).QueryList[0].FinishState == 'False') {
									document.getElementById("sq4").checked = JSON.parse(data.Datas).QueryList[0].FinishState;
									document.getElementById("timeS1").value = " ";
								}

								myselect.options[index].innerHTML = JSON.parse(data.Datas).QueryList[0].OrganizationName;
								mysel.options[inde].innerHTML = JSON.parse(data.Datas).QueryList[0].DeviceName;
								var htmls = "";
								jQuery.ajax({

									type: 'post',
									url: urls,
									data: {
										functionName: "QueryList",
										jsonStr: "[{\"jsonStr\":\"SELECT * FROM [EAM_PMRepairParts] WHERE PMRepairReportId= '" + version + "'\"}]"
									}, //sql语句按照json格式进行传递
									crossDomain: true,
									dataType: 'json',
									success: function(data) {
										//										console.log(data.Datas)
										if(data.Code == 1) {
											//											console.log(version)
											//																				
											var dataList = JSON.parse(data.Datas);
											$.each(dataList.QueryList, function(index, item) {
												htmls += '<li class="mui-table-view-cell" id="' + version + '">\
												<ol class="datas">\
													<li style="margin-top:1.2%;margin-left:2.3% " class="PartsName" id="PartsName' + index + '">' + item.PartsName + '</li>\
													<li style="margin-top:1.2%;width:31%" class="PartsCode" id="PartsCode' + index + '">' + item.PartsCode + '</li>\
													<li style="margin-left:-0.5%"><input readonly="true"  type="text" class="PartsPrice" id="PartsPrice' + index + '" value="' + item.PartsPrice + '"/></li>\
													<li style="margin-left: 4%;"><div class="mui-numbox">\
														<button id="decrease"  class="mui-btn mui-btn-numbox-minus" type="button">-</button>\
														<input readonly="true"  type="number" class="PartsCount mui-input-numbox" id="PartsCount' + index + '" value="' + item.PartsCount + '"/>\
														<button id="increase" class="mui-btn mui-btn-numbox-plus" type="button">+</button></div></li>\
													</ol>\
												</li>'
											})
										}

										document.getElementById('OA_task_1').innerHTML = htmls

									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										console.log(XMLHttpRequest.status);
										console.log(XMLHttpRequest.readyState);
										console.log(textStatus);
									}
								});

							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								console.log(XMLHttpRequest.status);
								console.log(XMLHttpRequest.readyState);
								console.log(textStatus);

							}
						});
					};

					search(version)
				});

			}(mui, document));

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