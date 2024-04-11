// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
function CardComponent({children}) {
  return (
    <div className="w-[280px] m-auto rounded-md border-solid border-2 border-black bg-red-300">
      {children}
    </div>
  )
}

export default CardComponent
