$(function () {
    $.fn.initMenu(".recodes-list");
    let resizeTimer = null;

    let resizeTimerResize = function () {
        if (resizeTimer) {
            clearTimeout(resizeTimer)
        }
        resizeTimer = setTimeout(function () {
            resizer($('.device-lists .panel-body-list'), 180);
            resizer($('.recode-lists .panel-body-list'), 180);
        }, 50);
    };
    $(window).on('resize', resizeTimerResize);

    function resizer($document, size) {
        $document.css({
            'height': $(window).height() - size,
            'overflow-x': 'hidden',
            'overflow-y': 'auto'
        });
    }

    resizeTimerResize();
    loadDevice();

    function loadDevice() {
        $.getJSON("/device/devices", {pageNum: 1, pageSize: 12}, function (data) {
            let results = data.list;
            results.forEach(function (row) {
                let user = row.ipqcUser;
                let tr = "<div class='media devicePanel' style='border: 1px solid #337ab760;box-shadow: 0 3px 3px #337ab780'>" +
                    "       <div class='media-left' style='padding: 5px'>" +
                    "           <span class='qrCode' qrCodeNo='" + row.qrCodeNo + "'></span>" +
                    "           <input type='hidden' class='deviceId' value='" + row.id + "' />" +
                    "       </div>" +
                    "       <div class='media-body' style='padding-top: 5px'>" +
                    "           <h4 class='media-heading' style='font-size: 16px;font-weight: bold;color: #31708f;'>" + row.deviceCode + "</h4>" +
                    "           <p>" + (user ? user.ipqcName : "") + " / " + (user ? user.phone : "") + "</p>" +
                    "           <p>" + row.address + "</p>" +
                    "       </div>" +
                    "   </div>";
                $('.device-lists .panel-body').append(tr);

            });
            let qrCodeSpans = $('.device-lists .panel-body .qrCode');
            qrCodeSpans.each(function (i, t) {
                $(t).qrcode({   //选择存放链接容器
                    render: "canvas",
                    width: 80, //width height如果不写默认是 256 256
                    height: 80,
                    text: toUtf8($("#myHost").val() + "?code=" + $(t).attr("qrCodeNo")) //将链接容器的内容赋值给text
                });
            });

            $(".devicePanel").click(function () {
                let deviceId = $(this).find('.deviceId').val();
                loadData(deviceId);
                $(this).addClass('bg-info') ;
                $(this).siblings('.devicePanel').removeClass('bg-info');
            });
        });
    }

    function toUtf8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    function loadData(id) {
        $.post("/device/front/recode/" + id,
            {time: 0},
            function (data) {
                let len = data.length;
                let list = $('.recode-lists .panel-body-list');
                list.empty();
                for (var i = 0; i < len; i++) {
                    list.append(createDeviceRecode(data[i]));
                }
            });
    }

    function createDeviceRecode(data) {
        let deviceRecord = data.deviceRecord;
        let problems = data.problems;
        let recodes = data.recodeList;
        let table = "<div class='panel panel-info' style='box-shadow: 0 3px 3px #337ab780; margin-bottom: 12px;'>" +
            "             <div class='panel-heading' style='height: 40px'>" +
            "                 <h4 class='left col-md-9' style='font-size: 16px; font-weight: bold;'>" +
            "                     状态：<span style='font-size: 16px; font-weight: normal;'>" + (deviceRecord.ipqcResult == 1 ? '正常' : '异常') + "</span>" +
            "                     \t设备地址：<span style='font-size: 16px; font-weight: normal;'>"+deviceRecord.area+"</span>" +
            "                 </h4>" +
            "                 <h4 class='right col-md-3 text-right' style='font-size: 16px; font-weight: bold;'>"+data.device.deviceCode+"</h4>" +
            "             </div>" +
            "             <div class='panel-body'>" +
            "                 <table class='table table-bordered' style='border: 1px solid silver !important;'>" +
            "                     <thead>" +
            "                     <tr>" +
            "                         <th style='font-size: 14px'>检查时间：" + deviceRecord.createTime + "</th>" + createProblemList(problems) +
            "                     </tr>" +
            "                     </thead>" +
            "                     <tbody>" +
            "                     <tr>" + createResult(recodes, problems) + "</tr>" +
            "                     </tbody>" +
            "                 </table>" +
            "             </div>" +
            "             <div class='panel-footer' style='background-color: #d9edf7;color:#31708f;'>" +
            "                 <h4>技术人员：" + deviceRecord.ipqcUser.ipqcName + "</h4>" +
            "                 <h4>联系方式：" + deviceRecord.ipqcUser.phone + "</h4>" +
            "             </div>" +
            "         </div>";
        return table;
    }

    function createProblemList(problems) {
        let th = [];
        problems.forEach(function (p) {
            th.push("<th style='text-align: center;font-size: 14px'>" + p.name + "/" + p.enName + "</th>");
        });
        return th.join('');
    }

    function createResult(recodes, problems) {
        let tds = [];
        recodes.forEach(function (val) {
            let item = val.ipqcItem;
            if (item.type && item.type === 1) {
                let tr = "<tr>" +
                    "<td >" +
                    "<p style='font-weight: bold;font-size: 14px;'>" +item.name + "/" + item.enName+ "</p>" +
                      item.remark +
                    "</td>" + getProblemTd(item, val.problems, problems) +
                    "</tr>";
                tds.push(tr);
            } else {
                let tr = "<tr>" +
                    "<td style='font-weight: bold;'>" +
                    item.name + "/" + item.enName + "<br/>" + item.remark +
                    "</td>" +
                    "<td colspan='3'>" +
                    (val.status == 1 ? "<span class='glyphicon glyphicon-ok text-green'></span>" : "<span class='glyphicon glyphicon-remove text-danger'></span>") +
                    "</td>" +
                    "</tr>";
                tds.push(tr);
            }
        });
        return tds.join('');
    }

    function getProblemTd(item, vps, problems) {
        let tds = [];
        problems.forEach(function (p) {
            let result = "";
            if (vps) {
                vps.forEach(function (vp) {
                    if (vp.id === p.id) {
                        result = vp.status == 1 ? "<span class='glyphicon glyphicon-ok text-green'></span>" : "<span class='glyphicon glyphicon-remove text-danger'></span>";
                    }
                });
            }
            tds.push("<td style='text-align: center;'>" + result + "</td>");
        });
        return tds.join('');
    }
});