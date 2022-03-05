import type { IComment } from '$lib/data';

/**
 * @param {IComment} commentData Comment data to locate the last used ID
 * @returns {number} Next valid ID to be used
 */
export const getLatestId = (commentData: IComment): number => {
	let lastId = 0;

	const lastComment = commentData.comments[commentData.comments.length - 1];
	if (
		lastComment.replies &&
		lastComment.replies instanceof Array &&
		lastComment.replies.length >= 1
	) {
		return (lastId = lastComment.replies[lastComment.replies.length - 1].id + 1);
	}

	return commentData.comments[commentData.comments.length - 1].id + 1;
};
