//estructura basica//
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

//inicialisar areglo//
let tareas_diarias = [

    {id:1,tarea:'pasear al perro'},
];

app.get('/tareas_diarias',(req,res)=>{
    res.json(tareas_diarias);
});

// OPTENER las tareas POR ID//
app.get('/tareas_diarias/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const tarea_diaria = tareas_diarias.find(e => e.id===id);

    if(tarea_diaria){
        res.json(tarea_diaria);
        }else{
        res.status(404).send('no se encontro la tarea');
    }
    });
    
    //nueva tarea 
app.post('/tareas_diarias', (req,res) => {
    const nuevatarea = {
        id: tareas_diarias.length + 1,
        tarea: req.body.tarea
    };
    tareas_diarias
    .push(nuevatarea);
    res.status(201).json(nuevatarea);
});

// actualisar tareas
app.put('/tareas_diarias/:id',(req,res) => { 
    const id = parseInt(req.params.id);   
    const tarea_diaria = tareas_diarias.find(e => e.id===id); 
    if(tarea_diaria){
        tarea_diaria.name=req.body.name;
        res.json(tarea_diaria);
    }else{
        res.status(404).send('tarea no identificada');
    }
});

// eliminar una tarea
app.delete('/tareas_diarias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas_diarias.findIndex(e => e.id === id);
    if (index !== -1) {
        tareas_diarias.splice(index, 1);
        res.send('tarea eliminada');
    } else {
        res.status(404).send('tarea no encontrado');
    }
});

//INICIALISAR EL SERVIDOR
app.listen(PORT,()=>{
    console.log('Servidor ejecutandose en http://localhost:${PORT}');
});
