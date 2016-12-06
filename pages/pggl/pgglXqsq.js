// 居住地址
var residentAddress = '';
var basicData = {};
$(function () {
    $('#id_yyrq').datepicker({
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        format: "yyyy-mm-dd", //选择日期后，文本框显示的日期格式
        language: 'zh-CN', //汉化
        autoclose : true,
        //todayBtn: "linked",
        todayHighlight: true,
        startDate: "-0d"   //从当天开始选
    });
    $('#id_xzz_copy').bind('click', function () {
//    	$('#jzdxxdz').citypicker('destroy');
    	var liveAddress = $('#jzdxxdz').val();
    	liveAddress = liveAddress.replaceAll('/', '');
    	$('#id_sxxxdz').val(liveAddress+$('#id_jzds').val());
    	$('#jzdxxdz').citypicker();
    });
    // $('#fwxqDiv').hide();
    setDictDatas();
    ylrgxShowOrHide();
});

function setDictDatas() {
    $.ajax({
        url: "yyhptpggl.do?action=getXqsqPageDatas",
        type: "post",
        dataType: "json",
        data: {yngrbsh: editRow.YNGRBSH,
               sqlsh:editRow.SQLSH
        },
        beforeSend: function () {
             wn.showLoading();
        },
        success: function (res) {
        	initButtons(res);
        	fillPageDatas(res);
        },
        complete: function () {
             wn.hiddenLoading();
        }
    });
}

function initButtons(res){
    basicData = res.kzInfos;
    var needsLevels = res.needsLevels;
    createiRadioByArray($("#hyzkDiv"), basicData.maritalStatus,'hyzkdm','hyzkmc');//婚姻状况
    createSelectByDDLArray($("#zlxdm"), basicData.cards);		//[个人信息]----->[证类型]
    createSelectByDDLArray($("#pozjlxdm"), basicData.cards);		//[配偶情况]----->[证类型]
    createSelectByDDLArray($("#sqrzjlxdm"), basicData.cards); //[申请信息]----->[证类型]

    createSelectByDDLArray($("#klxdm"), basicData.insuranceCards);//[个人信息]----->[卡类型]
    createSelectByDDLArray($("#poklxdm"), basicData.insuranceCards);//[配偶情况]----->[卡类型]
    createSelectByDDLArray($("#sqrklxdm"), basicData.insuranceCards);//[申请信息]----->[卡类型]
    wn.createSelectByArray($("#id_xqdjdm"),needsLevels);                   //服务需求代码

    var djbz = [{id: '1', text: '是'}, {id: '0', text: '否'}];
    createiRadioByArray($("#djbzDiv"), djbz, "djbz", 'djbzmc','control-content');

    createiRadioByArray($("#ylrgxDiv"), basicData.guardian, "ylrgxdm","ylrgxmc",'control-content');//与老人关系
    wn.createiRadioWidthByArray($("#pglxDiv"), basicData.rowsPglx, "pglxdm", 'pglxmc','2 col-xs-6');//评估类型
    var sjd = [{id: '1', text: '上午'}, {id: '2', text: '下午'}];
    wn.createiRadioWidthByArray($('#yysjdDiv'), sjd, "yysjddm", 'yysjdmc','4 col-xs-6');		   //预约时间段
}

$("#id_sqrxm").blur(function(){
    ylrgxShowOrHide();
});

