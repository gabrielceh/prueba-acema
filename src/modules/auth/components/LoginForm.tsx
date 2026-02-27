import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { toast } from 'sonner';
import { useLoginMutation } from '../hooks/useLoginQuery';

export  function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const mutation = useLoginMutation()

  const handleSubmit = (event:SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(!form.email.trim() || !form.password.trim()){
      toast.error("Email and password are required");
    }

    mutation.mutate(form,{
      onError:(error) =>{
        return toast.error(error.message)
      }
    })
  }

  const onFieldChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const text = event.target.value
    const name = event.target.name
    setForm(prev=>({
      ...prev,
      [name]: text
    }))
  }

  return (
    <form
      onSubmit={handleSubmit} 
      className='border-gray-300 border-solid border p-4 w-87 rounded-2xl flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <label htmlFor="">Email:</label>
        <input 
          className='border border-gray-200 p-1 rounded-lg' 
          type="text" 
          name='email' 
          id="email" 
          value={form.email} 
          onChange={onFieldChange}/>
      </div>
      
      <div className='flex flex-col gap-1'>
        <label htmlFor="">Password:</label>
        <input 
          className='border border-gray-200 p-1 rounded-lg'
          type="password" 
          name='password' 
          id="password"  
          value={form.password}
          onChange={onFieldChange} 
        />
      </div>

      <button disabled={mutation.isPending}>Login</button>
    </form>
  )
}
