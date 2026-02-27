import { useEffect, useState } from 'react';

interface Args {
  totalItems: number,
  limit: number
}

export  function usePagination({limit, totalItems}:Args) {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if(totalItems > 10){
      setTimeout(()=>{
        setTotalPages(totalItems / limit)
      },1)
    }else{
      setTimeout(()=>{
        setTotalPages(1)
      },1)
    }
  }, [totalItems])


  const onNextPage = () => {
    if(currentPage === totalPages - 1) return
    setCurrentPage(currentPage + 1)
  }

  const onPrevPage = () => {
    if(currentPage === 0) return
    setCurrentPage(currentPage - 1)
  }

  


  return {
    currentPage,
    totalPages,

    onNextPage,
    onPrevPage
  }
}
