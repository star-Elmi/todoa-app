import { ObjectId } from "mongodb";
import { getTodoCollection } from "./db";
import { createTodoInput, Todo, updateTodoInput } from "../types/todo";

/**
 * 1. Soo hel dhammaan Todos-ka (Search-ku halkan ayuu ka shaqeeyaa)
 */
export async function fetchTodos(): Promise<Todo[]> {
  try {
    const collection = await getTodoCollection();
    // Waxaan u soo habaynaynaa in kuwii ugu dambeeyey kor imaanayaan (sort by createdAt)
    const todos = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return todos.map((todo) => ({
      _id: todo._id.toString(),
      title: todo.title,
      priority: todo.priority || "Low", // Haddii priority maqan yahay, sii "Low"
      completed: todo.completed,
      createdAt: todo.createdAt instanceof Date 
        ? todo.createdAt.toISOString() 
        : new Date().toISOString(),
      updatedAt: todo.updatedAt instanceof Date 
        ? todo.updatedAt.toISOString() 
        : undefined,
    }));
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

/**
 * 2. Soo hel hal Todo adoo isticmaalaya ID
 */
export async function fetchTodoById(id: string): Promise<Todo | null> {
  try {
    const collection = await getTodoCollection();
    const todo = await collection.findOne({ _id: new ObjectId(id) });

    if (!todo) return null;

    return {
      _id: todo._id.toString(),
      title: todo.title,
      priority: todo.priority || "Low",
      completed: todo.completed,
      createdAt: todo.createdAt instanceof Date 
        ? todo.createdAt.toISOString() 
        : new Date().toISOString(),
      updatedAt: todo.updatedAt instanceof Date 
        ? todo.updatedAt.toISOString() 
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching todo by id:", error);
    return null;
  }
}

/**
 * 3. Create Todo: Tan ayaa xallinaysa Priority-ga "High" ama "Medium"
 */
export async function createTodo(todo: createTodoInput): Promise<string | null> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.insertOne({
      title: todo.title,
      priority: todo.priority, // Halkan ayay xogta dhabta ah ka raacaysaa
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating todo:", error);
    return null;
  }
}

/**
 * 4. Update Todo: In la bedelo Title, Priority ama Status
 */
export async function updateTodo(id: string, todo: updateTodoInput): Promise<boolean> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...todo, 
          updatedAt: new Date() 
        } 
      }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error updating todo:", error);
    return false;
  }
}

/**
 * 5. Delete Todo
 */
export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
}