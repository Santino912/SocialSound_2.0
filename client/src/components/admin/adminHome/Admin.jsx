import { Box, Button } from '@mui/material'
import React from 'react'
import style from "./admin.module.css"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReportIcon from '@mui/icons-material/Report';
import { useNavigate } from 'react-router-dom';
import { Arrow } from '../../componentsIcons';
import TimelineIcon from '@mui/icons-material/Timeline';

const Admin = () => {
    const navigate = useNavigate()
  return (
    <Box className={style.adminContainer}>
        <Button onClick={() => navigate("/home")} className={style.arrow}><Arrow/></Button>
        <Button onClick={() => navigate("/admin/users")} className={style.buttons}><AdminPanelSettingsIcon className={style.icon}/></Button>
        <Button onClick={() => navigate("/admin/posts")} className={style.buttons}><ReportIcon className={style.icon}/></Button>
        <Button onClick={() => navigate("/admin/graphs")} className={style.buttons}><TimelineIcon className={style.icon}/></Button>
    </Box>
  )
}

export default Admin