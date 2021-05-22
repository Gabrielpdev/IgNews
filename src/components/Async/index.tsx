import { useEffect, useState } from 'react';

export function Async(){
  const [isButtonActive, setIsButtonActive ] = useState(false)
  const [isButtonDisable, setIsButtonDisable ] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsButtonActive(true)
    }, 1000)

    setTimeout(() => {
      setIsButtonDisable(true)
    }, 1000)
  },[])

  return (
    <div>
      <div>Hello world</div>
      {isButtonActive && <button>Button</button>}
      {!isButtonDisable && <button>Disable</button>}
    </div>
  )
}