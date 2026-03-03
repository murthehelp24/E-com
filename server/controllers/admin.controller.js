import prisma from "../config/prisma.js"

export async function changeOrderStatus(req, res) {
  try {
    const { orderId, orderStatus } = req.body
    // console.log(orderId , orderStatus )
    const orderUpdate = await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: orderStatus }
    })
    res.json(orderUpdate)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" })
  }


}


export async function getOrderAdmin(req, res) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true
          }
        },
        orderedBy :{
          select: {
            id : true,
            email: true,
            address : true
          }
        }
      }
    })

    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" })
  }
}