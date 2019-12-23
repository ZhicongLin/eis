/**
 * Created by zhibin.zhao on 2017/6/26.
 * 用户列表增删改查操作
 */
$(function () {
    /*页面加载相关元素状态初始化*/
    $.fn.initMenu(".user-list");

    let userList = {};

    let qsTable = {
        url: "/users",
        search: function () {
            let params = $("#usersTable").qsTable.pages({
                'userName': $("#search").val()
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
        fmtSex: function (value) {
            return value == 0 ? "男" : "女";
        },
        fmtStatus: function (value, td) {
            $(td).append(value == 1 ? "<span class='glyphicon glyphicon-ok text-green' />" : "<span class='glyphicon glyphicon-remove text-danger'/>")
            return 'VoidUndo';
        },
        edit: function (user) {
            $("#saveModal").modal("show");
            let $saveModalForm = $("#saveModal #addForm");
            $saveModalForm.cleanForm();
            $saveModalForm.setForm(user);
            $saveModalForm.find('[name="updateTime"]').attr("readonly", true);
            $("#saveModal #addForm .modal-footer button").show();
        }
    };
    $(document).on('click', '[bind="show"]', function () {
       let id = $(this).attr('value');
       qsTable.show(userList[id]);
    });
    $(document).on('click', '[bind="edit"]', function () {
       let id = $(this).attr('value');
       qsTable.edit(userList[id]);
    });
    $(document).on('click', '[bind="repeat"]', function () {
       let id = $(this).attr('value');
       qsTable.repeat(userList[id]);
    });
    $(document).on('click', '[bind="delete"]', function () {
       let id = $(this).attr('value');
       qsTable.delete(userList[id]);
    });
    $(document).on('dblclick', '.userlist .tab--panel', function () {
        $(this).find('[bind="show"]').click();
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
        params.email = params.email ? params.email + '@qishon.com' : '';
        $.post(qsTable.url, params, function (result) {
            $("#saveModal").modal("hide");
            $("#searchBtn").click();
        })
    });

    let resizeTimer = null;
    $(window).on('resize', function () {
            if (resizeTimer) {
                clearTimeout(resizeTimer)
            }
            resizeTimer = setTimeout(function () {
                $.resizer($('.userlist'), 205);
            }, 50);
        }
    );
    $.resizer($('.userlist'), 205);
});