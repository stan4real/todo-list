import { useState } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { addTodo } from "../../redux/slices/crudTodoSlice"
import { useNavigate } from "react-router-dom"

const AddTodoForm = () => {
    const [name,setName] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        dispatch(addTodo({
          id:Date.now(), 
          name:name, 
          completed:false}))
        navigate("/todo-list/")
    }
  return (
    <form onSubmit={onSubmit} className="addform">
        <input
        type="text"
        className="text-input"
        placeholder="Название..."
        value={name}
        onChange={(event) => setName(event.target.value)}>
        </input>
        <button type="submit" className="btn">
            Добавить
        </button>
    </form>
  )
}

export default AddTodoForm