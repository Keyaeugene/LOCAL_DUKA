const prisma = require('../lib/prisma');

class ProductModel {
    // Validate product data
    validateProductData(data) {
        if (!data.name || !data.description || !data.quantity || !data.price || !data.category) {
            throw new Error('Name, description, quantity, price, and category are required');
        }
        if (!Array.isArray(data.images) || data.images.length === 0) {
            throw new Error('At least one image is required');
        }
        if (typeof data.quantity !== 'number' || data.quantity < 0) {
            throw new Error('Quantity must be a non-negative number');
        }
        if (typeof data.price !== 'number' || data.price < 0) {
            throw new Error('Price must be a non-negative number');
        }
    }

    // Find product by ID
    async findById(id) {
        return await prisma.product.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                description: true,
                images: true,
                quantity: true,
                price: true,
                category: true,
                ratings: {
                    select: {
                        id: true,
                        value: true,
                        userId: true,
                        createdAt: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    

    // Get all products
    async getAllProducts() {
        return await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                images: true,
                quantity: true,
                price: true,
                category: true,
                ratings: {
                    select: {
                        id: true,
                        value: true,
                        userId: true,
                        createdAt: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    // Create a new product
    async createProduct(productData) {
        this.validateProductData(productData);

        try {
            return await prisma.product.create({
                data: {
                    name: productData.name.trim(),
                    description: productData.description.trim(),
                    images: productData.images,
                    quantity: productData.quantity,
                    price: productData.price,
                    category: productData.category.trim(),
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    images: true,
                    quantity: true,
                    price: true,
                    category: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error('Product name already exists');
            }
            throw error;
        }
    }

    // Update a product
    async updateProduct(id, productData) {
        this.validateProductData(productData);

        try {
            return await prisma.product.update({
                where: { id: Number(id) },
                data: {
                    name: productData.name.trim(),
                    description: productData.description.trim(),
                    images: productData.images,
                    quantity: productData.quantity,
                    price: productData.price,
                    category: productData.category.trim(),
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    images: true,
                    quantity: true,
                    price: true,
                    category: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error('Product not found');
            }
            if (error.code === 'P2002') {
                throw new Error('Product name already exists');
            }
            throw error;
        }
    }

    // Delete a product
    async deleteProduct(id) {
        try {
            return await prisma.product.delete({
                where: { id: Number(id) },
                select: {
                    id: true,
                    name: true,
                },
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error('Product not found');
            }
            throw error;
        }
    }
}

module.exports = new ProductModel();