/**
 * Created by zhibin.zhao on 2017/6/26.
 * 字典列表增删改查操作
 */
$(function () {
    /*页面加载相关元素状态初始化*/
    $.fn.initMenu(".device-list");
    let qsTable = {
        url: "/device/devices",
        search: function () {
            let params = $("#dictsTable").qsTable.pages({
                'keyword': $("#search").val()
            });
            $.getJSON(qsTable.url, params, function (pageInfo) {
                $("#dictsTable").CreateTable(pageInfo, qsTable);
            });
        },
        fmtStatus: function(value) {
           return value == 1? "正常" : "异常";
        },
        codeToImg: function(value, td) {
            let host = $("#myHostName").val();
            $(td).qrcode({   //选择存放链接容器
                render: "canvas",
                width: 100, //width height如果不写默认是 256 256
                height: 100,
                text: toUtf8(host + "?code=" + value) //将链接容器的内容赋值给text
            });
            return 'VoidUndo';
        },
        add: function () {
            $("#saveModal").modal("show");
            let $saveModalForm = $("#saveModal #addForm");
            $saveModalForm.cleanForm();
            $("#saveModal #addForm .modal-footer button").show();
            makeCode();
        },
        searchCode: function () {
            $('section').empty();
            $('.scroll-dialog').removeClass('scroll-dialog-open');
            let params = $(".table").qsTable.pages({'keyWord': $("#search").val()});
            $.getJSON(qsTable.url, params, function (pageInfo) {
                let list = pageInfo.list;
                for (let i in list) {
                    projectListMap[list[i]['id']] = list[i];
                }
                $(".table").CreateTable(pageInfo, qsTable);
                let $modelBody = $(".models .projects").clone();
                $modelBody.models(list);
                $('section').append($modelBody);
                $('section [model-text="row.type"]').each(function (i, d) {
                    $(d).html(qsTable.formatType($(d).html()));
                });
            });
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
        var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
        var strBodyStyle="<style>"+$("#qrcodeStyle").html()+"</style>";
        let doc = $("#doc1");
        var strFormHtml=strBodyStyle+"<body>"+doc.html()+"</body>";
        LODOP.ADD_PRINT_HTM(10,10, "100%", "100%", strFormHtml);
        LODOP.PREVIEW();
    });



    function generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
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

    function makeCode(count) {
        $("#doc1").empty();
        for (var i = 0; i < count; i++) {
            $("#doc1").append("<div id=\"qrcode" + i + "\" class=\"qrcode\"></div>");
        }
        $("#doc1 .qrcode").each(function () {
            $(this).empty();
            var elText = document.getElementById("text");
            if (!elText.value) {
                alert("Input a text");
                elText.focus();
                return;
            }
            $(this).qrcode({   //选择存放链接容器
                render: "canvas",
                width: 128, //width height如果不写默认是 256 256
                height: 128,
                text: toUtf8(elText.value + "?code=" + generateUUID()) //将链接容器的内容赋值给text
            });


        });

        $('canvas').each(function () {
            //进行方法转换
            var img = canvasToImage(this);
            $(this).parent('div').append(img);
            $(this).hide();
        });
    }

//定义方法
    function canvasToImage(canvas) {
        var image = new Image();
        // 指定格式 PNG 图片后缀可自定义
        image.src = canvas.toDataURL("image/png");
        return image;
    }

    $("#text").on("blur", function () {
        makeCode();
    }).on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
        }
    });

    $("#qrBtn").click(function () {
        let count = $("#qrCount").val();
        if (count > 0) {
            makeCode(count);
        }
    });
});