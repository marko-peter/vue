<template>
  <div class="group">    
    <div class="card card-form float-lg-left">
      <div class="card-body">
        
        <!-- form for adding new feeds -->
        <my-form
          v-bind:feedName="nameInForm"
          v-bind:feedText="textInForm"        
          v-on:formSubmitted="addFeed">
        </my-form>

      </div>
    </div>
    
    <spinner
      v-show="showSpinner">
    </spinner>

    <!-- list of all feeds -->
    <list-item
      v-for="feed in feeds"
      v-bind:key="feed.id"
      v-bind:feed="feed"
      v-on:delete="removeFromList">
    </list-item>

  </div>
</template>

<script>
// @ is an alias to /src
import MyForm from "@/components/MyForm.vue";
import ListItem from "@/components/ListItem.vue";
import Spinner from "@/components/Spinner.vue";
import api from "@/api.js";

export default {
  name: "home",

  components: {
    MyForm,
    ListItem,
    Spinner
  },

  data: function() {
    return {
      // array of all feeds
      feeds: [],
      // props values for MyForm componenet
      nameInForm: '',
      textInForm: '',
      showSpinner: true
    }
  },

  methods: {
    // create new feed
    addFeed: function(newFeed) {
      // assign values
      newFeed.timestamp = Date.now();
      newFeed.likes = 0;

      api.createFeed(newFeed)
				.then( response => {
					if(response.status === 200) {
            // load updated list of feeds
            this.getData();
            // this is just for emptying add form after submit
            if(this.nameInForm == '') this.nameInForm = null;
              else this.nameInForm = '';
            if(this.textInForm == '') this.textInForm = null;
              else this.textInForm = '';				
          }
        })
        // handle error
				.catch( e => console.log(e) );
    },

    // remove deleted feed from the view
    removeFromList: function(id) {
      this.feeds = this.feeds.filter( item => item.id !== id);
    },
    
    // get feeds from DB
    getData: function() {
      api.getAllFeeds()
      .then( response => {
        if(response.status === 200) {
          // save reversed list of feeds (the newest are at the top)
          this.feeds = response.data.reverse();
          this.showSpinner = false;
        }
      })
      // handle error
      .catch( e => console.log(e) );
    }
  },

  // load Feeds from DB on page load
  created: function() {
    this.getData();  
  }
}
</script>

<style>

#name, #text {
	background-color: rgba(255, 255, 255, 0.7);
}

form {
  margin-bottom: 10px;
}

/*clearfix*/
.group:before,
.group:after {
	content: " ";
	display: table;
}
.group:after {
	clear: both;
}
.group {
	*zoom: 1;
}

@media (max-width: 992px) {
	.card {
		width: 100%;
	}
}

@media (max-width: 575px) {
  .container {
		padding: 2% 6% 2% 5%;
  }
}

/* special style for firefox */
@-moz-document url-prefix() { 
  label {
    margin-bottom: 0;
  }
  .form-group {
    margin-bottom: 3%;
  }
}

/* special style for Internet Explorer */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { 
  textarea {
    margin-bottom:32px;
  }
}

</style>
