$(function () {
    // 当前页面的 uri
    var uri = [[${url}]];

    function pageClick(a) {
        var span = $(a).find('span');
        var pageNum = span.html();
        var url = uri + "?pageNum=" + pageNum + "&pageSize=10&search=" + $("#search").val();
        document.window.href(url);
    }
});