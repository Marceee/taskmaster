<script>
	import { filter, filteredTasks } from '../../store';
	import TaskInput from '../TaskInput.svelte';
</script>

<div class="app-container">
	<!-- Sidebar -->
	<div class="sidebar">
		<div class="section-header">Tags</div>

		<div class="tags-container">
			<button on:click={() => filter.set('all')} class:active={$filter === 'all'}>All</button>
			<button on:click={() => filter.set('completed')} class:active={$filter === 'completed'}>Completed</button>
			<button on:click={() => filter.set('pending')} class:active={$filter === 'pending'}>Pending</button>
		</div>
	</div>

	<!-- Mid Section -->
	<div class="task-list">
		<div class="section-header">Today <span>{$filteredTasks.length}</span></div>
		<div class="container">
			<TaskInput />

			{#each $filteredTasks as task}
				<div class="task">
					<input type="checkbox" bind:checked={task.completed} />
					<span class="task-title">{task.title}</span>
					<button class="arrow" aria-label="Next">
						<i class="fas fa-chevron-right"></i>
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- Task Details Section -->
	<div class="task-details">
		<div class="section-header">Task:</div>
		<input type="text" placeholder="Task Title" />

		<div>Description</div>
		<textarea placeholder="Enter task description"></textarea>

		<button class="save-button">Save</button>
		<button class="delete-button">Delete Task</button>
	</div>
</div>

<style>
    .section-header {
        font-weight: bold;
        margin-bottom: 20px;
    }

    .app-container {
        display: flex;
        height: 100vh;
        font-family: Arial, sans-serif;
        color: #333;
    }

    .sidebar {
        width: 20%;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 5px;
        border-right: 1px solid #ddd;
    }

    .tags-container button {
        padding: 10px 20px;
        border: none;
        border-radius: 30px;
        background-color: #ddd;
        color: #333;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .tags-container button.active {
        background-color: #324c16;
        color: #fff;
    }

    .task-list {
        flex: 1;
        padding: 20px;
        border-right: 1px solid #ddd;
    }

    .container {
        width: 100%;
    }

    .task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: white;
        border: 1px solid #ddd;
				padding-top: 10px;
				padding-bottom: 10px;
    }

    .task-title {
        flex-grow: 1;
        margin-left: 10px;
    }

    .arrow {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
    }

    .task-details {
        width: 30%;
        padding: 20px;
    }

    .save-button, .delete-button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
        color: #fff;
    }

    .save-button {
        background-color: #ffcc00;
    }

    .delete-button {
        background-color: #ff6666;
    }
</style>
