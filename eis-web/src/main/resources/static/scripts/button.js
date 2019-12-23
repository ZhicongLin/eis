/*
操作按钮组件
 */
$(function () {
    //创建按钮
    function createBtn(btnId, btnClass) {
        let $btn = $("<button class='btn custom'></button>");
        $btn.addClass(btnClass);
        if (btnId) {
            $btn.attr("id", btnId)
        }
        return $btn;
    }

    //创建按钮span
    function createBtnSpan(spanClass) {
        let $span = $("<span class='glyphicon'></span>");
        if (spanClass) {
            $span.addClass(spanClass);
        }
        return $span;
    }
    //在元素中生成按钮
    function createElementBtn (msg, btnId, spanClass, $element, btnClass) {
        let $btn = createBtn(btnId, btnClass);
        let $span = createBtnSpan(spanClass);
        $btn.append($span);
        $btn.append("&nbsp;" + msg);
        if ($element) {
            $element.append($btn);
        }
        return $btn;
    }
    $.extend({
        button: {
            default: function (msg, btnId, spanClass, $element) {
                return createElementBtn(msg, btnId, spanClass, $element, "btn-default");
            },
            info: function (msg, btnId, spanClass, $element) {
                return createElementBtn(msg, btnId, spanClass, $element, "btn-info");
            },
            warning: function (msg, btnId, spanClass, $element) {
                return createElementBtn(msg, btnId, spanClass, $element, "btn-warning");
            },
            primary: function (msg, btnId, spanClass, $element) {
                return createElementBtn(msg, btnId, spanClass, $element, "btn-primary");
            },
            success: function (msg, btnId, spanClass, $element) {
                return createElementBtn(msg, btnId, spanClass, $element, "btn-success");
            },
            danger: function (msg, btnId, spanClass, $element) {
                return createElementBtn(msg, btnId, spanClass, $element, "btn-danger");
            },
            remove: function (btns) {
                if (btns) {
                    if (Object.prototype.toString.apply(btns) === '"[object Array]"') {
                        $.each(btns, function (i, btn) {
                            $(btn).remove();
                        });
                    } else {
                        $(btns).remove();
                    }
                }
            }
        }
    });
});