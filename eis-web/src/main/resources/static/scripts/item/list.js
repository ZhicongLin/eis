/**
 * Created by zhibin.zhao on 2017/6/26.
 * 用户列表增删改查操作
 */
$(function () {
    /*页面加载相关元素状态初始化*/
    $.fn.initMenu(".item-list");

    let userList = {};

    let qsTable = {
        url: "/items",
        search: function () {
            let params = $("#usersTable").qsTable.pages({
                'keyword': $("#search").val()
            });
            $(".userlist").empty();
            $.getJSON(qsTable.url, params, function (pageInfo) {
                for (let i in pageInfo.list) {
                    userList[pageInfo.list[i]['id']] = pageInfo.list[i];
                }
                $("#usersTable").CreateTable(pageInfo, qsTable);
                let $userTab = $(".models .model-list").clone();
                $userTab.models(pageInfo.list);
                $(".userlist").append($userTab);
            });
        },
        fmtType: function (value) {
            return value == 0 ? "普通类型" : "检查点类型";
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
            $("#saveModal #addForm .modal-footer button").show();
        },
        delete: function (row) {
            $.confirm("是否确认删除[" + row.name + "/" + row.enName + "]？", function () {
                $.post("/items/del", {id:row.id}, function (data) {
                    qsTable.search();
                })
            });
        }
    };
    $(document).on('click', '[bind="edit"]', function () {
       let id = $(this).attr('value');
       qsTable.edit(userList[id]);
    });
    $(document).on('click', '[bind="delete"]', function () {
       let id = $(this).attr('value');
       qsTable.delete(userList[id]);
    });
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
        let params = $saveModalForm.formParams();
        $.post(qsTable.url, params, function (result) {
            $("#saveModal").modal("hide");
            $("#searchBtn").click();
        })
    });

});