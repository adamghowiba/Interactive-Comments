import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { commentData, type IComment } from '$lib/data';
import { browser } from '$app/env';

let localCommentData: IComment;

if (browser) {
	const localComments = localStorage.getItem('comments');
	if (localComments) {
		localCommentData = JSON.parse(localComments);
	}
}
export const comments: Writable<IComment> = writable(localCommentData || commentData);

if (browser) {
	comments.subscribe((value) => {
		localStorage.setItem('comments', JSON.stringify(value));
	});
}
