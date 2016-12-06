<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!-- loader -->
<div id="toaster1" class="toaster1"
     style="bottom: 150px; margin: 0 auto; width: 300px; z-index: 50000;"></div>

<!-- no data -->
<div id="noDataDiv" style="display: none;">
    <div
            style="width: 100%; height: 50px; line-height: 50px; color: red; margin: auto 0; text-align: center;">
        未查到相关数据
    </div>
</div>

<img id="progressImgage" class="progress" style="display: none" alt=""
     src="${basePath}/frame/img/ajax-loader.gif"/>
<div id="maskOfProgressImage" class="mask" style="display: none"></div>


<script src="${basePath}/frame/plugins/jquery.placeholder/jquery.placeholder.js"></script>
<!-- Bootstrap 3.3.5 -->


<!-- FastClick -->
<script src="${basePath}/frame/plugins/fastclick/fastclick.min.js"></script>
<!-- AdminLTE App -->
<script src="${basePath}/frame/scripts/app.min.js"></script>

<!-- Sparkline -->
<script
        src="${basePath}/frame/plugins/sparkline/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script
        src="${basePath}/frame/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script
        src="${basePath}/frame/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- SlimScroll 1.3.0 -->
<script
        src="${basePath}/frame/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- ChartJS 1.0.1 -->
<script src="${basePath}/frame/plugins/chartjs/Chart.min.js"></script>


<!-- AdminLTE for demo purposes -->
<script src="${basePath}/frame/scripts/appskin.js"></script>

<script
        src="${basePath}/frame/plugins/bootstrap-table/bootstrap-fixed-column.js"></script>
<script src="${basePath}/frame/scripts/app-utils.js"></script>

<script src="${basePath}/frame/scripts/wnform-control.js"
        type="text/javascript"></script>
<script src="${basePath}/frame/plugins/select2/select2.full.js"></script>
<script src="${basePath}/frame/plugins/select2/zh-CN.js"></script>

<script
        src="${basePath}/frame/plugins/bootstrap-dialog/bootstrap-dialog.min.js"></script>
<script src="${basePath}/frame/plugins/jquery.toaster.js"></script>
<script src="${basePath}/frame/plugins/bootstrap-datepicker/bootstrap-datepicker.js"></script>

<script src="${basePath}/frame/plugins/jquery-validation/js/jquery.validate.js" type="text/javascript"></script>
<script src="${basePath}/frame/plugins/jquery-validation/js/card.js" type="text/javascript"></script>
<script src="${basePath}/frame/plugins/jquery-validation/js/additional-methods.js" type="text/javascript"></script>
<script src="${basePath}/frame/plugins/jquery-validation/js/localization/messages_zh.min.js"
        type="text/javascript"></script>

<script src="${basePath}/frame/plugins/iCheck/icheck.min.js"
        type="text/javascript"></script>

<script src="${basePath}/frame/plugins/Base64/Base64.js"
        type="text/javascript"></script>
<script src="${basePath}/frame/scripts/login/cookie.js"
        type="text/javascript"></script>


<script src="${basePath}/layouts/scripts/layout.js"
        type="text/javascript"></script>
<script src="${basePath}/frame/plugins/tableExport/tableExport.js"></script> 

