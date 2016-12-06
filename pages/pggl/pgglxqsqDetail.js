// 居住地址
var residentAddress = '';
var basicData = {};
$(function () {
    $('.datetimepickers').datepicker({
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        format: "yyyy-mm-dd", //选择日期后，文本框显示的日期格式
        language: 'zh-CN', //汉化
        autoclose: true //选择日期后自动关闭
    });
    $('#id_xzz_copy').bind('click', function () {
//    	$('#id_jzdxxdz').citypicker('destroy');
    	var liveAddress = $('#id_jzdxxdz').val();
    	console.log(liveAddress.replaceAll('/', ''));
    	liveAddress = liveAddress.replaceAll('/', '');
    	$('#id_sxxxdz').val(liveAddress+$('#id_jzds').val());
    	$('#id_jzdxxdz').citypicker();
    });
//    setDefaultLocation();
    setDictDatas(editRow.YNGRBSH);
});


function setDictDatas(value) {
    console.log(value);
    $.ajax({
        url: "yyhptpggl.do?action=getXqsqPageDatas",
        type: "post",
        dataType: "json",
        data: {yngrbsh: value},
        beforeSend: function () {
//             wn.showLoading();
        },
        success: function (res) {
        	console.log('getXqsqPageDatas...');
            console.log(res);
        	initButtons(res);
        	fillPageDatas(res);
        },
        complete: function () {
//             wn.hiddenLoading();
        }

    });
}

function initButtons(res){
    basicData = res.kzInfos;
    var baseDada = res.baseDatas;
    createiRadioByArray($("#hyzkDiv"), basicData.maritalStatus,'hyzkdm','hyzkmc');//婚姻状况
    createSelectByDDLArray($("#zlxdm"), basicData.cards);		//[个人信息]----->[证类型]
    createSelectByDDLArray($("#pozjlxdm"), basicData.cards);		//[配偶情况]----->[证类型]
    createSelectByDDLArray($("#sqrzjlxdm"), basicData.cards); //[申请信息]----->[证类型]

    createSelectByDDLArray($("#klxdm"), basicData.insuranceCards);//[个人信息]----->[卡类型]
    createSelectByDDLArray($("#poklxdm"), basicData.insuranceCards);//[配偶情况]----->[卡类型]
    createSelectByDDLArray($("#sqrklxdm"), basicData.insuranceCards);//[申请信息]----->[卡类型]

    var djbz = [{id: '1', text: '是'}, {id: '0', text: '否'}];
    createiRadioByArray($("#djbzDiv"), djbz, "djbz", 'djbzmc');


    createiRadioByArray($("#ylrgxDiv"), basicData.guardian, "ylrgxdm","ylrgxmc");//与老人关系
    var pglx = basicData.rowsPglx;
    createiRadioByArray($("#pglxDiv"), basicData.rowsPglx, "pglxdm", 'pglxmc');//评估类型
    var sjd = [{id: '1', text: '上午'}, {id: '2', text: '下午'}];
    createiRadioByArray($("#yysjdDiv"), sjd, "yysjddm", 'yysjdmc');			   //预约时间段
}

function fillPageDatas(res){
	var pageDatas = res.baseDatas[0];
	var pageData4Xqsq = res.pageData;
	var personalCards = res.personalCards;
	
    if (pageData4Xqsq != null){
        console.log('in filePageDatas');
        initAddress(pageData4Xqsq);
        initFormFillData(pageData4Xqsq);
    } else {
        console.log("out ")
        initAddress(pageDatas);
        initFormFillData(pageDatas);
    }
	
	if (personalCards) {
        $.each(personalCards, function (index, value) {
            if (value.KZBZ === '1') {
                $('#id_zhm').val(value.KZHM);
                $('#zlxdm').val(value.KZLXDM).trigger("change");
            } else if (value.KZBZ === '0') {
                $('#klxdm').val(value.KZLXDM).trigger("change");
                $('#id_khm').val(value.KZHM);
            }
        })
    }
	$('#id_sqrxm').val($('#id_xm').html());
	$('#id_sqrdhhm').val($('#id_dhhm').val());
	$('#sqrzjlxdm').val($('#zlxdm').val());
	$('#id_sqrzjhm').val($('#id_zhm').val());
	$('#sqrklxdm').val($('#klxdm').val());
	$('#id_sqrkh').val($('#id_khm').val());
}

