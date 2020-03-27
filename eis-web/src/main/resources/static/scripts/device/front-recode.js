$(function () {
    loadData();
    function loadData () {
        $.post("/device/front/recode/" + $('#deviceId').val(),
            {time: $("#timeSelect").val()},
            function (data) {
                let len = data.length;
                $("#recodeSize").html(len);
                let list = $(".list");
                list.empty();
                for (var i = 0; i < len; i++) {
                    list.append(createRowPanel(data[i]));
                }
                list.append("<div class='col-lg-12' style='text-align: center'>到底啦~~</div>")
            });
    }

    $("#timeSelect").change(function () {
        loadData();
    });

    function createRowPanel(data) {
        let deviceRecord = data.deviceRecord;

        return "<h3  style='font-size: 18px'>" + deviceRecord.ipqcTime + "</h3>" +
            "<div class='panel panel-primary' style='font-size: 16px !important;'>" +
            "    <div class='panel-heading'>" +
            "        <p style='font-size: 18px'>设备巡检记录</p>" +
            "        <p style='font-size: 18px'>巡检人：" + deviceRecord.ipqcUser.ipqcName + "</p>" +
            "    </div>" +
            "    <div class='panel-body'>" +
            "        <p class='ptitle'>检查结果</p>" +
            "         <div class='col-lg-12'>" +
            "             <span style='font-size: 18px'>" + (deviceRecord.ipqcResult == 1 ? '正常' : '异常') + "</span>" +
            "         </div>" +
            "        <p class='ptitle'>检查内容</p><div class='col-lg-12'>" +
            "        <table class='table contentTable' style='border: 0'>" + createContent(data, deviceRecord) + "</table></div>" +
            "        <p class='ptitle'>情况说明</p>" +
            "         <div class='col-lg-12'>" +
            "             <div class='form-control descBody'>" + (deviceRecord.remark ? deviceRecord.remark : '') + "</div>" +
            "         </div>" +
            "         <p class='ptitle'>整改情况</p>" +
            "         <div class='col-lg-12'>" +
            "             <div class='form-control descBody'>" + (deviceRecord.modifyDesc ? deviceRecord.modifyDesc : '') + "</div>" +
            "         </div>" +
            "         <p class='ptitle'>现场情况</p>" +
            "         <div class='col-lg-12'>" +
            "             <img src='" + (deviceRecord.imageUri ? deviceRecord.imageUri : "/images/fileUpload.png") + "' width='100' height='100'/>" +
            "         </div>" +
            "    </div>" +
            "    <div class='panel-footer'>" +
            "        <p style='font-size: 18px'>巡检人：" + deviceRecord.ipqcUser.ipqcName + "</p>" +
            "        <p style='font-size: 18px'>手机号：" + deviceRecord.ipqcUser.phone + "</p>" +
            "        <p style='font-size: 18px'>所属位置：" + deviceRecord.area + "</p>" +
            "    </div>" +
            "</div>";
    }

    function createContent(data, deviceRecord) {
        let recodes = data.recodeList;
        let table = [];
        recodes.forEach(function (val) {
            let item = val.ipqcItem;
            if (item.type && item.type === 1) {
                let tr = "<tr>" +
                    "    <td colspan='2' itemId='" + item.id + "'>" +
                    "        <table class='table'>" +
                    "            <tr>" +
                    "                <td colspan='2'><label>" + item.name + "/" + item.enName + "</label></td>" +
                    "            </tr>" + getProblemTr(item, val.problems) +
                    "        </table>" +
                    "    </td>" +
                    "</tr>";
                table.push(tr);
            } else {
                let tr =
                    "<tr >" +
                    "    <td class='lastTd'>" +
                    (val.status == 1 ? "<span class='glyphicon glyphicon-ok-circle glyphicon-active' result='1'></span>" : "<span class='glyphicon glyphicon-remove-circle glyphicon-error-active' result='0'></span>") +
                    "    </td>" +
                    "    <td><label>" + item.name + "/" + item.enName + "</label></td>" +
                    "</tr>";
                table.push(tr);
            }
        });

        return table.join('')
    }

    function getProblemTr(item, pbs) {
        let tr1 = "";
        pbs.forEach(function (pb) {
            tr1 += "<tr>" +
                "    <td class='lastTd'>" +
                (pb.status == 1 ? "<span class='glyphicon glyphicon-ok-circle glyphicon-active'></span>" : "<span class='glyphicon glyphicon-remove-circle glyphicon-error-active'></span>") +
                "    </td>" +
                "    <td>" + pb.name + "/" + pb.enName + "</td>" +
                "</tr>";
        });
        return tr1;
    }

});