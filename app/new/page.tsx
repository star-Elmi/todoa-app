"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createTodoAction } from "../actions/create";

export default function NewTodo() {
  // Waxaan isticmaalnaa useActionState si aan u qabano error-ka haddii uu dhaco
  const [state, formAction] = useActionState(createTodoAction, null);

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Add New Todo
          </h1>
          <Link
            href="/"
            className="text-rose-600 hover:text-rose-800 transition-colors font-medium text-sm"
          >
            ← Back to Todos
          </Link>
        </div>

        {/* FORM SECTION */}
        <form action={formAction} className="space-y-5">
          
          {/* INPUT: TITLE */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Todo Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Maxaad qabanaysaa? (tusaale: Akhriska Qur'anka)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
              required
              maxLength={200}
            />
            {state?.error && (
              <p className="text-red-500 text-sm mt-2">
                {state.error}
              </p>
            )}
          </div>

          {/* SELECT: PRIORITY (Mudnaanta) */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Priority (Mudnaanta)
            </label>
            <select 
              id="priority"
              name="priority" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-rose-500 outline-none transition-all cursor-pointer text-gray-700"
            >
              <option value="Low">🔴 Low Priority</option>
              <option value="Medium">🟠 Medium Priority</option>
              <option value="High">🟢 High Priority</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-rose-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-rose-700 transition-all shadow-sm active:scale-[0.98]"
            >
              Create Todo
            </button>

            <Link
              href="/"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}