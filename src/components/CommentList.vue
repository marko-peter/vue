<template>

	<div class="card">
		<div class="card-body">
			<!-- icon -->
			<i class="far fa-user"></i>
			<!-- comment name -->
			<b class="comment-name ml-3">{{comment.name}}</b> 
			<!-- date -->
			<small class="comment-date ml-5">{{new Date(comment.timestamp).toDateString()}}</small>
			
			<!-- delete button -->
			<a href="#" class="float-right" v-on:click.prevent="$emit('deleteComment', comment.id)">
				<i class="far fa-trash-alt"></i>
			</a>

			<hr class="comment-line">
			<!-- comment text -->
			<p class="comment-text">{{comment.text}}</p>
		</div>
	</div>

</template>

<script>
	
export default {
	name: "CommentList",
	
	props: {
		comment: Object
	}
};
</script>

<style scoped>

	.card-body {
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.comment-line	 {
		margin: 5px 0;
	}

	@media (min-width: 768px) {
		.card {
			width: 75%;
		}
	}

	@media (max-width: 767px) {
		.card {
			width: 100%;
		}
	}
</style>