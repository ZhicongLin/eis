var getScrollBarWidth = function () {
    if (cachedWidth === null) {
        var outer = $('<div  class="calcscrollout"><p class="calcscrollin"><p/><div/>')
        var w1, w2;
        $('body').append(outer);
        w1 = $('.calcscrollout')[0].offsetWidth;
        w2 = $('.calcscrollin')[0].offsetWidth;
        if (w1 === w2) {
            w2 = $('.calcscrollin')[0].clientWidth;
        }
        outer.remove();
        cachedWidth = w1-w2;
    }
    return cachedWidth;
};

//对换数组的位置
function swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

/**
 * Created by zhibin.zhao on 2017/6/27.
 */
$(function () {
    $.extend({
        error: function (text, callback) {
            $.dialog({
                lock: true,
                icon: 'error',
                content: "<span style='font-size: 20px'>" + (text ? text : "操作失败！") + "</span>",
                ok: callback,
            });
        },
        success: function (text, callback) {
            $.dialog({
                lock: true,
                time: 1,
                icon: 'succeed',
                content: "<span style='font-size: 20px'>" + (text ? text : "操作成功！") + "</span>",
                ok: callback
            });
        },
        confirm: function (text, ok, cancel) {
            $.dialog({
                lock: true,
                icon: 'question',
                content: "<span style='font-size: 20px'>" + text + "</span>",
                ok: ok,
                cancel: cancel ? cancel : true
            });
        }

    });
    $.fn.extend({
        initMenu : function (liClass) {
            let $this = $(liClass).parent('ul').parent('div');
            let $this_i = $this.find(".icon-arrow-right");
            $this_i.removeClass("icon-arrow-right").addClass("icon-xiajiantou");
            $this.find('.sidebar-title').next().show();
            $(liClass).addClass("active");
        },
        formParams: function() {
            let data = {};
            let t = $(this).serializeArray();
            $.each(t, function() {
                data[this.name] = this.value;
            });
            return data;
        },
        cleanForm: function() {
            let obj = $(this);
            obj.find("input,select,textarea").val("").prop("readonly", false).attr("disabled", false);
            // obj.find("textarea").val("").html("").prop("readonly", false).attr("disabled", false);
        },
        setForm: function (jsonValue, disabled) {
            let obj = $(this);
            $.each(jsonValue, function (name, ival) {
                let $oinput = obj.find("[name=" + name + "]");
                if ($oinput.hasClass("selectpicker")) {
                    $oinput.selectpicker('val', ival).trigger('change');
                }
                if (disabled) {
                    $oinput.prop("readonly", true);
                    $oinput.prop('disabled', true);
                    // $oinput.attr("disabled", true);
                }
                let type = $oinput.attr("type");
                if (type === "radio" || type === "checkbox") {
                    $oinput.each(function(){
                        if (Object.prototype.toString.apply(ival) === '[object Array]') {//是复选框，并且是数组
                            for (let i = 0; i < ival.length; i++) {
                                if ($(this).val() === ival[i])
                                    $(this).attr("checked", "checked");
                            }
                        }else{
                            if ($(this).val() === ival)
                                $(this).attr("checked", "checked");
                        }
                    });
                } else {
                    $oinput.val(ival);
                }
                if (Object.prototype.toString.apply(ival) === '[object Object]') {
                    $.each(ival, function (i, oval) {
                        let $oit = obj.find("[name='" + name + "." + i + "']");
                        $oit.val(oval);
                        if (disabled) {
                            $oit.prop("readonly", true);
                            $oit.attr("disabled", true);
                        }
                    });
                }
            });
        },
        printSuccess : function (callback) {
            $.dialog({
                lock: true,
                time: 1,
                icon: 'succeed',
                content: "<span style='font-size: 20px'>操作成功</span>",
                ok: callback
            });
        },
        printFailure : function (callback) {
            $.dialog({
                lock: true,
                time: 1,
                icon: 'error',
                content: "<span style='font-size: 20px'>操作失败</span>",
                ok: callback
            });
        },
        printConfirm: function (text, ok, cancel) {
            $.dialog({
                lock: true,
                icon: 'question',
                content: "<span style='font-size: 20px'>" + text + "</span>",
                ok: ok,
                cancel: cancel ? cancel : true
            });
        }
    });


    // let resizeTimer = null;

 /*   $(window).on('resize', function () {
            if (resizeTimer) {
                clearTimeout(resizeTimer)
            }
            resizeTimer = setTimeout(function(){
                let $panelBody = $('body .content .panel-body');
                $panelBody.css({'height': $(window).height() - 110});
                $("body .panel-body .tableDiv").css({'height': $(window).height() - 175, 'overflow-y': 'auto'});
                $("body .panel-body section").css({'height': $(window).height() - 158, 'overflow-y': 'auto'});
            }, 50);
        }
    );
    $(window).resize();*/

    let $body = $('body');
    $body.on('mousedown','.glyphicon-unchecked', function () {
        $(this).addClass('glyphicon-check');
        $(this).removeClass('glyphicon-unchecked');
        let forId = $(this).attr('for');
        if (forId) {
            $('#' + forId).val(1);
            return;
        }
        $(this).next('input').val(1);
    });
    $body.on('mousedown','.glyphicon-check', function () {
        $(this).removeClass('glyphicon-check');
        $(this).addClass('glyphicon-unchecked');
        let forId = $(this).attr('for');
        if (forId) {
            $('#' + forId).val(0);
            return;
        }
        $(this).next('input').val(0);
    });

    let $post = $.post;

    $.post = function (url, params, callback) {
        $(".loadding-modal").show();
        $post(url, params, function (data) {
            callback(data);
            $(".loadding-modal").hide();
        });
    };

    $.resizer = function ($document, size) {
        $document.css({
            'height': $(window).height() - size,
            'overflow-x': 'hidden',
            'overflow-y': 'auto'
        });
    }

    $(document).on('click', '.nav-tabs [role=presentation]', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).nextAll('[role=presentation]').removeClass('active');
            $(this).prevAll('[role=presentation]').removeClass('active');
        }
    });


});