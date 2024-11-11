<script lang="ts">
	</script>
<svelte:head>
	<title>PlayGround</title>
	<meta name="description" content="Svelte Playground" />
</svelte:head>

<h1>Practice Ground</h1>

<div class="content">
<a href="/tasks">Task Master Table View</a>
<a href="/detailed-tasks">Task Master Detailed</a>
</div>

<style>
	h1 {
			text-align: center;
	}

  .content {
			text-align: center;
      display: flex;
      flex-direction: column;
      gap: 10px;
  }

  .content a {
      text-decoration: none;
      color: #3380d3;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.3s, color 0.3s;
  }

  .content a:hover {
      color: #000000;
  }
</style>
