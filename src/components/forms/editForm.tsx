import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { updateTodo } from "../../redux/slices/crudTodoSlice"

const EditForm = () => {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todos)
    const navigate = useNavigate()
    const {id} = useParams()
    const editing = todos.filter(f => f.id == Number(id))
    const {name} = editing[0]
    const [editName,setEditName] = useState(name)

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        dispatch(updateTodo({id:Number(id),name:editName}))
        navigate("/todo-list/")
    }
  return (
    <form onSubmit={onSubmit} className="editform">
        <input
        type="text"
        className="text-input"
        placeholder='edit'
        value={editName}
        onChange={(event => setEditName(event.target.value))}
        >
        </input>
        <button type="submit" className="btn">
            Редактировать
        </button>
    </form>
)}

export default EditForm