$(function () {
    $.fn.panel = function (list, params) {
        $(this).empty();
        if (list && list.length) {
            for (let i in list) {
                $(this).append(_panel($(this), list[i], params));
            }
        }
    };

    /*
    params = {
        title : [{'name':'id', fmt:function(val){}}]
        foot: [{buttonClass:'btn-primary', iconClass:'glyphicon-eye-open', value='查看', call:function(row){}}]
    };
     */
    function _panel($this, row, params) {
        let $panel = $("<ul class='project--container col-sm-3'>" +
            "<li class='project-context'>" +
                "<div class='project-logo--container project--logo'>" +
                "     <span class='glyphicon glyphicon-fire'></span>" +
                "</div>" +
                "<div class='project--title'></div>" +
            "<p class='project--body' data-toggle='tooltip'></p>" +
            "</li>" +
            "<li class='btn-group project--foot'></li>" +
            "</ul>");
        $this.append($panel);
        let $projectContext = $panel.find('.project--body');
        if (params['context']) {
            let val = row[params['context']];
            $projectContext.append(val);
            $projectContext.attr("title", val)
        }

        let $projectTitle = $panel.find(".project--title");
        projectTitle(row, params['title'], $projectTitle);

        let $projectFoot = $panel.find(".project--foot");
        projectFoot(row, params['foot'], $projectFoot);
        return $panel;
    }

    //生成panel的按纽
    function projectFoot(row, foot, $projectFoot) {
        if (!foot) {
            return "";
        }
        for (let i in foot) {
            let $btn = $("<span class='btn " + foot[i]['buttonClass'] + "' type='button' title='" + foot[i]['value'] + "'>" +
                            "<span class='glyphicon " + foot[i]['iconClass'] + "' ></span>" +
                        "</span>");
            $btn.attr('data-toggle', 'tooltip');
            $btn.attr('data-placement', 'top');
            $projectFoot.append($btn);
            $btn.on('click',  function () {
                foot[i]['call'] ? foot[i]['call'](row) : "";
            });

            $("[data-toggle='tooltip']").tooltip();
        }
    }

    //生成panel的名称
    function projectTitle(row, titles, $projectTitle) {
        if (!titles) {
            return ""
        }
        let br = "<br/>";
        $projectTitle.append($("<input type='hidden' name='id' value='" + row['id'] + "'/>"));
        for (let i in titles) {
            if (titles[i]['name']) {
                let fmt = titles[i]['fmt'];
                let val = row[titles[i]['name']];
                if (fmt && typeof fmt === 'function') {
                    val = fmt(row[titles[i]['name']]);
                } else if (fmt) {
                    val = fmt(row[titles[i]['name']][fmt]);
                }
                $projectTitle.append("<p>" + val + "</p>")
            }
        }
    }
});