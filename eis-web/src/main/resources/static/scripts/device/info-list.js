/**
 * Created by zhibin.zhao on 2017/6/26.
 * 字典列表增删改查操作
 */
$(function () {
    /*页面加载相关元素状态初始化*/
    $.fn.initMenu(".device-info-list");
    let qsTable = {
        url: "/device/info/devices",
        search: function () {
            let params = $("#dictsTable").qsTable.pages({
                'keyword': $("#search").val()
            });
            $.getJSON(qsTable.url, params, function (pageInfo) {
                $("#dictsTable").CreateTable(pageInfo, qsTable);
            });
        },
        toImg: function(value, td) {
            $(td).append("<img src='" + value + "' width=\"60\" height=\"40\" style=\"margin: 2px; \"/>")
            return 'VoidUndo';
        },
        add: function () {
            $("#saveModal").modal("show");
            let $saveModalForm = $("#saveModal #addForm");
            $saveModalForm.cleanForm();
            $("#saveModal #addForm .modal-footer button").show();
        },
        edit: function (row) {
            $("#saveModal").modal("show");
            let $saveModalForm = $("#saveModal #addForm");
            $saveModalForm.cleanForm();
            $saveModalForm.setForm(row);
            initImgs();
            $("#saveModal #addForm .modal-footer button").show();
        }
    };

    //初始化
    qsTable.search();
    //点击搜索按钮
    $("#searchBtn").click(function () {
        $(".pageQsTable .pageNum").val(1);
        qsTable.search();
    });
    //点击添加
    $(".addButton").click(function () {
        qsTable.add();
    });    //表单确认按钮
    $("#saveModal button.confirm").click(function () {
        let $saveModalForm = $("#saveModal #addForm");
        $saveModalForm.submit();
    });

    function initImgs() {
        $("input.file").each(function (i, e) {
            if ($(e).val()) {
                $(e).siblings('img').attr("src", $(e).val());
            }
        });
        $("input.file").hide();
    }

    $('img').click(function () {
        $(this).siblings('input[type="file"]').click();
    });

    var inp = $('input[type="file"]');
    inp.change(function () {
        getFileURL(this);
    });
    function getFileURL(this_) {
        var $file = $(this_);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $file.siblings('img');
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
    }
});