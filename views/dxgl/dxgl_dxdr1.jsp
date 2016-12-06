<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.css"
	rel="stylesheet" type="text/css" />
<style type="text/css">
.fileUpl {
	background: url("images/img_dir.png") no-repeat scroll right center;
	cursor: pointer;
}

.my-file {
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	filter: alpha(opacity = 0);
}
</style>
</head>
<body>
	<div class="panel-body">
		<form id="dxglDxdrForm" method="post" enctype="multipart/form-data"
			class="form-horizontal" action="personal_info.do?action=upload">
			<div id="rqlbDiv" class="form-group">
				<div class="form-group">

					<div class="col-md-4 col-md-offset-1">
						<div class="fileinput fileinput-new" data-provides="fileinput">
							<span class="btn btn-default btn-sm btn-file"> <span
								class="fileinput-new"> 选取文件 </span> <span
								class="fileinput-exists"> 重选 </span> <input type="file"
								name="...">
							</span> <span class="fileinput-filename"> </span> &nbsp; <a
								href="javascript:;" class="close fileinput-exists"
								data-dismiss="fileinput"><img style="padding-top: 10px"
								src="app/pages/img/img_close.png" /></a>
						</div>
					</div>

					<label class=" col-md-2 control-label">导入年度：</label>
					<div class="col-md-2"></div>
					<div class="pull-right" id="rwglList_btnDiv">
						<button id="template" class="btn btn-default btn-sm"
							onclick="readExcel()">模板</button>
						<button id="import" class="btn btn-default btn-sm">导入</button>
						<button id="save" class="btn btn-default btn-sm" type="submit">保存</button>
					</div>
				</div>
			</div>
		</form>

		<form id="photoForm" method="post" enctype="multipart/form-data"
			class="form-horizontal" action="personal_info.do?action=upload">
			<div id="rqlbDiv" class="form-group">
				<div class="form-group">

					<div class="col-md-4 col-md-offset-1">
						<div class="fileinput fileinput-new" data-provides="fileinput">
							<div class="fileinput-preview thumbnail" data-trigger="fileinput"
								style="width: 200px; height: 150px;"><img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image" alt="" /> </div>
							<div>
								<span class="btn btn-default  btn-file"> <span
									class="fileinput-new"> Select image </span> <span
									class="fileinput-exists"> Change </span> <input type="file"
									name="...">
								</span> <a href="javascript:;" class="btn red fileinput-exists"
									data-dismiss="fileinput"> Remove </a>
							</div>
						</div>
					</div>

					<label class=" col-md-2 control-label">导入年度：</label>
					<div class="col-md-2"></div>
					<div class="pull-right" id="rwglList_btnDiv">
						<button id="template" class="btn btn-default btn-sm"
							onclick="readExcel()">模板</button>
						<button id="import" class="btn btn-default btn-sm">导入</button>
						<button id="save" class="btn btn-default btn-sm" type="submit">保存</button>
					</div>
				</div>
			</div>
		</form>
	</div>
	<!-- 导入文件列表 -->
	<div>
		<div class="col-md-8">
			<div class="col-md-12">
				<div class="col-md-3">
					<label id="" class="control-label">导入文件名称</label>
				</div>
				<div class="col-md-1">
					<label id="" class="control-label">2016</label>
				</div>
			</div>
			<div class="col-md-12">
				<div class="col-md-4" style="display: block;">2016-06-22</div>
				<div class="col-md-8">
					<label id="" class="col-md-offset-8 col-md-4 control-label">导入未保存</label>
				</div>
			</div>
			<div class="col-md-12">
				<div class="col-md-6" id="">嘉定区安亭镇社区卫生服务中心</div>
				<div class="col-md-4" id="">导入人员姓名</div>
			</div>
		</div>
		<div class="col-md-1" style="float: left;">
			<div class="col-md-12">
				<div class="col-md-6">
					<p>
						<img src="images/img_renqun.png">
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-2 col-md-offset-1 row">
			<div class="col-md-12">
				<p>
					<br>
				</p>
			</div>
			<div style="display: inline;">
				<div class="col-md-5">
					<a id="">5333</a>
				</div>
				<div class="col-md-7">
					<a id="">删除</a>
				</div>
			</div>
		</div>
	</div>
	<hr>
	<table id="table" class="table-container"></table>

	<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.js"
		type="text/javascript"></script>

	<script type="text/javascript">
		$("#pdFile").fileinput({

			showPreview : false,

			allowedFileExtensions : [ "zip", "bar", "bpmn", "bpmn20.xml" ],

			elErrorContainer : "#fileError",

			browseClass : "btn btn-success",

			browseLabel : "查找文件",

			browseIcon : '<i class="glyphicon glyphicon-search"></i>',

			removeClass : "btn btn-danger",

			removeLabel : "删除",

			removeIcon : '<i class="glyphicon glyphicon-trash"></i>',

			uploadClass : "btn btn-info",

			uploadLabel : "部署",

			uploadIcon : '<i class="glyphicon glyphicon-upload"></i>',

		});

		function readExcel() {

			// var formData = $('#dxglDxdrForm');
			var formData = new FormData($('#dxglDxdrForm')[0]);
			event.preventDefault();
			alert('ttt' + formData);

			$.ajax({

				url : 'personal_info.do?action=upload',

				type : 'POST',

				data : formData,

				contentType : false,

				processData : false,

				success : function(data) {

					if (data.result == 'success') {

						alert('成功');

					} else {

						alert('失败');

					}

				},

				error : function() {

					alert('失败');

				}

			});
		}
	
	</script>

</body>

</html>