function doSave(t){
	if (residentAddress === '') {
        console.log('permanentAddress is empty');
        var fnPrepareAddress2Save = function (obj, type) {
            var str = "";
            $.each(obj, function (k, v) {
                if (v.code) {
                    if (k === 'province') {
                        str += '&' + type + 'ssbm' + '=' + v.code;
                        str += '&' + type + 'ssmc' + '=' + v.name;

                    } else if (k === 'city') {
                        str += '&' + type + 'dsbm' + '=' + v.code;
                        str += '&' + type + 'dsmc' + '=' + v.name;
                    } else if (k === 'district') {
                        str += '&' + type + 'qxbm' + '=' + v.code;
                        str += '&' + type + 'qxmc' + '=' + v.name;
                    }
                    else if (k === 'town') {
                        str += '&' + type + 'jdbm' + '=' + v.code;
                        str += '&' + type + 'jdmc' + '=' + v.name;
                    }
                    else if (k === 'village') {
                        str += '&' + type + 'cbm' + '=' + v.code;
                        str += '&' + type + 'cmc' + '=' + v.name;
                    }
                    else if (k === 'committee') {
                        str += '&' + type + 'jwbm' + '=' + v.code;
                        str += '&' + type + 'jwmc' + '=' + v.name;
                    }
                }
            });
            return str;
        };
        var picker_jz = $('#id_jzdxxdz');
        residentAddress = fnPrepareAddress2Save(picker_jz.citypicker('getAllVal'), 'jzd');
    }
	xqsqForm.init(t, yngrbsh);
    $('#defaultForm').submit();
}

function initAddress(row) {
    console.log('>>>>>>>>>>>>>initAddress')
    console.log(row)
    var picker_jz = $('#id_jzdxxdz');
    if (row) {
        console.log('in initAddress')
        picker_jz.citypicker({
            province: row.jzdssmc,
            city: row.jzddsmc,
            district: row.jzdqxmc,
            town: row.jzdjdmc,
            village: row.jzdcmc,
            committee: row.jzdjdmc
        });
    } else {
        picker_jz.citypicker();
    }
}

function setDefaultLocation() {
    $.ajax({
        url: "personal_info.do?action=get_default_location",
        type: "post",
        dataType: "text",
        data: {},
        beforeSend: function () {
//             wn.showLoading();
        },
        success: function (res) {
        	console.log('设置默认地址');
        	console.log(res);
            if ($.parseJSON(res).length > 0) {
                var address = $.parseJSON(res)[0];
                var picker_jz = $('#id_jzdxxdz');
                picker_jz.val('');
                picker_jz.citypicker('destroy');
                picker_jz.citypicker('destroy');
                picker_jz.citypicker({
                    province: address.a1,
                    city: address.b1,
                    district: address.c1,
                    town: address.d1,
                    village: address.e1,
                    committee: address.f1
                });
            }
        },
        complete: function () {
//             wn.hiddenLoading();
        }
    });
}

var xqsqForm = function () {
    var submitData = function (t, value) {
        var form1 = $('#defaultForm');
        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",  // validate all fields including form hidden input
            messages: {
            	 id_yyrq: {
            		 required: "预约日期必填."
                 },
            },
            rules: {
            	 id_yyrq: {
            		 required: true
                 },
            },
            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                $('.alert-danger', $('.form-horizontal')).show();
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
//            	saveXqsqInfo();
                var jzd = $('#id_jzdxxdz');
                simplifyAddress(jzd);
                var datas = wn.fillWithForm("defaultForm");
                datas += residentAddress;
                
                console.log(residentAddress);
                
                console.log('datas:::::>' + datas);
                datas = datas.replace("--请选择--", "");
                datas = datas.replace("请选择", "");
                datas += "&yngrbsh=" + yngrbsh;
                datas += '&sqlsh=' + sqlsh;
                datas = datas.replace("&id_gryljsr=&", "&");
                datas = datas.replace("&id_qtsr=&", "&");
                datas = datas.replace("&id_sndmzbtsr=&", "&");
                datas = datas.replace("&id_ponl=&", "&");
                datas = datas.replace("&id_znrs=&", "&");
                datas = datas.replace("&id_xdjmrs=&", "&");
                datas = datas.replace("&id_sbrs=&", "&");
                datas = datas.replace("&id_tjzrs=&", "&");
                datas = datas.replace("&id_tjznrs=&", "&");
                datas = datas.replace("&id_tjxdjmrs=&", "&");
                datas = datas.replace("&id_tjsbrs=&", "&");
                datas = datas.replace("&id_tjgyrs=&", "&");
                // alert(datas);
                if ($("#id_yyrq").val() == "") {
                    alert("预约日期不能为空!");
                    return;
                }
                if ($("#SQRXM").val() == "") {
                    alert("申请人姓名不能为空!");
                    return;
                }
                var Url = "yyhptpggl.do?action=insertXqsq";
                $.ajax({
                    url: Url,
                    type: "post",
                    dataType: "json",
                    data: datas,
                    success: function (data) {
                        if (data.code == "T") {
	                        $.toaster({priority: 'success', title: '提示', message: data.message});
	                        t.close();
	                        $table.bootstrapTable('refresh');
                        } else {
                        	$.toaster({priority: 'warning', title: '提示', message: data.message});
                    	}
                    }
                });
            }
        });
    };

    return {
        init: function (t, flag) {
            submitData(t, flag);
        }
    };
}();

