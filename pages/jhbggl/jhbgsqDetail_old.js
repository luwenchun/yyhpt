var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var ygldjdm="";
var flag="bgsq";
//个人基本信息页面赋值
function setGrForm(datas){
	console.log("计划变更申请");
	console.log(datas);
	$("#hzxm").text((datas.grjbxx)[0].XM);
	$("#xb").text((datas.grjbxx)[0].XB);
    if ( (datas.grjbxx)[0].CSRQ== '1900-01-01') {
        $('#csrq').val('');
    }else {
        $("#csrq").text((datas.grjbxx)[0].CSRQ);
    }
	$("#hzshfzhh").text((datas.grjbxx)[0].SFZH);
	$("#jzdz").text(((datas.grjbxx)[0].JZDZ)==null?'':(datas.grjbxx)[0].JZDZ);
	$("#lxdh").text(((datas.grjbxx)[0].LXDH)==null?'':(datas.grjbxx)[0].LXDH);
	
	
	djlsh = datas.djlsh;
	jhlsh = datas.jhlsh;
	yngrbsh = datas.yngrbsh;
	
    ygldjdm=datas.grjhbgsqxxs[0].YGLDJDM;
	var yydj=[];
	yydj=datas.yydj;
    if(datas.grjhbgsqxxs[0].YGLDJDM==null){
        $('#ygldjdmdiv').text(yydj[0].text);
    }else{
        for (var i = 0; i < yydj.length; i++) {
            var yyydjData = yydj[i];

            if(datas.grjhbgsqxxs[0].YGLDJDM==yyydjData.id){
                $('#ygldjdmdiv').text(yyydjData.text);
            }
        }
    }
}
//加载页面控件
function loadControl(data){
	
//	wn.createiRadioWidthByArray($('#ygldjdmdiv'), data.yydj, 'ygldjdm','ygldjmc',2);//原医养管理等级 
	wn.createiRadioWidthByArray($('#sqgldjdmdiv'), data.yydj, 'sqgldjdm','sqgldjmc',2);//申请医养管理等级
	wn.createiRadioWidthByArray($('#bgyydiv'), data.bgyy, 'bgyydm','bgyymc',5);//变更原因
	wn.createiRadioWidthByArray($('#shjgdiv'), data.shjg, 'shzt','shzts',6);//审核结果
	
	initTable();
}

$(function () {
	/**
	 * 初始化日期选择控件
	 */
	$('.choose-date').datepicker({
		format : 'yyyy-mm-dd',
		weekStart : 1,
		autoclose : true,
		todayBtn : 'linked',
		language : 'zh-CN'
	}).on('changeDate', function(ev) {
		// var ksrq = ev.date.mmdd();
	});
	var myDate = new Date();
	$("#sqrq").val(myDate.toLocaleDateString().replace('/','-').replace('/','-'));
	
	getRylist1();
});

