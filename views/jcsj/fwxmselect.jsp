<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
    <style type="text/css">
        .block-space{
            padding:5px 0 5px 0;
        }
    </style>
</head>
<body>
<div class="panel-body" style="font-size: 13px;">
        <div class="form-group block-space col-md-5">
            <div class="input-group  input-group-sm" >
                <input type="text" class="form-control" id="fwxmmcQuery" placeholder="服务项目名称 ">
                <span class="input-group-btn">
                    <button id="btn_fwxm_query" class="btn btn-default btn-flat btn-sm " type="submit"  >
                        <i class="fa fa-search"></i>
                    </button>
                </span>
            </div>
        </div>
        <div class="form-group block-space">
                <div class="form-group col-md-12 no-padding">
                    <table id="tableFwxm" class="table-container"></table>
                </div>
        </div>
    <div id="toolbar"></div>
</div>
</body>
</html>