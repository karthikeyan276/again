import React from 'react'
import "./Form.css"
import {useState} from "react"
import Axios from "axios"
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
function Form() {

    const [name,setName] =useState("")
    const [Email,setEmail] =useState("")
    const [Mobile,setMobile] =useState(0)
  const [data,setData]=useState([])
    const [details,setDetails]=useState([])
    const[backend,setbackend]=useState([])
    

 console.log(data)
   
   const addemp = (e)=>{
    e.preventDefault()

        Axios.post('http://localhost:3001/create',{
            name:name,
            Email:Email,
            Mobile:Mobile

        }).then(()=>{
            console.log("success")
        })

       
   }

   const getdetails =()=>{
       Axios.get("http://localhost:3001/dataemp").then((response)=>{
           console.log(response)
           setDetails(response.data)
       })
   }

   const getdd =()=>{
     Axios.get("http://localhost:3001/getall").then((response)=>{
       console.log(response)
       setData(response.data.results)
     })
   }

   const sett=()=>{
     Axios.get("http://localhost:3001/callseller").then((response)=>{
       console.log(response)
       setbackend(response.data.results)
     })
   }
  return (
    <div className='App'>
        <div className='info'>  

 <TextField
 onChange={(event)=>{setName(event.target.value )}}
        sx={{mt:1}}
        id="demo-helper-text-aligned"
        label="Name"
      /><br/>
       <TextField
 onChange={(event)=>{setEmail(event.target.value )}}
        
        id="demo-helper-text-aligned"
        label="Email"
      /><br/>
        <TextField
 onChange={(event)=>{setMobile(event.target.value )}}
      
        id="demo-helper-text-aligned"
        label="Mobile Number"
      /><br/>
        {/* <input type= "text"  onChange={(event)=>{setName(event.target.value )}}/>
          <label>Email</label>
        <input type= "email" onChange={(event)=>{setEmail(event.target.value )}}/>
        <label>Mobile number</label>
        <input type= "number" onChange={(event)=>{setMobile(event.target.value )}}/> */}
        <Button  type='submit' variant='contained' color="secondary"  onClick={addemp}>Add</Button><br/>
   
        </div>
       
       
        <div>
     
<hr/>
           <div style={{display:"flex",justifyContent:"center" }}>

                           <Button variant='contained' color="success" onClick={getdetails}>Show Details</Button> <br/>
                          

           </div>

        
           <Button variant='conatined' color="success" onClick={getdd}>get</Button>

           <Button variant='conatined' color="success" onClick={sett}>set</Button>

<Box sx={{ flexGrow: 1,mt:4 , ml:1,mr:1,mb:1}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {details.map((val,key) => (
          <Grid item xs={2} sm={6} md={6} >
            <Item sx={{background:"lightblue"}}><h2> Name: {val.name}  </h2>
          <h2>  Email:{val.Email}  </h2> 
          <h3> Mobile:{val.Mobile}  </h3> 
            
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>

 

    <Box sx={{ flexGrow: 1,mt:4 , ml:1,mr:1,mb:1}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((val) => (
          <Grid item xs={2} sm={6} md={6} >
            <Item sx={{background:"lightblue"}}>
            <h1>Name: {val.FirstName} . {val.LastName}</h1>
            <h4> ID:{val.PersonID}</h4>
            <h4>Address:{val.Address}</h4>
            <h4>City:{val.City}</h4>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>

        </div>

<form>
  <input type = "number" onChange={(event)=>{setMobile(event.target.value )}}  />
  
</form>
    </div>
  )
}

export default Form