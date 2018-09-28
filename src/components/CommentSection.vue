<template>
	<div>
		<!-- list of comments -->
		<comment-list			
			v-for="comment in feed.comments"
     	v-bind:key="comment.id"
      v-bind:comment="comment"
      v-on:deleteComment="deleteComment">
		</comment-list>

		<!-- form for adding comments -->
		<div class="card card-form">
			<div class="card-body">
				<my-form
					v-bind:feedName="nameInForm"
          v-bind:feedText="textInForm" 
					v-on:formSubmitted="addComment">
				</my-form>
			</div>
		</div>	
	</div>
</template>

<script>
// @ is an alias to /src
import api from "@/api.js";
import CommentList from "@/components/CommentList.vue";
import MyForm from "@/components/MyForm.vue";

export default {
	name: "CommentSection",
	components: {
		MyForm,
		CommentList    
	},

	props: {
		feed: Object,		
	},

	data: function() {
		return {
			// props values for MyForm componenet
			nameInForm: '',
			textInForm: ''	
		}
	},

	methods: {
		// add comment to DB
		addComment: function(newComment) {
			newComment.timestamp = Date.now();			
			api.createComment(this.feed.id, newComment)
				.then(response => {
					if(response.status === 200) {
						// emit event to parent component
						this.$emit('commentChange', this.feed.id);

						// this is just for emptying add form after submit
						if(this.nameInForm == '') this.nameInForm = null;
						else this.nameInForm = '';
						if(this.textInForm == '') this.textInForm = null;
						else this.textInForm = '';	
					}
				})
				.catch( e => console.log(e));
		},
		// delete comment from DB
		deleteComment: function(commentId) {
			api.deleteComment(commentId)
				.then(response => {
					if(response.status === 200) {
						// emit event to parent component
						this.$emit('commentChange', this.feed.id);
					}
				})
				// handle errors
				.catch(e => console.log(e));
		}
	}
};
</script>

<style scoped>

	@media (max-width: 992px) {
		.card-form {
			width: 75%;
		}
	}

	@media (max-width: 767px) {
		.card-form {
			width: 100%;
		}
	}
</style>