const express = require('express')
const sql = require('../../db')

const studentsRouter = express.Router()

async function store ( student){
    const response = await sql `
    INSERT INTO students(
        code_student, name_student, lastname_student, birth_date_student, status_student)
        VALUES (${student.code_student}, ${student.name_student}, ${student.lastname_student},${student.birth_date_student},${student.status_student});`
        return response
}

async function update ( student){
    const response = await sql `
    UPDATE students SET
        code_student=${student.code_student}, 
         name_student=${student.code_student},  
         lastname_student=${student.lastname_student},
         birth_date_student=${student.birth_date_student},
         status_student=${student.status_student}
         WHERE id_student=${student.id_student}`
        return response
}
//---------------------------------------------------------
//Obtener todos los registros
studentsRouter.route('/').get(async (req,res)=>{
    //Obtener el listado de Sesiones
    const students = await sql`SELECT id_student, code_student, name_student, lastname_student, birth_date_student, status_student
	FROM students;`
    res.render('students', {
        students: students
    });
})
//---------------------------------------------------------
//Insertat  registro

studentsRouter.route('/create').get((req, res)=>{
    res.render('create')
   
})

studentsRouter.route('/store').post(async(req, res)=>{
    console.log(req.body);
    await store(req.body) //Almacenamos en DB
    res.redirect('/students')
})

//---------------------------------------------------------
//Editar todos los registros

    studentsRouter.route('/edit/:id').get(async(req, res)=>{
    //1.Consultar ek registro en la DB a partir de su ID
    const id_student = req.params.id
    const student = await sql`SELECT id_student, code_student, name_student, lastname_student, birth_date_student, status_student
	FROM students
	where id_student= ${id_student};`
    

    //2. Enviar el registro a la plantilla
    res.render('edit',{
        student: student[0]
    })
   
})

studentsRouter.route('/update').post(async(req, res)=>{
    //1.Consultar ek registro en la DB a partir de su ID
    console.log(req.body);
    await update (req.body)
   
    res.redirect('/students')
})



//-----------------------DELETE
studentsRouter.route('/destroy/:id').post(async(req, res)=>{
    const id_student = req.params.id
    const response = await sql`
    DELETE  FROM students
    WHERE id_student=${id_student};`

    res.redirect('/students')
})


module.exports = studentsRouter