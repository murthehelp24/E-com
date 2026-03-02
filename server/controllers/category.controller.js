import prisma from "../config/prisma.js"


export async function create(req, res) {
  try {
    const {name} = req.body
    const category = await prisma.category.create({
      data: {
        name : name
      }
    })
    res.send(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function list(req, res) {
  try {
    const category = await prisma.category.findMany()
    res.send(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function remove(req, res) {
  try {
    const {id} = req.params
    const category = await prisma.category.delete({
      where: {
        id: Number(id)
      }
    })
    res.send(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}
