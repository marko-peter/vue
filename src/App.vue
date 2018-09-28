<!-- main vue component with general CSS styling -->
<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<style>
body {
	background-image: url(../src/assets/background.jpg);
	background-size: cover;
}
.container {
  margin-top: 3%;
  margin-bottom: 2%;
  padding: 0;
}

.card {
	width: 47%;
	margin: 1% 1.5%;
	background-color: rgba(255, 255, 255, 0.8);
}

form {
	width: 100%;
}

textarea {
  resize: none;
}

.card:hover {
	background-color: rgba(255, 255, 255, 0.9);
}
</style>
