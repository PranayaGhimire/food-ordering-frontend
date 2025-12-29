'use client'
import { store } from "@/redux/store";
import { useRef } from "react"

const StoreProvider = () => {
  const storeRef = useRef(undefined);
  if(!storeRef.current)
    storeRef.current = store;
  return (
    <div>
      
    </div>
  )
}

export default StoreProvider
