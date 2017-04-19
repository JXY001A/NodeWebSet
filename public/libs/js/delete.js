/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-19 10:23:01
 * @desc:    (删除操作代码)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
$(function() {
  $('.del').on('click', function(e) {
    var $target = $(e.target);
    var id = $target.data('id');
    var tr = $('.item-id-' + id);
    $.ajax({
      url: '/admin/delete/' + id,
      type: 'DELETE',
      success: function() {
        tr.remove();
      }
    });
  });
});