function ylrgxShowOrHide() {
    console.info('onblur')
    $('#id_sqrxm').val()===$('#id_xm').html()?$('#ylrgxDiv').hide()|$('#ylrgxLabel').hide():$('#ylrgxDiv').show()|$('#ylrgxLabel').show();
}

    function fillPageDatas(res){
    console.log(res);
    var pageDataNotXqsq = res.jbxxNotXqsq;           //个人基本信息[未申请]
	var pageData4Xqsq = res.pageData;           	 //已经进行需求申请
    var personalInfos = res.baseDatas[0];      		 //仅个人基本信息

	var personalCards = res.personalCards;
    if(editRow.SQLSH) {											//已申请
        console.log('This is has askManed Personal Info...');
        if (pageData4Xqsq){
            initAddress(pageData4Xqsq);
            initFormFillData(pageData4Xqsq);
        }
    } else {
        if (pageDataNotXqsq) {
        	console.log('This is not askMand Personal Info....');
            initAddress(pageDataNotXqsq);
            initFormFillData(pageDataNotXqsq);
        }
    }

    if($('#id_nl').text() == 0){
        $('#id_nl').text('');
    }
	//填充卡证信息
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
    if (editRow.XQSQ == '0') {
        $('#id_sqrxm').val($('#id_xm').html());
        $('#id_sqrdhhm').val($('#id_dhhm').val());
        $('#sqrzjlxdm').val($('#zlxdm').val());
        $('#id_sqrzjhm').val($('#id_zhm').val());
        $('#sqrklxdm').val($('#klxdm').val());
        $('#id_sqrkh').val($('#id_khm').val());
        $('#id_sqrdhhm').val(editRow.DHHM);
        $('#id_sqrsjhm').val(editRow.SJHM);
    }

}

function doSave(t){
    if (editRow.JALX == '1') {                //如果已经中止，禁用保存按钮
        wnform.toast('已中止服务，不能修改!');
        $('#xqsq_save').prop('disabled',true);
    } else if (editRow.PGDC && editRow.PGDC != '0'){
        wnform.toast('已评估调查，不能修改!');
        $('#xqsq_save').prop('disabled', true);
    } else if ($('#id_xqdjdm').val() == ''){
        wnform.toast('请选择服务需求!');
        $('#a_goXqsq_3').tab('show');
    } else {
        if (residentAddress === '') {
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
            var picker_jz = $('#jzdxxdz');
            residentAddress = fnPrepareAddress2Save(picker_jz.citypicker('getAllVal'), 'jzd');
        }
        xqsqForm.init(t, yngrbsh);
        $('#defaultForm').submit();
    }

}

function initAddress(row) {
    var picker_jz = $('#jzdxxdz');
    if (addressNotNull(row)) {
        console.log('in initAddress')
 //       picker_jz.citypicker('destroy');
        picker_jz.citypicker({
            province: row.jzdssmc,
            city: row.jzddsmc,
            district: row.jzdqxmc,
            town: row.jzdjdmc,
            village: row.jzdcmc,
            committee: row.jzdjdmc
        });
    } else {
        console.log('addressIsNull');
        setDefaultLocation();
    }
}

addressNotNull = function (row){
    var jFlag = false;
    $.each(row, function (k,v) {
        if (k.substr(0,3) == 'jzd' && k.substring(k.length-2)=='mc') {
            if (v)jFlag = true;
        }
    });
    return jFlag;
};

