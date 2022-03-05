<script lang="ts">
	import Comment from '$lib/Comment.svelte';
	import CommentInput from '$lib/CommentInput.svelte';
	import ConfirmPopup from '$lib/ConfirmPopup.svelte';
	import { comments } from '$lib/stores/comment';
	import { overlay } from '$lib/stores/overlay';
	import { getLatestId } from '$lib/utils/CommentUtils';

	let commentValue: string = '';

	/* Error the Text Area when validation fails */
	let inputError = false;

	const handleNewComment = () => {
		if (!commentValue) return (inputError = true);

		$comments.comments = [
			...$comments.comments,
			{
				content: commentValue,
				createdAt: 'now',
				id: getLatestId($comments),
				score: 0,
				user: $comments.currentUser,
				replies: []
			}
		];

		commentValue = '';
	};
</script>

<svelte:head>
	<title>FM - Svelete Comments</title>
</svelte:head>

<section>
	<h1><span class="purple">Frontend Mentor</span> - Interactive Comments</h1>

	{#each $comments.comments as comment, commentIndex}
		<Comment
			comment={{
				avatarSrc: comment.user.image.png,
				date: comment.createdAt,
				name: comment.user.username,
				score: comment.score,
				id: comment.id,
				content: comment.content
			}}
			{commentIndex}
		>
			{comment.content}
		</Comment>

		<!-- Comment Replies -->
		{#if comment.replies && comment.replies.length >= 1}
			<div class="comment__replies">
				<div class="comment__line" />
				{#each comment.replies as reply}
					<Comment
						comment={{
							avatarSrc: reply.user.image.png,
							date: reply.createdAt,
							name: reply.user.username,
							score: reply.score,
							id: reply.id,
							content: reply.content
						}}
						isReply={true}
						{commentIndex}
					>
						<span class="comment__reply-to">@{reply.replyingTo}</span>
						{reply.content}
					</Comment>
				{/each}
			</div>
		{/if}
	{/each}
	<CommentInput
		user={$comments.currentUser}
		placeholder="Add a comment"
		on:blur={() => (inputError = false)}
		bind:value={commentValue}
		on:click={handleNewComment}
	/>
</section>

{#if $overlay}
	<div class="overlay" on:click={() => ($overlay = false)} />
{/if}

<!-- {#if confirmPopup}
	<ConfirmPopup />
{/if} -->
<style>
	section {
		display: grid;
		justify-content: center;
		padding: 2rem;
		/* justify-items: end; */
		height: 100%;
		max-width: 730px;
		margin: 0 auto;
	}
	.comment__reply-to {
		color: var(--color-mod-blue);
		font-weight: bold;
	}
	section,
	.comment__replies {
		gap: 2rem;
	}
	.comment__replies {
		display: flex;
		flex-direction: column;
		position: relative;
		max-width: 750px;
		padding-left: 100px;
	}
	.comment__line {
		height: 100%;
		width: 2px;
		background-color: var(--color-light-gray);
		position: absolute;
		left: 40px;
	}

	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.349);
		backdrop-filter: blur(2px);
	}
	.purple {
		color: var(--color-mod-blue);
	}

    @media screen and (max-width: 768px) {
		.comment__replies {
            padding-left: 20px;
        }
        .comment__line {
            left: 0px;
        }
	}
</style>
