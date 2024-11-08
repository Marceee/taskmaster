<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Task } from '../types';

	let newTask = "";
	let taskId = 1;
	const tasks = writable<Task[]>([]);

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
</script>



<h1>Behold the TaskMaster</h1>

<input
	placeholder="Add a new task"
	bind:value={newTask}
	on:keyup={(e) => e.key === 'Enter' && addTask()}
/>
<button on:click={addTask}>Add</button>

<ul>
	{#each $tasks as task (task.id)}
		<li>
			<span
				class:completed={task.completed}
				role="button"
			  tabindex="0"
			  on:click={() => toggleTaskCompletion(task.id)}
			  on:keydown={(e) => e.key === 'Enter' && toggleTaskCompletion(task.id)}
			>
			{task.title}
			</span>
			<button on:click={() => deleteTask(task.id)}>Delete</button>
		</li>
	{/each}
</ul>

<style>
    h1 {
        text-align: center;
    }
    input, button {
        padding: 12px 16px;
        border-radius: 4px;
        margin: 4px;
        text-align: center;
    }
    .completed {
        text-decoration: line-through;
    }
</style>
