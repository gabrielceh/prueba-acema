interface Props {
  currentPage: number,
  totalPages: number,

  onNext: () => void
  onPrev: () => void
}

export function Pagination({currentPage, totalPages, onNext,  onPrev}:Props) {

  
  return (
    <div className='flex gap-4'>
      <button className='cursor-pointer' onClick={onPrev} disabled={currentPage === 0}>⏮️</button>
      <span>
        {currentPage + 1} / {totalPages}
      </span>
      <button className='cursor-pointer' onClick={onNext} disabled={currentPage === totalPages - 1}>⏭️</button>
    </div>
  )
}
