<script lang="ts">
	import Rating from './Rating.svelte';
	import Badge from './Badge.svelte';
	import Action from './Action.svelte';
	import CommentInput from './CommentInput.svelte';
	import { comments } from './stores/comment';
	import type { Reply } from './data';
	import TextArea from './TextArea.svelte';
	import Button from './Button.svelte';
	import { getLatestId } from './utils/CommentUtils';
	import ConfirmPopup from './ConfirmPopup.svelte';
	import { overlay } from './stores/overlay';

	interface CommentData {
		id: number;
		score: number;
		name: string;
		avatarSrc: string;
		date: string;
		content: string;
	}

	export let comment: CommentData;
	export let commentIndex: number = 0;
	export let isReply: boolean = false;

	/* Activated when the user is currently replying */
	export let replying = false;

	/* Activated when the user is currently editing their comment */
	export let editing = false;

	/* Comment Reply value */
	let replyValue: string = '';

	/* Comment Reply value */
	let editValue: string = '';

	/* Delete confirmation popup visibility */
	let confirmPopup = false;

	const toggleConfirmPopup = (boolean = !confirmPopup) => {
		$overlay = true;
		confirmPopup = true;
	};

	const handleCommentDelete = () => {
		const { id } = comment;

		if (isReply) {
			$comments.comments[commentIndex].replies = $comments.comments[commentIndex].replies.filter(
				(reply) => reply.id !== id
			);
		} else {
			$comments.comments = $comments.comments.filter((comment) => comment.id !== id);
		}

		$overlay = false;
	};

	const handleCommentEdit = () => {
		if (isReply) {
			let replyIndex = $comments.comments[commentIndex].replies.findIndex(
				(reply) => reply.id === comment.id
			);
			$comments.comments[commentIndex].replies[replyIndex].content = comment.content;
		} else {
			$comments.comments[commentIndex].content = comment.content;
		}

		editing = false;
	};

	const handleCommentReply = () => {
		const replyData: Reply = {
			id: getLatestId($comments),
			content: replyValue,
			replyingTo: comment.name,
			user: $comments.currentUser,
			score: 0,
			createdAt: 'Now'
		};

		$comments.comments[commentIndex].replies = [
			...$comments.comments[commentIndex].replies,
			replyData
		];

		replying = false;
		replyValue = null;
	};

	$: if ($overlay == false) {
		confirmPopup = false;
	}
</script>

<div class="comment" class:is-reply={isReply} data-index={commentIndex}>
	<Rating score={comment.score} />

	<header class="comment__header">
		<img src={comment.avatarSrc} alt="Comment avatar" />
		<h2>{comment.name}</h2>
		{#if $comments.currentUser.username === comment.name}
			<Badge>you</Badge>
		{/if}
		<span>{comment.date}</span>
	</header>

	<div class="comment__actions">
		{#if $comments.currentUser.username === comment.name}
			<Action
				on:click={() => toggleConfirmPopup(true)}
				iconSrc="/icons/icon-delete.svg"
				color="var(--color-soft-red)">Delete</Action
			>
			<Action on:click={() => (editing = !editing)} iconSrc="/icons/icon-edit.svg">Edit</Action>
		{:else}
			<Action on:click={() => (replying = !replying)} iconSrc="/icons/icon-reply.svg">reply</Action>
		{/if}
	</div>

	{#if editing}
		<div class="comment__edit">
			<TextArea bind:value={comment.content} />
			<Button on:click={handleCommentEdit}>Update</Button>
		</div>
	{:else}
		<p class="comment__p"><slot /></p>
	{/if}
</div>

{#if replying}
	<CommentInput
		user={$comments.currentUser}
		placeholder="Reply to user {comment.name}"
		buttonString="reply"
		bind:value={replyValue}
		on:click={handleCommentReply}
	/>
{/if}

{#if confirmPopup}
	<ConfirmPopup
		on:cancel={() => toggleConfirmPopup(false)}
		on:delete={() => handleCommentDelete()}
	/>
{/if}

<style>
	.comment {
		display: grid;
		grid-template-columns: auto auto 1fr;
		grid-template-rows: auto 1fr;
		column-gap: 24px;
		row-gap: 15px;
		background-color: var(--color-white);
		border-radius: 8px;
		padding: 24px;
		width: 100%;
	}
	.comment__header {
		display: flex;
		align-items: center;
		gap: 16px;
		grid-row-start: 1;
	}
	.comment__header span {
		display: inline-block;
		/* white-space: nowrap; */
		max-width: max-content;
		text-transform: lowercase;
	}
	.comment__actions {
		display: flex;
		margin-left: auto;
		gap: 24px;
		grid-row-start: 1;
	}
	.comment__p {
		grid-column: 2/-1;
		grid-row: 2/-1;
	}
	.comment__edit {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		grid-column: 2/-1;
		grid-row: 2/-1;
		gap: 16px;
		height: 180px;
	}
	img {
		width: 32px;
		height: 32px;
		object-fit: contain;
	}

	@media screen and (max-width: 768px) {
		.comment {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			padding: 16px;
		}
		.comment__p, .comment__edit {
			grid-column: 1/-1;
		}
		.comment__actions {
			grid-row: 3/3;
			grid-column: 1/1;
		}
	}
</style>
