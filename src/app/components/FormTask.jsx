"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";


function FormTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //ESTO ES LO QUE CONECTA EL BACKEND CON EL FRONTEND A TRAVEZ DE EL ENV.
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${backendUrl}/api/tasks/`, {
        method: 'POST',
            body: JSON.stringify({ title, description}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json()
        console.log(data)
        router.refresh()
    };


    return (
        <div className="bg-slate-200 p-7 h-fit">
            <form onSubmit={handleSubmit}>
                <h1 className="text-black font-bold">Add Task</h1>
                <label htmlFor="title" className="text-xs text-black">Title:</label>
                <input type="text" name="title"
                    className="bg-slate-400 rounded-md p-2 mb-2  w-full text-slate-900"
                    onChange={e => setTitle(e.target.value)} />

                <label htmlFor="desription" className="text-xs text-black">Description:</label>
                <textarea name="description" className="bg-slate-400 rounded-md p-2 mb-2  w-full text-slate-900"

                    onChange={e => setDescription(e.target.value)}></textarea>
                <button className="bg-indigo-500 text-white rounded-md p-2 block w-full">Save</button>
            </form>
        </div>
    );
}
export default FormTask;