function initTable() {
    //先销毁表格
    $("#table_jhbgsq").bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $("#table_jhbgsq").bootstrapTable({
        classes: 'table table-hover warning',
        method:"get",
        url : "yyhptjhbggl.do?action=yzdxm", // 获取数据的Servlet地址
//        data: obj.rows,
        contentType: "application/json",
        iconSize: 'sm',
        showHeader: true,
        height: 200,
        striped: true, // 表格显示条纹
        pagination: false, // 启动分页
        pageSize: 10, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [2], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        onlyInfoPagination: false,
        sidePagination: "server", // 表示服务端请求
        uniqueId: "JHMXLSH", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        showExport: true,
        exportDataType: "basic",
        minimumCountColumns: 2, // 最少允许的列数
        responseHandler: function (res) {
            dictData = res.dict;
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                djlsh: djlsh,
                jhlsh: jhlsh,
                yngrbsh: yngrbsh
            };
            return param;
        },
        columns: [ 
            {
        	   title: '序号',
               formatter: function (value, row, index) {
                   return index + 1;
               },
               align: 'center'
        	},
               
            {
                field: 'FWXMMC',
                title: '服务项目',
                align: 'left'
            },
            {
                field: 'FWPCMC',
                title: '服务频次',
                align: 'center'
            },
            {
                field: 'FWSL',
                title: '服务数量',
                align: 'center',
                visible:false
            },
            {
                field: 'FWHJ',
                title: '合计金额',
                align: 'center',
                visible:false
            },
            {
                field: 'ZDRQ',
                title: '制定日期',
                align: 'center'
            },
            {
                field: 'ZDRYXM',
                title: '制定人员',
                align: 'center'
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });
}

function getRylist1() {
	$.ajax({
		url : "common.do?action=getSysCzrylist",
		type : "post",
		dataType : "json",
		data : {
		},
		success : function(data) {
			rylist = data.czrys;
			// 初始化系统操作人员
			wn.createSelectByCZRYArray($("#sqrgh"), rylist);
			wn.createSelectByCZRYArray($("#shrgh"), rylist);
            console.log("哈哈哈哈");
            console.log(rybm);
            console.log($('#sqrgh').val(rybm));
            $('#sqrgh').val(rybm).trigger("change");
		}
	});
}

function loadJhbgYxfwbDatas(data) {
	//已选服务包
	var i=0;
	var html = '';
	$.each(data,function() {
		var syrqhtml; //适宜人群html展示
		var yxtctphtml; //已选套餐图片html展示
		if(this.SYRQ != undefined){
			syrqhtml = "<strong>"+this.SYRQ+"</strong>";
		}
		else {
			syrqhtml = "<strong>"+'无'+"</strong>";
		}
		if(this.FWBZT == '2'){//已执行
			yxtctphtml = "<div style='margin-top:30px;' title='已执行'><img src='images/icons/icon_yyh_select.png' /></div>";
		}
		else if(this.FWBZT == '3'){//已停止
			yxtctphtml = "<div style='margin-top:30px;' title='已停止'><img src='images/icons/icon_yyh_stop.png' /></div>";
		}
		else {//未执行
			yxtctphtml = "<div style='margin-top:30px;' title='点击移除'><img src='images/icons/icon_yyh_del.png' /></div>";
		}
        
		html += " <div class='col-lg-3 col-md-3'> "
			+"	<div class='panel panel-border-turquoise'>"
			+"		<div class='panel-heading' style = 'padding: 0px 15px 0px 15px;border-bottom: 1px;background-color:#FFFFFF;'>"						
	        +"          <div class='row' id='jhzdDiv' style = 'border-style:solid; border-width:1px; border-color:#00CED1;'>"			
			+"				<div  class='col-xs-4 col-md-4 panel-bg-turquoise' "
			+"					style = 'padding: 23px 5px 23px 5px;text-align:center;background-color: #00CED1;'>"
			+"						<a href='#' onclick='modelFunc_LookFwbmx(\""+this.FWBDM+"\",\"查看["+this.FWBMC+"]明细项目\","+this.CXBZ+",\""+this.JHFWBLSH+"\")'><strong style='color:#FFFFFF' title='点击查看明细'>" + this.FWBMC + "</strong></a>"
			+"				</div>"
			+"				<div class='col-xs-5 col-md-5' style = 'padding: 0px 0px 0px 10px;background-color:#FFFFFF;'>"
			+"					<div style='margin-top:10px'>"
			+						syrqhtml
			+"					</div>"
			+"					<h5 style='margin-top:10px;color:#00CED1;font-weight:bold;'>"+this.HJJG+"</h5>"
			+"				</div>"
			+"				<div class='col-xs-3 col-md-3 text-right' style='padding: 0px 10px 0px 0px;background-color:#FFFFFF;'>"
			+                      yxtctphtml
			+"				</div>"
			+"			</div>"
			+"		</div>"
			+"	</div>"
			+"</div>";
		i++;
	});
	$("#gryxtcpanel").html(html);
	$("#yxtccount").html('已选服务包('+i+'个)');
}

function modelFunc_LookFwbmx (row, mtitle, mflag,sjhfwbdm) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        data: {
            'data1': 'Orange'
        },
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhgl/fwbxmDetail.html'),
        buttons: [  {
            label: '取消',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            if (mflag == 2) {//展示基础服务包服务项目
                $.ajax({
                    url: 'yyhptjhgl.do?action=get_fwxm_details',
                    type: 'get',
                    dataType: 'json',
                    data: {fwbdm: row}

                }).done(function (datas) {
                    LoadContent(2,datas.jcfwbmx);

                }).fail(function () {
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            } else {//展示已选服务包服务项目
		         $.ajax({
		              url: 'yyhptjhgl.do?action=get_YxfwbFwxm_Details',
		              type: 'get',
		              dataType: 'json',
		              data: {jhfwblsh: sjhfwbdm
		            	  }
		          }).done(function (datas) {
		              LoadContent(1,datas.yxfwbmx);
		
		          }).fail(function () {
		              console.log("error");
		          }).always(function () {
		              console.log("complete");
		          });
            }
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
}

function LoadContent(iFlag,countents) {
    var str = "";
    var strHtml = "";
      var  fwxms = countents;
        if (fwxms != undefined && fwxms != null) {
            var k = fwxms.length;
            strHtml = "<div class='row'>";
            for (var i = 0; i < k; ++i) {
                strHtml += createFwxmHtml(i, fwxms[i]);
            }         
            strHtml += "</div>";
        }
        $("#tcdetail").html(strHtml);
}

function createFwxmHtml(index, jsonFwxm) {
    var strHtml;
    var fwpcHtml;
    var fwddHtml;
    if (index >= 0 && jsonFwxm != undefined && jsonFwxm != null) {
        if(jsonFwxm.FWPC != undefined ){
        	fwpcHtml = "<span class='pull-right'>" + jsonFwxm.FWPC + "</span>";
        } else {
        	fwpcHtml = "<span class='pull-right'></span>";
        }
        strHtml = "  <div id='id=id_" + jsonFwxm.XMDM + "' class='col-sm-4'>"
            + "      <div class='box box-green' style='background:#97FFFF; color:#FFFF'>"
            + "          <div class='box-header with-border border-green '>"
            + "                <h3 class='box-title'><strong>" + jsonFwxm.XMMC + "</strong></h3>"
            +                  fwpcHtml
            + "           </div>"
            + "           <div class='box-body'>"
            + "                <div id='id_hjjgDisplay_" + jsonFwxm.XMDM + "' class='col-sm-12'>"
            + "                     <strong><strong></strong><i class='fa fa-rmb'></i>" + jsonFwxm.FYDJ + " x " + jsonFwxm.SL + "次" + " = <i class='fa fa-rmb'></i>" + (jsonFwxm.FYDJ * jsonFwxm.SL).toFixed(1) + "</strong></p>"
            + "                </div>"
            + "           </div>"
            + "     </div>"
            + "   </div>";
    }
    return strHtml;
}

var saveForm = function() {
	var submitData = function(t, bgsqlsh, yngrbsh,djlsh,yjhlsh) {
		var form1 = $('#defaultForm');
		form1.validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block help-block-error', // default input error
														// message class
			focusInvalid : false, // do not focus the last invalid input
			ignore : "", // validate all fields including form hidden input
			messages : {
				sqrygh : {
					required : "申请人必填"
				},
				sqrq : {
					required : "集体评审日期"
				}
			},
			rules : {
				sqrygh : {
					required : true
				},
				sqrq : {
					required : true
				}
			},

			// highLight error inputs
			highlight : function(element) {
				// set error class to the control group
				$(element).closest('.form-group').addClass('has-error');
			},

			invalidHandler : function(event, validator) {
				// display error alert on form submit
				$('.alert-danger', $('.form-horizontal')).show();
			},
			success : function(label) {
				label.closest('.form-group').removeClass('has-error'); 
			},
			submitHandler : function(form) {
				var datas = wn.fillWithForm("defaultForm");
				datas += '&yngrbsh=' + yngrbsh
				 +'&bgsqlsh='+bgsqlsh
				 +'&djlsh='+djlsh
				 +'&yjhlsh='+yjhlsh
                 +'&ygldjdm='+ygldjdm
                 +'&flag='+flag

				var datass = datas.replace(/undefined/, '');
                var flayType=true;
                if($("input[name='bgyymc']:checked").val()=="1"){
                    if(ygldjdm==$("input[name='sqgldjmc']:checked").val()){
                        // wnform.toast('申请等级没有变化!');
                        flayType=true;
                    }else{
                        flayType=false;
                    }
                }else{
                    flayType=false;
                }

                if(flayType){
                    wnform.toast('申请管理等级没有变化!');
                    return false;
                }else{
                    console.log('datas:' + datas);
                    var Url = "yyhptjhbggl.do?action=saveJhbgsq";
                    $.ajax({
                        url : Url,
                        type : "post",
                        dataType : "json",
                        data : datass,
                        success : function(result) {
                            if (result.code == "T") {
                                $.toaster({
                                    priority : 'info',
                                    title : '提示',
                                    message : result.message
                                });
                                t.close();
                                $table.bootstrapTable('refresh');
                            } else {
                                $.toaster({
                                    priority : 'warning',
                                    title : '提示',
                                    message : result.message
                                });
                            }
                        }
                    });

                }
			}
		});
	};
	return {
		// main function to initiate the module
		init : function(t, bgsqlsh, yngrbsh,djlsh,yjhlsh) {
			submitData(t, bgsqlsh, yngrbsh,djlsh,yjhlsh);
		}
	};
}();

function initForm(row) {
    $.each(row, function (k, v) {
        var obj = $('#' + k.toLowerCase());
            if (obj.length > 0) {
                type = obj.attr("type");
                if (type == 'text') {
                	
                } else if (type == 'radio') {
                    k = k.replace('DM', 'MC');
                    k = k.replace('SHZT', 'SHZTS');
                    $("input[value='" + v + "'][name='" + k.toLowerCase() + "']").attr("checked", "checked");
                    $("input[name='" + k.toLowerCase() + "']").iCheck({
                        checkboxClass: 'icheckbox_flat-wnred',
                        radioClass: 'iradio_flat-wnred',
                        increaseArea: '20%'
                    });
                } else if (type == undefined) {
//                    var tagname = obj.get(0).tagName.toLowerCase();
//                    if (tagname == "select") {
//                    	alert("select");
//                    	alert(v);
//                    	obj.val(v).trigger('change');
//                    	alert("222");
//                    } else if (tagname == "textarea") {
//                        obj.val(v);
//                    }
                }
            }
        
    });
    var myDate = new Date();
    myDate.toLocaleDateString();
    $("#bgyysm").val(row.BGYYSM);
    if(row.SQRQ != null){
    	$("#sqrq").val(row.SQRQ);
    }
    $("#shbtgyy").val(row.SHBTGYY);
    $("#shrq").val(row.SHRQ);
    // $("#shrgh").val(row.SHRGH).trigger("change");
    // $("#sqrgh").val(row.SQRGH).trigger("change");
    //wn.select2Set("#shrgh", row.SHRGH);
	if (row.BGSQLSH.length != 0 && row.BGSQLSH !=''){
		$('#shpanel').removeClass("hidden");
	} else {
		$('#shpanel').addClass("hidden");
	}
}