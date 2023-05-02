import { Box } from '@mui/system'
import React from 'react'
import Loading from '../components/loading/Loading'
import style from "./index.module.css"

const LoadingProtectRoute = () => {
  return (
    <Box className={style.loadingRout}>
        <Loading width={"300px"} height={"300px"}/>
    </Box>
  )
}

export default LoadingProtectRoute