// services/cartService.js
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import axios from 'axios';

const fetchProductDetails = async (productId) => {
  // --- Vérification de sécurité ---
  if (!productId) {
    console.error('fetchProductDetails: productId est manquant ou undefined.');
    throw new Error('ID de produit invalide ou manquant.');
  }
  // --- Fin de la vérification de sécurité ---

  const isValidObjectId = global.mongoose ? global.mongoose.Types.ObjectId.isValid(productId) : false;

  if (isValidObjectId) {
    const productFromDB = await productModel.findById(productId);
    if (!productFromDB) {
      throw new Error('Produit non trouvé dans la base locale.');
    }
    return { type: 'local', details: productFromDB };
  } else {
    // --- Vérification de sécurité supplémentaire ---
    // Même si productId n'est pas un ObjectId, il doit être une chaîne pour appeler startsWith
    if (typeof productId !== 'string') {
         console.error('fetchProductDetails: productId n\'est pas une chaîne.', productId, typeof productId);
         throw new Error('ID de produit invalide.');
    }
    // --- Fin de la vérification supplémentaire ---

    const fakeStoreId = productId.startsWith('fake_') ? productId.slice(5) : null;

    if (!fakeStoreId || isNaN(fakeStoreId)) {
      console.error('fetchProductDetails: Format d\'ID Fake Store invalide.', productId);
      throw new Error('Format d\'ID de produit invalide.');
    }

    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${fakeStoreId}`);
      const fakeProduct = response.data;

      const transformedDetails = {
        _id: `fake_${fakeProduct.id}`,
        productId: `fake_${fakeProduct.id}`,
        name: fakeProduct.title,
        price: fakeProduct.price,
        description: fakeProduct.description,
        image: fakeProduct.image,
        category: fakeProduct.category,
        rating: fakeProduct.rating?.rate,
        count: fakeProduct.rating?.count,
        externalId: fakeProduct.id
      };
      return { type: 'external', details: transformedDetails };
    } catch (apiError) {
      console.error('Erreur lors de la récupération du produit depuis Fake Store API:', apiError.message);
      if (apiError.response && apiError.response.status === 404) {
        throw new Error('Produit non trouvé dans l\'API externe.');
      } else {
        throw new Error('Erreur de connexion à l\'API externe.');
      }
    }
  }
};

// ... (le reste du code du service reste inchangé)
const getOrCreateCart = async (userId = 'default-user') => {
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
        cart = new cartModel({ userId, items: [] });
        await cart.save();
    }

    const populatedItems = await Promise.all(cart.items.map(async (item) => {
        const productInfo = await fetchProductDetails(item.productId);
        return {
            ...item._doc,
            productDetails: productInfo.details
        };
    }));

    return {
        ...cart._doc,
        items: populatedItems
    };
};

const calculateCartTotal = (cart) => {
    let total = 0;
    cart.items.forEach(item => {
        total += item.productDetails.price * item.quantity;
    });
    return parseFloat(total.toFixed(2));
};

const addItemToCart = async (userId, productId, quantity) => {
    // La vérification dans fetchProductDetails suffit pour lever l'erreur
    const productInfo = await fetchProductDetails(productId);
    const cart = await getOrCreateCart(userId);

    let dbCart = await cartModel.findOne({ userId });
    if (!dbCart) {
        dbCart = new cartModel({ userId, items: [] });
    }

    const existingItemIndex = dbCart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
        dbCart.items[existingItemIndex].quantity += quantity;
    } else {
        dbCart.items.push({ productId, quantity });
    }

    dbCart.updatedAt = new Date();
    await dbCart.save();

    return await getOrCreateCart(userId);
};

const removeItemFromCart = async (userId, productId) => {
    let dbCart = await cartModel.findOne({ userId });
    if (!dbCart) {
        throw new Error('Panier non trouvé ou vide.');
    }

    dbCart.items = dbCart.items.filter(item => item.productId.toString() !== productId);
    dbCart.updatedAt = new Date();
    await dbCart.save();

    return await getOrCreateCart(userId);
};

export default {
    getOrCreateCart,
    calculateCartTotal,
    addItemToCart,
    removeItemFromCart
};