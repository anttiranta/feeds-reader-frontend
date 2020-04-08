import { useState } from 'react'

const useInputWithCallback = (
  type: string, 
  defaultValue: string | number | boolean = '', 
  callback: (value: string | number | boolean) => void
) => {
    const [value, setValue] = useState(
      defaultValue !== null ? defaultValue.toString() : ''
    )
  
    const onChange = (event: React.BaseSyntheticEvent) => {
      setValue(event.target.value)
      callback(value)
    }

    return {
      type,
      value,
      onChange
    }
  }

export default useInputWithCallback