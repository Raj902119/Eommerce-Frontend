import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductsByFilters ,UpdateProduct, fetchAllCategories, fetchAllBrands, fetchProductById,createProduct  } from '../utils/productAPI';

const initialState = {
  products: [],
  status: 'idle',
  categories:[],
  brands:[],
  totalItems:0,
  selectedProduct:null
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,Pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,Pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product) => {
    const response = await UpdateProduct(product);
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllProductsAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.products = action.payload;
    })
    .addCase(fetchProductsByFiltersAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.products = action.payload.products;
      state.totalItems = action.payload.totalItems;
    })
    .addCase(fetchAllBrandsAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.brands = action.payload;
    })
    .addCase(fetchAllCategoriesAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.categories = action.payload;
    })
    .addCase(fetchProductByIdAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.selectedProduct = action.payload;
    })
    .addCase(createProductAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createProductAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.products.push(action.payload);
    })
    .addCase(updateProductAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateProductAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      const index = state.products.findIndex(item=>item.id===action.payload.id)
      state.products[index] = action.payload;
    });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;

export const ProductStatus = (state) => state.product.status;

export default productSlice.reducer;