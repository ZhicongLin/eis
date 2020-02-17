/**
 * Created by zhibin.zhao on 2017/6/27.
 */
$(function () {
    submitValidator();
    submitPasswordValidator();

    /*点击修改按钮*/
    $(".modifyPersonInfo").on("click", function () {
        $("#userPersonModal").modal('show');
        $("#userPersonModalForm").setForm(userInfo, true);
    });
    /*点击secret显示/隐藏*/
    $(".toggle").on("click", function () {
        $(".secret").toggle();
    })
    /*用户信息表单校验和提交*/
    function submitValidator() {
        $('#modifyPersonInfo form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                displayName: {
                    validators: {
                        notEmpty: {
                            message: '昵称不能为空！'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: '邮箱不能为空！'
                        },
                        emailAddress: {
                            message: '无效的邮箱地址！'
                        }
                    }
                }
            }
        }).on('success.form.bv', function(e) {
            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
            $.post($form.attr('action'), $form.serialize(), function(result) {
                $.fn.printSuccess(function () {
                    $("#modifyPersonInfo").modal("hide");
                });
            });
        });
    }

    $("#modifyPassword .confirm").click(function () {
        let $form = $('#modifyPassword form');
        $form.submit();
        let error = $('#modifyPassword form .has-error')
        if (error && error.length > 0) {
            $.error("填写的信息有误");
        } else {
            let params = $form.formParams();
            $.ajax({
                url: "/users/pwd",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function (msg) {
                    $("#modifyPassword .cancel").click();
                    $.success("密码修改成功", 3000);
                },
                error: function (msg) {
                    $.error(msg.responseJSON.message);
                }
            })
        }
    });

    /*用户密码表单修改提交*/
    function submitPasswordValidator() {
        $('#modifyPassword form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                oldPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空！'
                        }
                    }
                },
                newPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空！'
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: '两次密码不一致！'
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空！'
                        },
                        identical: {
                            field: 'newPassword',
                            message: '两次密码不一致！'
                        }
                    }
                },
            }
        }).on('success.form.bv', function(e) {
            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
            var $action = $form.attr('action');
            $.ajax({
                url: $action,
                type: 'PUT',
                data : $form.serialize(),
                success : function (data) {
                    if(data=="Success") {
                        $.fn.printSuccess(function () {
                            $("#modifyPassword").modal("hide");
                        })
                    }
                    else{
                        $.fn.printFailure(function () {
                        })
                    }
                }
            })
        });
    }
})