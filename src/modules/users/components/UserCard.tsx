import type { User } from '@/core/users/domain/models';

interface Props {
  user: User
}

export  function UserCard({user}:Props) {
  return (
    <div className='rounded-lg border border-gray-300 p-4 flex justify-between'>
      <article>
        <h2 className='capitalize'>{user.user.name.first} {user.user.name.last}</h2>
        <section>
          <Field label="Email" value={user.user.email}/>
          <Field label="Teléfono" value={user.user.phone}/>
          <Field label="Ubicación" value={user.user.location.city}/>
          
        </section>
      </article>

      <img src={user.user.picture.medium} className='w-20 h-25'/>
    </div>
  )
}

function Field ({value, label}:{value:string, label: string}) {
  return (
    <p><span className='font-semibold'>{label}:</span> {value}</p>
  )
}
