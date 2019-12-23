/**
 * 关键字 属性： model-each, model-text, model-value
 * 注意： 使用时 $(this)必须是这些属性的父节点
 */
$(function () {
    $.fn.models = function (obj) {
        if (obj === undefined || obj === null || obj === "") {
            return;
        }
        if (obj instanceof Array) {
            let $each = $(this).find('[model-each]').first();
            if ($each) {
                let eachValue = $each.attr('model-each');
                let eachResult = [];
                for (let i in obj) {
                    let $clone = $each.clone();
                    __setText($clone, obj[i], eachValue);
                    __setValue($clone, obj[i], eachValue);
                    __setTitle($clone, obj[i], eachValue);
                    eachResult.push($clone);
                }
                if ($(this).hasClass('model-body')) {
                    $(this).empty();
                    $(this).append(eachResult);
                } else {
                    $(this).find('.model-body').empty();
                    $(this).find('.model-body').append(eachResult);
                }
            }
        } else {
            __setText($(this), obj);
            __setValue($(this), obj);
            __setTitle($(this), obj);
        }
        $('[data-toggle="tooltip"]').tooltip();
        let to = setTimeout(function () {
            $('.scroll-dialog').addClass('scroll-dialog-open');
            clearTimeout(to);
        }, 80);
    };

    function __setText($clone, obj, eachValue) {
        let $modelTextKeys= $clone.find('[model-text]');
        $.each($modelTextKeys, function (k,  element) {
            let modelTextKey =  $(element).attr('model-text');
            let value = __getValue(obj, modelTextKey, eachValue);
            if(value !== "------No--Replace---Model") {
                $(element).html(value);
            }
        });
    }

    function __setValue($clone, obj, eachValue) {
        let $modelTextKeys= $clone.find('[model-value]');
        $.each($modelTextKeys, function (k,  element) {
            let modelTextKey =  $(element).attr('model-value');
            let value = __getValue(obj, modelTextKey, eachValue);
            if(value !== "------No--Replace---Model") {
                $(element).attr("value", value);
                $(element).val(value);
            }
        });
    }

    function __setTitle($clone, obj, eachValue) {
        let $modelTextKeys= $clone.find('[model-title]');
        $.each($modelTextKeys, function (k,  element) {
            let modelTextKey =  $(element).attr('model-title');
            let value = __getValue(obj, modelTextKey, eachValue);
            if(value !== "------No--Replace---Model") {
                $(element).attr("title", value);
                $(element).attr("data-original-title", value);
            }
        });
    }

    function __getValue(obj, modelKey, objKey) {
        let keyArr = modelKey.split('.');
        let modelValue = "";
        if (!objKey) {
            modelValue = obj;
        }
        for (let j in keyArr ) {
            if (!objKey) {
                modelValue = modelValue[keyArr[j]];
                continue;
            }
            if (j * 1 === 0) {
                if (keyArr[j] === objKey) {
                    modelValue = obj;
                } else {
                    return "------No--Replace---Model";
                }
            } else {
                modelValue = modelValue ? modelValue[keyArr[j]] : "";
            }
        }
        return modelValue;
    }
});