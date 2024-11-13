<script lang="ts">
	import { addTask } from '../store';

	let newTask: string = "";

	const handleAddTask = () => {
		if (newTask.trim()) {
			addTask(newTask);
			newTask = "";
		}
	};
</script>

<div class="input-group">
	<input
		placeholder="Add a new task"
		bind:value={newTask}
		on:keyup={(e) => e.key === 'Enter' && handleAddTask()}
	/>
	<button on:click={handleAddTask}>Add</button>
</div>

<style>
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
</style>
