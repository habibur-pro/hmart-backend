import slugify from 'slugify'
import Category from './category.model'
const createCategory = async (payload: { categoryName: string }) => {
    const slug = slugify(payload.categoryName)
    const categoryData = { ...payload, url_slug: slug }
    await Category.create(categoryData)
    return { message: 'category created' }
}
const categoryServices = { createCategory }
export default categoryServices