function setDefaultLocation() {
    $.ajax({
        url: "common.do?action=get_default_location",
        type: "post",
        dataType: "text",
        data: {},
        beforeSend: function () {
//             wn.showLoading();
        },
        success: function (res) {
        	console.log('设置默认地址');
            if ($.parseJSON(res).length > 0) {
                var address = $.parseJSON(res)[0];
                var picker_jz = $('#jzdxxdz');
                picker_jz.val('');
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
            errorClass: 'help-block help-block-error error-alert-self-define', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",  // validate all fields including form hidden input
            messages: {
                id_yyrq: {required: "预约日期必填."},
                id_sqrxm: {required: '申请人姓名必填.'},
                id_zhm: {required:'证件号码无效.'},
                id_khm: {number:'卡号码无效.'},
                id_pokh: {number:'配偶卡号无效.'},
                id_sqrkh: {number:'申请人卡号无效.'},
                id_xqdjdm: {required: "服务需求必选."},
            },
            rules: {
            	id_yyrq: {required: true},
                id_xqdjdm: {required: true},
                id_sqrxm: {required: true},
                id_zhm: {required: true},
                id_dhhm:{isPhone: true},
                id_zyzhrdh:{isPhone: true},
                id_jzdyzbm:{isZipCode: true},
                id_zyjhrdhhm:{isPhone: true},
                id_zyzhrdh:{isPhone: true},
                id_sqrdhhm:{isPhone: true},
                id_zyjhrsjhm:{isPhone: true},
                id_zyzhrsj:{isPhone: true},
                id_sqrsjhm:{isPhone: true},
            },
            highlight: function (element) { // hightlight error inputs
            	  $(element).addClass('has-error');
//            	  $(element).closest('.col-md-*').addClass('has-error'); // set error class to the control group
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
            	var _1stErrorControlID = validator.errorList[0].element.id;
                console.warn(_1stErrorControlID)
            	var xqsq_page_0 = ['id_zhm','id_khm','id_dhhm'];
            	var xqsq_page_1 = ['id_pokh','id_zyjhrdhhm','id_zyjhrsjhm','id_zyzhrdh','id_zyzhrsj'];
            	var xqsq_page_3 = ['id_sqrxm','id_sqrdhhm','id_sqrsjhm','id_sqrzjhm','id_sqrkh','id_yyrq','id_xqdjdm'];

            	if ($.inArray(_1stErrorControlID, xqsq_page_0) != '-1') {
            		console.log('the 0st page...');
            		$('#a_goXqsq_0').tab('show');
            		wnform.toast(validator.errorList[0].message);
				} else if ($.inArray(_1stErrorControlID, xqsq_page_1) != '-1') {
					console.log('the 1st page...');
					$('#a_goXqsq_1').tab('show');
					wnform.toast(validator.errorList[0].message);
				} else if ($.inArray(_1stErrorControlID, xqsq_page_3) != '-1') {
					console.log('the 3rd page...');
					$('#a_goXqsq_3').tab('show');
					wnform.toast(validator.errorList[0].message);
				}
                $('.alert-danger', $('.form-horizontal')).show();
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var jzd = $('#jzdxxdz');
                simplifyAddress(jzd);

                var datas = wn.fillWithForm("defaultForm");
                datas += residentAddress;
                datas = datas.replace("--请选择--", "");
                datas = datas.replace("请选择", "");
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
                datas += '&sqlsh='+sqlsh;
                datas += '&yngrbsh='+ yngrbsh;
                console.warn(datas);
                var Url = "yyhptpggl.do?action=";
                if (editRow.SQLSH) {
                    Url += "updateXqsq";
                } else {
                    Url += "insertXqsq";
                }
                $.ajax({
                    url: Url,
                    type: "post",
                    dataType: "json",
                    data: datas,
                    success: function (data) {
                        if (data.code=="T") {
                            wnform.toast(data.message);
                            t.close();
                            $table.bootstrapTable('refresh');
                        } else {
                            wnform.toast(data.message);
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
    console.info(row);
	$.each(row, function(k ,v) {
		var obj = $('#id_' + k);
		if (obj.length > 0) {
			var type = obj.attr('type');
			if (type == 'text') {
                if (v != null){
				    obj.val(v);
                }
			}else if (obj.is('p')){
                if (v != null) {
                    obj.text(v);
                    // if (k === 'xqdjmc'){                                                //服务需求有值则显示
                    //     $('#fwxqDiv').show();
                    // }
                }
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
						obj.prop('checked', 'checked');
					} else {
						obj.prop('checked', false);
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
					$("input[value='" + v + "'][name='" + k + "']").prop('checked', 'checked');
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

createiRadioByArray = function (selObject, array, fieldID, fieldName, space) {
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
        selectBody += "<label class=\"checkbox-inline "+space+"\" + style='margin-top: 0px;margin-left: 0px;'>"
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