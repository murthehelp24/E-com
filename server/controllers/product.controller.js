
import prisma from "../config/prisma.js"


export async function create(req, res) {
  try {
    const { title, description, price, quantity, categoryId, images } = req.body
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          }))
        }
      }
    })
    res.send('Create Product')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function list(req, res) {
  try {
    const { count } = req.params
    const product = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true
      }
    })
    res.send(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function read(req, res) {
  try {
    const { id } = req.params
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        category: true,
        images: true
      }
    })
    res.send(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function update(req, res) {
  try {
    const { title, description, price, quantity, categoryId, images } = req.body

    await prisma.image.deleteMany({
      where: {
        productId: Number(req.params.id)
      }
    })

    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          }))
        }
      }
    })
    res.send(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params

    //เดี๋ยวกลับมา 

    await prisma.product.delete({
      where: {
        id: Number(id)
      }
    })
    res.send('Delete Success')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export async function listBy(req, res) {
  try {
    const { sort, order, limit } = req.body
    console.log(sort, order, limit)
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: { category: true }
    })
    res.send(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}


//เขียน hdl แยกของ searchFilter
const hdlQuery = async (req, res, query) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query
        }
      },
      include: {
        category: true,
        images: true
      }
    })
    res.send(products)
  } catch (error) {
    console.log(error)
    res.status(500).json("Search Error")
  }
}

const hdlPrice = async (req, res, priceRange) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1]
        }
      },
      include: {
        category: true,
        images: true
      }
    })
    res.send(products)
  } catch (error) {
    console.log(error)
    res.send(500).json({ message: 'Search Error' })
  }
}

const hdlCategory = async (req, res, categoryId)=>{
  try {
    const product = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id)=> Number(id))
        }
      },
      include: {
        category: true,
        images: true
      }
    })
    res.send(product)
  } catch (error) {
    console.log(error)
    res.send(500).json({ message: 'Search Error'})
  }
}

export async function searchFilter(req, res) {
  try {
    const { query, category, price } = req.body
    if (query) {
      console.log('query', query)
      await hdlQuery(req, res, query)
    }
    if (category) {
      console.log('category', category)
      await hdlCategory(req, res, category)
    }
    if (price) {
      console.log('price', price)
      await hdlPrice(req, res, price)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}