function simplifyAddress(obj) {
    obj.val(obj.val().replace(/[\/]/g, ''));
    $.each(['北京市北京市', '天津市天津市', '上海市上海市', '重庆市重庆市'], function (k, v) {
        obj.val(obj.val().replace(v, v.substring(0, v.length / 2)));
    });

}

function initFormFillData(row) {
	console.log('initFormFillData');
	console.log(row);
	$.each(row, function(k ,v) {
		var obj = $('#id_' + k);
		if (obj.length > 0) {
			var type = obj.attr('type');
			if (type == 'text') {
				obj.val(v);
			}else if (obj.is('p')){
				obj.text(v);
			}else if (type == undefined){
				var tagname = obj.get(0).tagName.toLowerCase();
				if (tagname == 'select') {
					wn.select2Set(obj,v);
				} else if (tagname == 'textatea'){
					obj.val(v);
				}
			}else if (type == 'checkbox') {
				if (obj.attr('name') == k) {
					if (obj.val() == v) {
						obj.attr('checked', 'checked');
					} else {
						obj.attr('checked', false);
					}
				} else {
					wn.checkboxSet2(k, v);
				}
			}
		}else {
			obj = $('#'+k);
			if (obj.length > 0) {
				type = obj.attr('type');
				if (type == undefined) {
					tagname = obj.get(0).tagName.toLowerCase();
					if (tagname == 'select') {
						obj.val(v).trigger('change');
					} else if (tagname == 'textarea'){
						obj.val(v);
					}
				}else if (type == 'radio'){
					k = k.replace('dm','mc');
					$("input[value='" + v + "'][name='" + k + "']").attr('checked', 'checked');
					$("input[name='" + k + "']").iCheck({
						checkboxClass : 'icheckbox_flat-wnred',
						radioClass : 'iradio_flat-wnred',
						increaseArea : '20%'
					});
				}
			} 
		}
		
	});
}

createiRadioByArray = function (selObject, array, fieldID, fieldName) {
    var selectBody = "";
    var i = 0;
    var chk = " checked";
    $.each(array, function () {
        if (i == 0) {
            chk = " checked";
        } else {
            chk = "";
        }
        //字段id不存在，则取zdm
        var id = this.id == undefined ? this.zdm : this.id;
        //字段text不存在，则取zmc
        var text = this.text == undefined ? this.zmc : this.text;
        selectBody += "<label class=\"checkbox-inline \" >"
            + " <input type=\"radio\" id=\"" + fieldID
            + "\"  name=\"" + fieldName + "\" value=\"" + id + "\""
            + "\"  title=\"" + text + "\""
            + chk + " \" > " + text + "</label>";
        i++;
    });
    selObject.html(selectBody);
    selObject.iCheck({
        checkboxClass: 'icheckbox_flat-wnred',
        radioClass: 'iradio_flat-wnred',
//        increaseArea: '20%'
    });
};

createSelectByDDLArray = function (selObject, array, optionname) {

    var selectBody = "";

    if (optionname)
        selectBody = "<option value=''>" + optionname + "</option>";

    $.each(array, function () {
        selectBody += "<option value=" + this.zdm + ">" + this.zmc
            + "</option>";
    });
    selObject.html(selectBody);
}