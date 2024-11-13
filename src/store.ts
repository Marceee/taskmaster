import { derived, type Writable, writable } from 'svelte/store';
import type { Task } from './types';

let taskId: number = 1;

const tasks = writable<Task[]>([
	{ id: taskId++, title: "Complete task master", description: "Learn SvelteKit", completed: true },
	{ id: taskId++, title: "Buy groceries", completed: true },
	{ id: taskId++, title: "Watch Lioness", description: "continue from ep 2", completed: false },
	{ id: taskId++, title: "Prepare for the meeting", completed: false },
]);

const selectedTask: Writable<Task> = writable({} as Task);

const showTaskDetails = (task: Task)=> {
	selectedTask.set(task);
}

const filter = writable<'all' | 'completed' | 'pending'>('all');

const filteredTasks = derived([tasks, filter], ([$tasks, $filter]) => {
	return $tasks.filter(task =>
		$filter === 'all' || ($filter === 'completed' && task.completed) || ($filter === 'pending' && !task.completed)
	);
});

const addTask = (title: string): void => {
	if (title.trim()) {
		tasks.update((currentTasks) => [
			...currentTasks,
			{ id: taskId++, title, completed: false },
		]);
	}
};

const toggleTaskCompletion = (id: number): void => {
	tasks.update((currentTasks) =>
		currentTasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		)
	);
};

const deleteTask = (id: number): void => {
	tasks.update((currentTasks) => currentTasks.filter((task) => task.id !== id));
};

export { tasks, addTask, toggleTaskCompletion, deleteTask, showTaskDetails, selectedTask, filter, filteredTasks };
