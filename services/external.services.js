import axios from 'axios';
import Todo from '../models/todo.model.js';

export const fetchAndSaveTodo = async () => {
  try {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

    const response = await axios.get(apiUrl);

    const data = response.data;

    // Explicit mapping (do not trust external contracts)
    const mappedTodo = {
      externalId: data.id,
      userId: data.userId,
      title: data.title,
      completed: data.completed,
    };

    const savedTodo = await Todo.create(mappedTodo);

    return savedTodo;
  } catch (error) {
    throw new Error(`Failed to fetch and save todo: ${error.message}`);
  }
};
