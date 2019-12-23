/*
    表格处理js
 */
$(function () {
    // 处理分页工具栏
    function createPageTools(pageInfo, table, params) {
        let $pageNav = $(".pageQsTable");
        $(".pageQsTable input.pageNum").keyup(function () {
            if ($(this).val() > pageInfo.pages) {
                $(this).val(pageInfo.pages);
            }
            if ($(this).val() < 1) {
                $(this).val(1);
            }
        });
        let $pageSizeChange = $(".pageQsTable select.pageSize");
        $pageSizeChange.unbind("change");
        $pageSizeChange.change(function () {
            $(".pageQsTable .pageNum").val(1);
            params.search();
        });
        $pageNav.find(".pageNum").val(pageInfo.pageNum);
        $pageNav.find(".pageSize").val(pageInfo.pageSize);
        let $PreviousFirst = $(".pageQsTable .PreviousFirst");
        let $LastPage = $(".pageQsTable .LastPage");
        let $Previous = $(".pageQsTable .Previous");
        let $NumList = $(".pageQsTable .num-list");
        let $Next = $(".pageQsTable .Nexts");
        //处理首页操作
        $PreviousFirst.empty();
        if (pageInfo.isFirstPage) {
            $PreviousFirst.append("<a style='padding: 3px 6px;' href='javascript:void(0)'><span aria-label='Pre'>首页</span></a>");
        } else {
            $PreviousFirst.append($("<a aria-label='Pre' class='first-click' style='padding: 3px 6px;' pages='1' href='javascript:void(0)'><span aria-label='Pre'>首页</span></a>"));
            $(".first-click").click(function () {
                $(".pageQsTable .pageNum").val($(this).attr("pages"));
                params.search();
            });
        }
        //处理上一页
        $Previous.empty();
        if (!pageInfo.hasPreviousPage) {
            $Previous.append("<a aria-label='Pre' style='padding: 3px 8px;'  href='javascript:void(0);'>&laquo;</a>");
        } else {
            $Previous.append($("<a aria-label='Pre'  style='padding: 3px 8px;' class='pre-click' pages='" + (pageInfo.pageNum * 1 - 1) + "' href='javascript:void(0)'>&laquo;</a>"));
            $(".pre-click").click(function () {
                $(".pageQsTable .pageNum").val($(this).attr("pages"));
                params.search();
            });
        }

        $NumList.empty();
        if (pageInfo.navigatepageNums) {
            for (let i in pageInfo.navigatepageNums) {
                let navigatepageNum = pageInfo.navigatepageNums[i];
                if (navigatepageNum * 1 === pageInfo.pageNum * 1) {
                    $NumList.append("<span aria-label='Pre'  style='margin-left: 0px;padding: 3px 8px;' pages='" + navigatepageNum + "'>" + navigatepageNum + "</span>");
                } else {
                    $NumList.append("<a aria-label='Pre' class='CNum' style='margin-left: 0px;padding: 3px 8px;'  pages='" + navigatepageNum + "'  href='javascript:void(0);'>" + navigatepageNum + "</a>");
                }
            }
            $(".CNum").click(function () {
                $(".pageQsTable .pageNum").val($(this).attr("pages"));
                params.search();
            });
        }


        //处理下一页
        $Next.empty();
        if (!pageInfo.hasNextPage) {
            $Next.append("<a aria-label='Pre' style='margin-left: 0px;padding: 3px 8px;'  href='javascript:void(0);'>&raquo;</a>");
        } else {
            $Next.append($("<a aria-label='Pre' class='next-click'style='margin-left: 0px;padding: 3px 8px;'  pages='" + (pageInfo.pageNum * 1 + 1) + "' href='javascript:void(0)'>&raquo;</a>"));
            $(".next-click").click(function () {
                $(".pageQsTable .pageNum").val($(this).attr("pages"));
                params.search();
            });
        }
        //处理尾页操作
        $LastPage.empty();
        if (pageInfo.isLastPage) {
            $LastPage.append("<a aria-label='Pre' style='padding: 3px 6px;'  href='javascript:void(0);'>尾页</a>");
        } else {
            $LastPage.append($("<a aria-label='Pre'  style='padding: 3px 6px;' class='last-click' pages='" + pageInfo.pages + "' href='javascript:void(0)'>尾页</a>"));
            $(".last-click").click(function () {
                $(".pageQsTable .pageNum").val($(this).attr("pages"));
                params.search();
            });
        }

        // 点击GO按钮
        let $goPage = $(".goPageLi .goPage");
        $goPage.unbind("click");
        $goPage.click(function () {
            params.search();
        });
    }

    function createBtns($btnThs, index, row, options) {
        let $btns = $btnThs.find('label, a, button');
        let wid = $btns.length * 24;
        $btnThs.css('width', wid);
        let $btnGroup = $('<div class="btn-group btn-group-xs" style="width: ' + wid + 'px"></div>');
        $.each($btns, function (i, btn) {
            $(btn).attr('data-toggle', 'tooltip');
            $(btn).attr('data-placement', 'top');
            $(btn).addClass('btn');
            $(btn).addClass('btn-default');
            let $clone = $(btn).clone();
            $clone.attr('index', index);
            $clone.attr('rowid', row['id']);
            $btnGroup.append($clone);
            let events = $clone.attr('bind');
            if (events) {
                let arr = events.split('->');
                $clone.on(arr[0], function ($event) {
                    columnBtnsIndex($event, $(this));
                    options[arr[1]](row, $(this));
                });
            }
        });
        return $btnGroup;
    }

    function createList(info, $tbody, header, options) {
        let list = $.isArray(info) ? info : info.list;
        if (!list || list.length === 0) {
            $tbody.append("<tr><td colspan='" + header.length + "' style='text-align: center'>暂无数据</td></tr>");
            return;
        }
        for (let i in list) {
            if (list[i] == null) {
                continue;
            }
            let $tr = $("<tr></tr>");
            $tr.attr('index', i);
            $tr.attr('rowid', list[i]['id']);
            $tbody.append($tr);
            for (let j in header) {
                let $td = $("<td></td>");
                $tr.append($td);
                let value = "";
                if (header[j].type === 'btns') {
                    $td.append(createBtns(header[j]['th'], i, list[i], options));
                    continue;
                } else if (header[j].type === 'seq') {
                    value = i * 1 + (info.startRow ? info.startRow : 1);
                } else {
                    let fdValue = list[i][header[j].name];
                    if (header[j].fmt && options) {
                        let fmtFunction = options[header[j].fmt];
                        value = typeof fmtFunction === 'function' ? fmtFunction(fdValue, $td) : (fdValue ? fdValue[header[j].fmt] : "");
                    } else {
                        value = fdValue;
                        if (value === true) {
                            value = "<span class='glyphicon glyphicon-ok text-green'></span>";
                        } else if (value === false) {
                            value = "<span class='glyphicon glyphicon-remove text-danger'></span>";
                        }
                    }
                }
                if (value !== 'VoidUndo') {
                    let show = value === undefined || value === null || value === "" ? "-" : value;
                    $td.append("<span class='line-clamp' title='" + show + "'>" + show + "</span>");
                }
            }
        }
        // tr绑定选中事件
        $tbody.find('tr').on("click", function (event) {
            event.stopPropagation();
            if (event.button === 0) {  // 鼠标左键
                if (event.ctrlKey) { //  ctrl
                    if ($(this).hasClass("tr-active")) {
                        $(this).removeClass("tr-active");
                    } else {
                        $(this).addClass("tr-active");
                    }
                } else {
                    let $trActives = $tbody.find(".tr-active");
                    if ($(this).hasClass("tr-active")) {
                        if ($trActives && $trActives.length > 1) {
                            $trActives.removeClass("tr-active");
                            $(this).addClass("tr-active")
                        } else {
                            $trActives.removeClass("tr-active");
                        }
                    } else {
                        $trActives.removeClass("tr-active");
                        $(this).addClass("tr-active");
                    }
                }
            }
        });
    }

    // 列按钮事件
    function columnBtnsIndex($event, $btn) {
        $event.stopPropagation();
        let parents = $btn.parents('tr');
        parents.addClass('tr-active');
        parents.nextAll('tr').removeClass('tr-active');
        parents.prevAll('tr').removeClass('tr-active');
        return parents.attr("index");
    }

    $.fn.qsTable = {};
    // 初始化表格
    $.fn.CreateTable = function (pageInfo, params) {
        let table = $(this);
        if (!$.isArray(pageInfo)) {
            if (pageInfo.pageSize) {
                createPageTools(pageInfo, table, params);
            }
        }
        let $ths = table.find("th");
        let header = [];
        $ths.each(function ($i, th) {
            let name = $(th).attr("name");
            let type = $(th).attr("type");
            let fmt = $(th).attr("fmt");
            let hd = {'name': name, 'type': type, 'fmt': fmt, 'th': $(th)};
            header.push(hd);
        });
        table.find('tbody').remove();
        let $tbody = $("<tbody></tbody>");
        table.append($tbody);
        //初始化列表
        createList(pageInfo, $tbody, header, params);
        $("[data-toggle='tooltip']").tooltip();
    };

    $.fn.qsTable.pages = function (params) {
        params.pageNum = $(".pageQsTable .pageNum").val();
        params.pageSize = $(".pageQsTable .pageSize").val();
        return params;
    };


});