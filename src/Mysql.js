const express = require('express');
const mysql = require('mysql');

const mysql = express();

mysql.listen('3000',()=>{
    console.log('server started on port 3000')
})