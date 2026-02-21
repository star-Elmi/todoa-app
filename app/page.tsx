import { fetchTodos } from './lib/todo';
import { toggleTodo } from './actions/toggle';
import { deleteTodo } from './actions/delete';
import Link from 'next/link';
import SearchBar  from './actions/SearchBar'; 

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const allTodos = await fetchTodos();
  const time = new Date().toLocaleTimeString();

  // Filter-ka raadinta
  const filteredTodos = allTodos.filter((todo: any) =>
    todo.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">📝 Todo App</h1>
          <Link href="/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            ➕ Add New Todo
          </Link>
        </div>
        <p className="text-sm text-gray-500 mb-6">Last updated: {time}</p>

        {/* --- SEARCH COMPONENT --- */}
        <SearchBar defaultValue={query} />

        <div className="space-y-3 mt-6">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed rounded-xl">
              <p className="text-gray-400">Lama helin wax natiijo ah "{query}"</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo._id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
                <div className="flex items-center space-x-3">
                  <form action={toggleTodo.bind(null, todo._id)}>
                    <button type="submit" className="text-2xl">{todo.completed ? '✅' : '⬜'}</button>
                  </form>
                  <div>
                    <span className={`text-lg block ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {todo.title}
                    </span>
                    {/* Priority Style */}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                      todo.priority === 'High' ? 'bg-red-100 text-red-600 border-red-200' :
                      todo.priority === 'Medium' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                      'bg-green-100 text-green-600 border-green-200'
                    }`}>
                      {todo.priority || 'Low'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link href={`/edit/${todo._id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-md">✏️</Link>
                  <form action={deleteTodo.bind(null, todo._id)}>
                    <button type="submit" className="p-2 text-red-600 hover:bg-red-100 rounded-md">🗑️</button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}