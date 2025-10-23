import React, { useEffect } from "react"
import { initDatabase } from "./src/db/database"
import {HomeScreen} from "./src/app/HomeScreen"


export default function App() {
  useEffect(() => {
    initDatabase()
  }, [])

  return <HomeScreen />
}
