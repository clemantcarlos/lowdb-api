import {v4 as uuid} from 'uuid'
import {getConnection} from '../database.js'
export const getTasks = (req,res)=>{
    const tasks = getConnection().data.task
    res.json(tasks)
}
export  const  createTask = async (req,res)=>{
    const newTask = {
        id:uuid(),
        name:req.body.name,
        description:req.body.description
    }
    try {
        const db = getConnection()
        db.data.task.push(newTask)
        await db.write()
    } catch (error) {
        return res.status(500).send(error)    
    }

    res.send(newTask)
}
export const getTask = (req,res)=>{
   const task = getConnection().data.task.find(task=>task.id===req.params.id)

   if (!task) return res.status(404).send({error:"Task not found"})

   res.send(task)
}
export const deleteTask = async (req,res)=>{

    const db = getConnection()

    const task = db.data.task.find(task=>task.id===req.params.id)

    if (!task) return res.status(404).send({error:"Task not found"})

    const newTasks = db.data.task.filter(t=>t.id !== task.id)

    db.data.task=newTasks;
    await db.write()

    res.json(task)
}
export const updateTask = async (req,res)=>{
    const db = getConnection()

    const task = db.data.task.find(task=>task.id===req.params.id)

    if (!task) return res.status(404).send({error:"Task not found"})

    task.name=req.body.name
    task.description=req.body.description

    db.data.task.map(t=>t.id===req.params.id ? task:t)

    await db.write()

    res.json(task)
}
export const count = (req,res)=>{
    const totalTask =getConnection().data.task.length

    res.json(totalTask)
}