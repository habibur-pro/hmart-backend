import { TProductAddPayload } from './product.interface'
import slug from 'slug'
import Product from './product.model'
import mongoose, { Types } from 'mongoose'
import ProductVariant from '../ProductVariant/productVariant.model'
import ApiError from '../../helpers/ApiErrot'
import httpStatus from 'http-status'
const addProduct = async (payload: TProductAddPayload) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const urlSlug = slug(payload.productName)
        // Step 2: Create the product object
        const newProduct = new Product({
            productName: payload.productName,
            urlSlug: urlSlug,
            category: payload.category, // Assuming category is an ObjectId
            description: payload.description,
            price: payload.price,
            stockQuantity: payload.stockQuantity,
            status: payload.status,
            images: payload.images,
        })

        // Step 3: Save the product to the database (but don't save yet)
        await newProduct.save({ session })

        // Step 4: Create variants if available in the payload
        const variantIds: Types.ObjectId[] = []
        if (payload.variants && payload.variants.length > 0) {
            for (const variantPayload of payload.variants) {
                const newVariant = new ProductVariant({
                    productId: newProduct.id, // Associate the variant with the product
                    color: variantPayload.color,
                    size: variantPayload.size,
                    price: variantPayload.price,
                    stockQuantity: variantPayload.stockQuantity,
                    image: variantPayload.image,
                })

                // Save the variant and store its ID
                const savedVariant = await newVariant.save({ session })
                variantIds.push(savedVariant._id)
            }
        }
        console.log(variantIds)
        newProduct.variants = variantIds
        await newProduct.save({ session })
        await session.commitTransaction()
        return newProduct
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            (error as Error)?.message || 'something went wrong'
        )
    } finally {
        await session.endSession()
    }
}

const getProducts = async () => {
    return await Product.find().populate('variants')
}

const ProductServices = { addProduct, getProducts }
export default ProductServices
