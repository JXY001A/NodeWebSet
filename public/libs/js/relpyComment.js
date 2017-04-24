/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-23 16:28:51
 * @desc:    (评论回复功能)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
$(function() {
	$('.comment').on('click', function(e) {
		var target = $(e.target);
		// 获取要回复的评论的id
		var commentId = $(this).data('cid');
		// 获取该评论的发表用户id
		var userID = $(this).data('tid');
		// 生成两个隐藏域，将这条数据添加到form表单中
		if ($('#_commentid').length > 0) {
			alert(12);
			$('#_commentid').attr('value', commentId);
			$('#tid').attr('value', userID);
		} else {
			$('<input>').attr({
				type: 'hidden',
				value: commentId,
				id: '_commentid',
				name: 'comment[cid]'
			}).appendTo('#commentForm');

			$('<input>').attr({
				type: 'hidden',
				value: userID,
				id:'tid',
				name: 'comment[tid]'
			}).appendTo('#commentForm');
		}
	});
});