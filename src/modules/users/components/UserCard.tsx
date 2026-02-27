import type { User } from '@/core/users/domain/models';
import { toast } from 'sonner';
import { useUserStore } from '../stores/users/users.store';

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  const deleteUser = useUserStore((state) => state.deleteUser);

  const onDelete = () => {
    toast('Delete user?', {
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
      action: {
        label: 'Confirm',
        onClick: () => deleteUser(user.user.email),
      },
    });
  };

  return (
    <div className='rounded-lg border border-gray-300 p-4 flex flex-col gap-5'>
      <div className='flex justify-between'>
        <article>
          <h2 className='capitalize'>
            {user.user.name.first} {user.user.name.last}
          </h2>
          <section>
            <Field label='Email' value={user.user.email} />
            <Field label='Phone' value={user.user.phone} />
            <Field label='Location' value={user.user.location.city} />
          </section>
        </article>

        <img src={user.user.picture.medium} className='w-20 h-25' />
      </div>

      <section>
        <button
          className='bg-red-500 text-white px-2 py-1 rounded-lg cursor-pointer active:scale-[0.95]'
          onClick={onDelete}
        >
          Delete
        </button>
      </section>
    </div>
  );
}

function Field ({value, label}:{value:string, label: string}) {
  return (
    <p><span className='font-semibold'>{label}:</span> {value}</p>
  )
}
