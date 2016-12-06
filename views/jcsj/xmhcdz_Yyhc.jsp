<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: gaozh
  Date: 2016/10/28 0028
  Time: 13:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div class="page-content" style="font-size: 13px;">
    <form id="defaultForm2" method="post" class="form-horizontal" onclick="return false;"
          style="font-size: 13px; padding-bottom: 10px;">
        <div class="input-group  input-group-sm col-md-5" style="padding-bottom: 10px;">
            <input type="text" class="form-control" id="mcQuery" placeholder="耗材名称"/>
            <span class="input-group-btn">
					<button id="btn_queryYyhc" href="javascript:selectYyhcFunc('选择医用耗材',1)"
                            class="btn btn-default btn-flat btn-sm " type="submit">
                          <i class="fa fa-search"></i>
                     </button>
				</span>
        </div>
    </form>
    <div>
        <table id="yyhctable" class="table-container"></table>
    </div>
</div>
</body>
</html>
