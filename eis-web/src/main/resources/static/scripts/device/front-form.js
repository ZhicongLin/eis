$(function () {
    console.log('load device/front-form.js');
    $('.result').click(function () {
        let span = $(this).find('span');
        let input = $("#result");
        if (span.hasClass('glyphicon-active')) {
            span.removeClass('glyphicon-active');
            input.val('');
            return;
        }
        $('.result .glyphicon').removeClass('glyphicon-active');
        span.addClass('glyphicon-active');
        input.val(span.attr('result'));
    });

    $('.fileImg').click(function () {
        $("#upfile").click();
    });

    var inp = $("#upfile");
    inp.change(function () {
        getFileURL(this);
        return;
    });

    function getFileURL(this_) {
        var $file = $(this_);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $("img.fileImg");
        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src', dataURL);
        } else {
            dataURL = $file.val();
            var imgObj = document.getElementById("preview");
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        }
        $img.show();
        $('div.fileImg').hide();
    }

    $.post('/device/front/checkItems', {deviceId: $('#deviceId').val()}, function (data) {
        let items = data.ipqcItems;
        let pbs = data.ipqcProblems;
        let table = $("#checkTables");
        table.empty();
        items.forEach(function (item) {
            if (item.type && item.type === 1) {
                let tr = "<tr>" +
                    "    <td colspan='2' itemId='" + item.id + "'>" +
                    "        <table class='table'>" +
                    "            <tr>" +
                    "                <td colspan='2'><label>" + item.name + "/" + item.enName + "</label></td>" +
                    "            </tr>" + getProblemTr(item, pbs) +
                    "        </table>" +
                    "    </td>" +
                    "</tr>";
                table.append(tr);
            } else {
                let tr =
                    "<tr >" +
                    "    <td><label>" + item.name + "/" + item.enName + "</label></td>" +
                    "    <td class='lastTd'>" +
                    "       <input type='hidden' class='content' value=''/>" +
                    "       <input type='hidden' class='contentIds' value='" + item.id + "::'/>" +
                    "       <span class='glyphicon glyphicon-ok-circle' result='1'></span>" +
                    "       <span class='glyphicon glyphicon-remove-circle' result='0'></span>" +
                    "    </td>" +
                    "</tr>";
                table.append(tr);
            }
        });

        $('table td .glyphicon').click(function () {
            let span = $(this);
            if (span.hasClass('glyphicon-active')) {
                span.removeClass('glyphicon-active');
                span.siblings('.content').val('');
                return;
            }
            if (span.hasClass('glyphicon-error-active')) {
                span.removeClass('glyphicon-error-active');
                span.siblings('.content').val('');
                return;
            }
            span.siblings('.glyphicon').removeClass('glyphicon-error-active');
            span.siblings('.glyphicon').removeClass('glyphicon-active');
            span.siblings('.content').val(span.siblings('.contentIds').val()  + span.attr('result'));
            if (span.hasClass('glyphicon-remove-circle')) {
                span.addClass('glyphicon-error-active');
            } else {
                span.addClass('glyphicon-active');
            }
        });
    });

    function getProblemTr(item, pbs) {
        let tr1 = "";
        pbs.forEach(function (pb) {
            tr1 += "<tr>" +
                "    <td>" + pb.name + "/" + pb.enName + "</td>" +
                "    <td class='lastTd'>" +
                "       <input type='hidden' class='content' value=''/>" +
                "       <input type='hidden' class='contentIds' value='" + item.id + "::" + pb.id + "::'/>" +
                "       <span class='glyphicon glyphicon-ok-circle' result='1'></span>" +
                "       <span class='glyphicon glyphicon-remove-circle' result='0'></span>" +
                "    </td>" +
                "</tr>";
        });
        return tr1;
    }
    
    $('#subBtn').click(function () {
        let values = [];
        $('input.content').each(function (i, ipt) {
            let val = $(ipt).val();
            if (val) {
                values.push(val);
            }
        });
        $("#content").val(values.join(','));
        $.post('/device/front/checkUser',
            {ipqcName: $('input[name="ipqcName"]').val(), ipqcPhone: $('input[name="ipqcPhone"]').val()}, function (data) {
            if (data === 1) {
                $("#recode-form").submit();
            } else {
                alert("记录人信息错误")
            }
        });
    });
});