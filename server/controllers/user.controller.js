import prisma from "../config/prisma.js"


export async function listUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true
      }
    })
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function changeStatus(req, res) {
  try {
    const { id, enabled } = req.body
    // console.log(id, enabled)
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { enabled: enabled }
    })
    res.send('Update Status Success')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function changeRole(req, res) {
  try {
    const { id, role } = req.body
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { role: role }
    })
    res.send('Update Role Success')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function userCart(req, res) {
  try {
    const { cart } = req.body
    // console.log(cart)
    // console.log(req.user.id)

    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) }
    })
    // console.log(user)

    // Delete old cart item ลบสินค้าเก่าเพื่อที่จะเพิ่มสินค้าใหม่
    await prisma.productOnCart.deleteMany({
      where: {
        cart: {
          orderedById: user.id
        }
      }
    })
    // Delete old cart ลบอีกหนึ่งที่
    await prisma.cart.deleteMany({
      where: { orderedById: user.id }
    })

    // เตรียมสินค้า
    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price
    }))

    // หาผลรวมของราคาสินค้า บวกจำนวนสินค้า
    let cartTotal = products.reduce((sum, item) => sum + item.price * item.count, 0)

    // New cart
    const newCart = await prisma.cart.create({
      data: {
        products: {
          create: products
        },
        cartTotal: cartTotal,
        orderedById: user.id
      }
    })
    console.log(newCart)
    res.send('Add Cart Ok')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function getUserCart(req, res) {
  try {
    res.send('hello getUserCart')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function emptyCart(req, res) {
  try {
    res.send('hello emptyCart')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function saveAddress(req, res) {
  try {
    res.send('hello saveAddress')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function saveOrder(req, res) {
  try {
    res.send('hello saveOrder')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function getOrder(req, res) {
  try {
    res.send('hello getOrder')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

