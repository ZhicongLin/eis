$(function () {
    console.log('load device/front.js');
    let sliderWidth = document.body.scrollWidth;
    setSliderWidth();

    function setSliderWidth() {
        const p = document.getElementsByClassName('slider')[0];
        const c = document.getElementsByClassName('slider-group')[0];
        const ifLoop = true;

        let children = c.children;
        let width = 0;
        //注意三个xxWidth值的区别，clientWidth包含了页面右侧滑轨的宽度
        // let sliderWidth = p.clientWidth;
        // let sliderWidth = p.offsetWidth;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            child.style.width = sliderWidth + 'px';
            width += sliderWidth;
        }
        if (ifLoop) {
            width += 2 * sliderWidth;
        }
        c.style.width = width + 'px';
    }
    let dots = $(".dots .dot");
    dots.each(function (i, d) {
        $(d).click(function () {
            $(".dots .dot").removeClass('active');
            $(this).addClass('active');
            $(".slider-group").animate({left: -i * sliderWidth});
        });

    });

    let size = dots.length;
    //定时器,注意，这里是最开始启动的，所以呢，这里不设值，会导致页面开始刷新出现错误。
    var i = 0;
    var imageFunc = function () {
        dots.removeClass('active');
        $(dots[i]).addClass('active');
        $(".slider-group").animate({left: -i * sliderWidth});
        if (i === size - 1) {
            i = 0;
        } else {
            i++;
        }
    };
    var timer = setInterval(imageFunc, 3000);



    $("#recode").click(function () {
        location.href = "/device/front/form?deviceId=" + $("#deviceId").val();
    });

    $("#recodeRun").click(function () {
        location.href = "/device/front/recode?deviceId=" + $("#deviceId").val();
    });

    let dcode = $("#code").html();
    if (!dcode) {
        $("#code").html("<div class='input-group'>" +
            "  <input type='text' class='form-control' placeholder='请填写设备编号' id='modifyCode' aria-describedby='basic-addon2'>" +
            "  <span class='input-group-addon modifyBtn' id='basic-addon2'>确定</span>" +
            "</div>")
        $(".modifyBtn").click(function () {
            $.post("/device/front/modifyCode/"+$("#deviceId").val(), {code: $("#modifyCode").val()}, function (data) {
                location.reload();
            })
        });
    }
    let addr = $("#addr").html();
    if (!addr) {
        $("#addr").html("<div class='input-group'>" +
            "  <input type='text' class='form-control' placeholder='请填写设备地址' id='modifyAddr' aria-describedby='basic-addon2'>" +
            "  <span class='input-group-addon modifyAddrBtn' id='basic-addon2'>确定</span>" +
            "</div>");
        $(".modifyAddrBtn").click(function () {
            $.post("/device/front/modifyAddr/"+$("#deviceId").val(), {addr: $("#modifyAddr").val()}, function (data) {
                location.reload();
            })
        });
    }

    function hideImg() {
        let src3 = $('input.img3').val();
        if (!src3) {
            $('.img3').hide();
        }
        let img1 = $('input.img1');
        let src1 = false;
        img1.each(function (i, img) {
            if ($(img).val()) {
                src1 = true;
            } else {
                $(".dots").children("span:last-child").remove();
            }
        }) ;
        if (!src1) {
            $('.img1').hide();
        }
        if ($(".dots .dot").length <= 1) {
            clearInterval(timer );$(".dots").hide()
        }
    }
    hideImg();
});