import { useState } from 'react'

const useInput = (type: string, defaultValue: string | number | boolean = '') => {
    const [value, setValue] = useState(
      defaultValue !== null ? defaultValue.toString() : ''
    )
  
    const onChange = (event: React.BaseSyntheticEvent) => {
      setValue(event.target.value)
    }

    return {
      type,
      value,
      onChange
    }
}

export default useInput