<template>

	<div>
		<!-- feed name -->
		<h1 class="display-4 text-center">{{feed.name}}</h1>
		<!-- feed text -->
		<p class="lead">{{feed.text}}</p>
		<hr>
		<!-- like/dislike section -->
		<p class="likes">
			<a href="#" v-on:click.prevent="likeCounter(1)"><i class="far fa-thumbs-up mr-3"></i></a> 
			<b>{{feed.likes}}</b>
			<a href="#"v-on:click.prevent="likeCounter(-1)"><i class="far fa-thumbs-down ml-3"></i></a>
		</p>
		<hr class="smallLine">
		<!-- buttons -->
		<div class="buttons">
			<a class="btn btn-outline-primary ml-5 mr-4" href="#" role="button" v-on:click.prevent="$emit('toggleForm')">{{editButton}}</a>
			<span>or</span>
			<a class="delete btn btn-outline-primary mr-5 ml-2" href="#" role="button" v-on:click.prevent="deleteFeed">Delete</a>
		</div>				
	</div>

</template>

<script>
import api from "@/api.js";

export default {	
	name: "FeedDetail",

	props: {
		feed: Object,
		// hide/show edit form
		formVisible: Boolean
	},

	computed: {
		// change button value
		editButton: function() {
			if(this.formVisible) return 'Cancel Edit'
			else return ' Edit form ';
		}		
	},

	methods: {
		// delete feed from DB
		deleteFeed: function() {
			api.deleteFeed(this.feed.id)
				.then( response => {
					if(response.status === 200) {
						// redirect after delete
						this.$router.push({path: '/'});
					}
				})
				// handle errors
				.catch( e => console.log(e));			
		},

		likeCounter: function(value) {
			this.feed.likes += value;
			// cannot be less than zero
			if(this.feed.likes < 0) {
				this.feed.likes = 0;
				return;
			}
			// we have to update the whole feed object
			// however other properties stay the same
			let item = {
				name: this.feed.name,
				text: this.feed.text
			};
			// emit event to parent component
			this.$emit('editLikes', item);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.delete {
	border: none;
}

@media (max-width: 575px) {
	.buttons, .likes {
		text-align: center;
	}
}

@media (min-width: 576px) {
	.likes {
		text-align: right;
		margin-right: 10%;
	}

	.smallLine {
		display:none;
	}
}
</style>
