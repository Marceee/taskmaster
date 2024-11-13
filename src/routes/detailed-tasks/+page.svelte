<script>
	import { filter, filteredTasks, selectedTask, showTaskDetails } from '../../store';
	import TaskInput from '../TaskInput.svelte';

	console.log(selectedTask)
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

	<!-- Task List Section -->
	<div class="task-list">
		<div class="section-header">Today <span>{$filteredTasks.length}</span></div>
		<TaskInput />

		{#each $filteredTasks as task}
			<div class="task">
				<input type="checkbox" bind:checked={task.completed} />
				<span class="task-title">{task.title}</span>
				<button class="arrow" aria-label="View Task Details" on:click={() => showTaskDetails(task)}>
					<i class="fas fa-chevron-right"></i>
				</button>
			</div>
		{/each}
	</div>

	<!-- Task Details Section -->
	<div class="task-details">
		{#if $selectedTask}
			<div class="section-header">Task Details</div>
			<div>Title</div>
			<input type="text" bind:value={$selectedTask.title} placeholder="Task Title" />

			<div>Description</div>
			<textarea bind:value={$selectedTask.description} placeholder="Enter task description"></textarea>

			<button class="save-button">Update</button>
			<button class="delete-button">Delete Task</button>
		{:else}
			<p>Select a task to view details.</p>
		{/if}
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
        border-right: 1px solid #ddd;
        box-sizing: border-box;
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
        margin-bottom: 10px;
        width: 100%;
    }

    .tags-container button.active {
        background-color: #324c16;
        color: #fff;
    }

    .task-list {
        width: 50%;
        padding: 20px;
        border-right: 1px solid #ddd;
        box-sizing: border-box;
    }

    .task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
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
        box-sizing: border-box;
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
