<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<div class="page-content" style="font-size: 13px;">
    <form id="defaultForm2" method="post" class="form-horizontal" onclick="return false;"
          style="font-size: 13px; padding-bottom: 10px;">
        <div class="input-group  input-group-sm col-md-5" style="padding-bottom: 10px;">
            <input type="text" class="form-control" id="ywxmmcQuery" placeholder="业务项目名称"/>
               <span class="input-group-btn">
					<button id="btn_queryYwxm" href="javascript:selectModelFunc('选择业务项目',1)"  
						 class="btn btn-default btn-flat btn-sm " type="submit">
                          <i class="fa fa-search"></i>
                     </button>
				</span>
          </div>
    </form>
    <div>
        <table id="tableYwxm" class="table-container"></table>
    </div>
</div>

<script src="frame/plugins/jquery-validation/js/jquery.validate.js"
        type="text/javascript"></script>
<!-- <script src="yyhpt/pages/jcsj/ywxmSelect.js" type="text/javascript"></script> -->
</body>
</html>