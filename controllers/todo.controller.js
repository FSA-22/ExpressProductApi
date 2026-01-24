import { fetchAndSaveTodo } from '../services/external.services.js';

export const getTodo = async (req, res, next) => {
  try {
    const todo = await fetchAndSaveTodo();

    console.log({ 'testing fetching Todo': todo });

    return res.status(200).json({
      message: 'Todo fetched and saved successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};
