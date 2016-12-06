<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style type="text/css">
.zc_top {
	background-color: #21b7c6;
	height: 50px;
	line-height: 50px;
	font-family: "Microsoft YaHei";
	text-align: center;
	color: white;
	font-size: 18px;
}
#csrq {
	background: url("layouts/img/control/img_rl.png") no-repeat scroll right center;
	cursor: pointer;
}

.input-zcxx {
	margin: 5px 0 0 0;
	border: 0px;
	height: 30px;
}

.send-btn {
	margin: 5px 0 0 0;
	background-color: #21b7c6;
	color: white;
	line-height: 15px;
	padding:0 0 0 0;
	height: 30px;
}

.input-label {
	height: 30px;
	font-size: 15px;
	color: silver;
	font-weight: normal;
	padding: 0 0 0 0;
}

.inp-div {
	height: 40px;
	line-height: 38px;
}

hr {
	margin: 0px 0 0 0;
}
</style>

</head>
<body>
	<div class="navbar zc_top navbar-static-top">
		<!-- 		<div class="col-md-2">
			<img src="yyhpt/pages/img/fwlb_icon_01.png">
		</div> -->
		<div>用户信息注册</div>
	</div>

	<div class="col-xs-12" style="background-color: white;text-align:center;margin:0 auto">
		<form method="post" id="defaultForm">
			<div class="inp-div col-md-6" style="clear: both;">
				<label class="col-xs-3 input-label">手机号</label> <input type="text"
					class="col-xs-6 input-zcxx" maxlength="13" name="sjh" id="sjh" />
				<button id="sendyzm" type="button" class="btn col-xs-3 send-btn">发送验证码</button>
			</div>
			<hr class="hidden-md">
			<div class="inp-div col-md-6">
				<label class="col-xs-3 input-label">验证码</label> <input type="text"
					class="col-xs-9 input-zcxx" name="yzm" id="yzm" />
			</div>
			<hr style="clear: both;">
			
			<div class="inp-div col-md-6">
				<label class="col-xs-3 input-label">密码</label> <input
					type="password" class="col-xs-9 input-zcxx" name="mm" id="mm" />
			</div>
			<hr class="hidden-md">
			<div class="inp-div col-md-6">
				<label class="col-xs-3 input-label">确认密码</label> <input
					type="password" class="col-xs-9 input-zcxx" name="qrmm" id="qrmm" />
			</div>
			<hr style="clear: both;">
			
			<div class="inp-div col-md-6">
				<label class="col-xs-3 input-label">姓名</label> <input type="text"
					class="col-xs-8 input-zcxx" name="xm" id="xm" />
			</div>
			<hr class="hidden-md">
			<div class="inp-div col-md-6">
				<label class="col-xs-3 input-label">选择性别</label>
				<div class="col-xs-8" id="xbdm" name="xbmc">
				</div>
			</div>
			<hr style="clear: both;">
			
			<div class="inp-div col-md-6" data-date-format="yyyy-mm-dd">
				<label class="col-xs-3 input-label">出生日期</label> <input type="text"
					class="col-xs-9 input-zcxx" name="csrq" id="csrq">
			</div>
			<hr class="hidden-md">
			<div class="inp-div col-md-6">
				<label class="col-xs-3 input-label">证件类型</label> <select
					class="col-xs-9 input-zcxx" name="zjlx" id="zjlx">
				</select>
			</div>
			<hr style="clear: both;">
			
			<div class="inp-div col-md-6">
				<label class="col-xs-3 input-label">证件号码</label> <input type="text"
					class="col-xs-9 input-zcxx" name="zjhm" id="zjhm" />
			</div>
			<hr class="hidden-md" style="clear: both;">
			<div class="inp-div col-md-12" style="text-align: center;">
				<input id="tyyhxy" checked="checked" type="checkbox">&nbsp;&nbsp;注册并同意<a href="">《用户使用协议书》</a>
			</div>
			<div class="inp-div">
				<button id="register" type="button" class="btn btn-danger col-md-4 col-xs-12 col-md-offset-4"
					value="完成注册">完成注册</button>
			</div>
		</form>
	</div>
</body>
<script src="yyhpt/pages/yhzc/yhzc.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	$('#csrq').datepicker({
        format: "yyyy-mm-dd",
        // todayBtn: true,
        miniView: 'day',
        language: 'zh-CN',
        //startView: 'year',
        maxView: 'year',
        autoclose: true,
        pickerPosition: "bottom"
    });
})
</script>
</html>