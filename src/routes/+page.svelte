<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Task } from '../types';

	let newTask = "";
	let taskId = 1;
	const tasks = writable<Task[]>([]);

	let filter: 'all' | 'completed' | 'pending' = 'all';

	const addTask = () => {
		if (newTask.trim()) {
			tasks.update((currentTasks) => [
				...currentTasks,
				{ id: taskId++, title: newTask, completed: false },
			]);
			newTask = "";
		}
	}

	const toggleTaskCompletion= (id: number) => {
		tasks.update((currentTasks) =>
			currentTasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	}

	const deleteTask = (id: number) => {
		tasks.update((currentTasks) => currentTasks.filter((task) => task.id !== id));
	}

	$: filteredTasks = $tasks.filter(task =>
		filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed)
	);
</script>



<h1>Behold the TaskMaster</h1>

<div class="content-container">
	<div class="input-container">
		<div class="input-group">
		<input
			placeholder="Add a new task"
			bind:value={newTask}
			on:keyup={(e) => e.key === 'Enter' && addTask()}
		/>
		<button on:click={addTask}>Add</button>
	</div>

	<div class="filter-container">
		<button on:click={() => filter = 'all'} class:active={filter === 'all'}>All</button>
		<button on:click={() => filter = 'completed'} class:active={filter === 'completed'}>Completed</button>
		<button on:click={() => filter = 'pending'} class:active={filter === 'pending'}>Pending</button>
	</div>
	</div>
	<div class="table-container">
		<table>
			<thead>
			<tr>
				<th>ID</th>
				<th>Title</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{#each filteredTasks as task (task.id)}
				<tr>
					<td>{task.id}</td>
					<td>{task.title}</td>
					<td class:completed={task.completed}>
						{task.completed ? 'Completed' : 'Pending'}
					</td>
					<td>
						<button class="action-btn complete-btn" on:click={() => toggleTaskCompletion(task.id)}>
							{task.completed ? 'Undo' : 'Complete'}
						</button>
						<button class="action-btn delete-btn" on:click={() => deleteTask(task.id)}>Delete</button>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
    h1 {
        text-align: center;
        font-family: Arial, sans-serif;
        color: #4A4A4A;
    }

    .content-container {
        width: 80%;
        margin: 0 auto;
    }

    .input-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    .input-group {
        display: flex;
    }

    input, button {
        padding: 10px 60px;
        margin: 4px;
        border-radius: 4px;
        border: 1px solid #ddd;
        font-size: 1rem;
    }

    .filter-container button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background-color: #ddd;
        color: #333;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .filter-container button.active {
        background-color: #324c16;
        color: #fff;
    }

    .table-container {
        width: 100%;
        margin-top: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        color: #333;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    th {
        background-color: #f4f4f4;
        color: #333;
        font-weight: bold;
        padding: 12px;
        text-align: left;
        border-bottom: 2px solid #ddd;
    }

    td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    .completed {
        color: green;
        font-weight: bold;
    }

    .action-btn {
        padding: 6px 12px;
        margin-right: 4px;
        border: none;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .complete-btn {
        background-color: #324c16;
    }

    .complete-btn:hover {
        background-color: #218838;
    }

    .delete-btn {
        background-color: #9a1622;
    }

    .delete-btn:hover {
        background-color: #c82333;
    }
</style>

