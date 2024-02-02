
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function UserHome() {

    const [todos, setTodos] = useState([])

    function formatDate(dateString) {
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString("th-TH", options);
    }

    useEffect(() => {
        const run = async () => {
            let token = localStorage.getItem('token')
            const rs = await axios.get('http://localhost:8889/todos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTodos(rs.data.todos)
        }
        run()
    }, [])

    return (
        <div className='px-5 mt-3 max-w-[80rem] mx-auto'>
            {/* {JSON.stringify(todos)} */}
            {todos.length !== 0
                ?
                <table className='table table-lg'>
                    <thead className='bg-base-300'>
                        <tr className='text-[15px]'>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Create</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo.todo_id}>
                                <td>{todo.todo_id}</td>
                                <td>{todo.title}</td>
                                <td>{todo.status}</td>
                                <td>{formatDate(todo.createdAt)}</td>
                                <td>{formatDate(todo.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                : <p className='text-2xl font-semibold underline'>ไม่พบข้อมูล</p>
            }
        </div>
    )
}