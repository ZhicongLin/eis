/**
 * Created by Administrator on 2017/6/14.
 */
$(function () {

    $(".sidebar-nav .sidebar-title").on("click", function (e) {
        var $this_i = $(this).find("i");
        if ($this_i.hasClass("icon-xiajiantou")) {
            $this_i.removeClass("icon-xiajiantou").addClass("icon-arrow-right");
            $(this).next().slideUp();
        } else {
            $('.sidebar-title').each(function (index, sidebar) {
                if ($(sidebar) !== $(this)) {
                    $(sidebar).find("i").removeClass("icon-xiajiantou").addClass("icon-arrow-right");
                    $(sidebar).next().slideUp();
                }
            });
            $this_i.removeClass("icon-arrow-right").addClass("icon-xiajiantou");
            $(this).next().slideDown();
        }
    });

/*    // 一级目录
    function changeLevelOne(){
        let $this_i = $(this).find("i");
        let $menu = $(".menu");
        let $levTwo = $(".menu-ul");
        let $content = $(".content");
        $(".fold-menu").on("click", function () {
            if($menu.hasClass("close-menu")){
                // $.cookie("close-menu", "open");
                openMenuNav($menu, $this_i, $levTwo, $content);
            } else {
                // $.cookie("close-menu", "close");
                closeMenuNav($menu, $this_i, $levTwo, $content);
            }
        })
    }
    changeLevelOne();*/

    $(".menu").mousemove(function () {
        $(this).removeClass("close-menu");
        setSpan(true);
    });
    $(".menu").mouseleave(function () {
        $(this).addClass("close-menu");
        setSpan(false);
    });


    function openMenuNav($menu, $this_i, $levTwo, $content) {
        $menu.removeClass("close-menu");
        $this_i.removeClass("icon-zhankai-caidan").addClass("icon-zhedietubiao-yizhedie");
        setSpan(true)
        if($levTwo.hasClass("hids-menu-ul")){
            $content.addClass("view-page-leftTwo");
            $content.removeClass('view-page-left')
        }else{
            $content.removeClass('view-page-leftThree')
        }
    }

    function closeMenuNav($menu, $this_i, $levTwo, $content) {
        $menu.addClass("close-menu");
        $this_i.removeClass("icon-zhedietubiao-yizhedie").addClass("icon-zhankai-caidan");
        setSpan(false)
        if($levTwo.hasClass("hids-menu-ul")){
            $content.removeClass("view-page-leftTwo");
            $content.addClass('view-page-left')
        }else{
            $content.addClass('view-page-leftThree')
        }
    }

    /**
     *  收缩目录
     **/
    function hideTwoLevelMenu(){
        // 收缩二级目录
        var $menu = $(".menu");
        var $panel = $(".menu-ul");
        var $erBtn = $(".menu-ul-min");
        var $content = $('.content');
        $erBtn.on("click",function(){

            if($panel.hasClass("hids-menu-ul")){
                $panel.removeClass("hids-menu-ul");

                if($menu.hasClass("close-menu")){
                    $content.addClass("view-page-leftThree");
                    $content.removeClass("view-page-left");
                }else{
                    $content.removeClass("view-page-leftTwo");
                }
                
            }else{
                $panel.addClass("hids-menu-ul");

                if($menu.hasClass("close-menu")){
                    $content.removeClass("view-page-leftThree");
                    $content.addClass("view-page-left");
                }else{
                    $content.addClass("view-page-leftTwo");
                }
            }
        })
    }
    hideTwoLevelMenu();

    initMenuTip();
    function initMenuTip() {
        $('.sidebar-title, a').each(function () {
            $(this).tipsy({gravity: 'w'});
        })
    }
    setSpan(false);
    function setSpan(flag) {
        var $isHide = "span-hide";
        var $span = $(".sidebar-nav").find("span");
        if (flag === false) {
            $.each($span, function () {
                $(this).addClass("span-hide")
            })
        } else{
            $.each($span, function () {
                $(this).removeClass("span-hide")
            })
        }
    }

    // setTimeout(function () {
    //     if ($.cookie("close-menu") === "close") {
    //         let $this_i = $(this).find("i");
    //         let $menu = $(".menu");
    //         let $levTwo = $(".menu-ul");
    //         let $content = $(".content");
    //         closeMenuNav($menu, $this_i, $levTwo, $content);
    //     }
    // }, 300);
});