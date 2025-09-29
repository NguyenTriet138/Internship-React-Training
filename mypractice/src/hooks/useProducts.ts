import { useState, useCallback } from 'react';
import { Product, ProductFilter, SaveProductDataRequest } from 'types/product.types';
import { PaginatedResult } from 'types/pagination.types';
import { ProductService } from '@models/productModel';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentFilters, setCurrentFilters] = useState<ProductFilter>({});

  const productService = new ProductService();

  const createProduct = useCallback(async (data: SaveProductDataRequest): Promise<Product> => {
    try {
      const brandImage = await productService.uploadImage(data.brandImage);
      const productImage = await productService.uploadImage(data.productImage);
      data.productImage = productImage;
      data.brandImage = brandImage;
      const newProduct = await productService.createProduct(data);
      return newProduct;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create product');
    }
  }, []);

  const updateProduct = useCallback(async (id: string, data: SaveProductDataRequest): Promise<Product> => {
    try {
      if (!data.productImage.startsWith('http')) {
        const productImage = await productService.uploadImage(data.productImage);
        data.productImage = productImage;
      }

      if (!data.brandImage.startsWith('http')) {
        const brandImage = await productService.uploadImage(data.brandImage);
        data.brandImage = brandImage;
      }

      const updatedProduct = await productService.updateProduct(id, data);
      return updatedProduct;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update product');
    }
  }, []);

  const deleteProduct = useCallback(async (id: string): Promise<void> => {
    try {
      await productService.deleteProduct(id);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete product');
    }
  }, []);

  const loadProducts = useCallback(async (filters?: ProductFilter, page: number = 1, items: number = 10) => {
    try {
      setLoading(true);
      setError(null);

      let result: PaginatedResult<Product>;

      if (filters && Object.keys(filters).some(key => filters[key as keyof ProductFilter] && filters[key as keyof ProductFilter] !== 'All')) {
        result = await productService.getFilteredProducts(filters, page, items);
      } else {
        result = await productService.getAllProducts(page, items);
      }

      setProducts(result.data);
      setCurrentPage(result.pagination.currentPage);
      setItemsPerPage(result.pagination.itemsPerPage);
      setTotalItems(result.pagination.totalItems);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const initializeWithFilters = useCallback(async (filters: ProductFilter, page: number, items: number) => {
    setCurrentFilters(filters);
    setCurrentPage(page);
    setItemsPerPage(items);
    await loadProducts(filters, page, items);
  }, [loadProducts]);

  const handleFilter = useCallback(async (filters: ProductFilter) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
    await loadProducts(filters, 1, itemsPerPage);
  }, [itemsPerPage, loadProducts]);

  const handlePageChange = useCallback(async (page: number) => {
    setCurrentPage(page);
    await loadProducts(currentFilters, page, itemsPerPage);
  }, [currentFilters, itemsPerPage, loadProducts]);

  const handleItemsPerPageChange = useCallback(async (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
    await loadProducts(currentFilters, 1, items);
  }, [currentFilters, loadProducts]);

  const getProductById = useCallback(async (id: string): Promise<Product> => {
    try {
      return await productService.getProductById(id);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to get product');
    }
  }, []);

  const checkProductExists = useCallback(async (name: string, excludeId?: string): Promise<boolean> => {
    try {
      return await productService.checkProductExists(name, excludeId);
    } catch (err) {
      console.error('Failed to check product existence:', err);
      return false;
    }
  }, []);

  const updateLocalProduct = useCallback((product: Product) => {
    setProducts(prev => prev.map(p => (p.id === product.id ? product : p)));
  }, []);

  const removeLocalProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setTotalItems(prevTotal => {
      const newTotal = Math.max(0, prevTotal - 1);
      setTotalPages(Math.ceil(newTotal / itemsPerPage));
      return newTotal;
    });
  }, [itemsPerPage]);

  const addLocalProduct = useCallback((product: Product) => {
    setTotalItems(prevTotal => {
      const newTotal = prevTotal + 1;
      setTotalPages(Math.ceil(newTotal / itemsPerPage));
      return newTotal;
    });

    setProducts(prev => {
      if (currentPage === 1) {
        const newList = [product, ...prev];
        if (newList.length > itemsPerPage) {
          return newList.slice(0, itemsPerPage);
        }
        return newList;
      }
      return prev;
    });
  }, [currentPage, itemsPerPage]);

  return {
    products,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    currentFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    handleFilter,
    handlePageChange,
    handleItemsPerPageChange,
    getProductById,
    checkProductExists,
    refreshProducts: () => loadProducts(currentFilters, currentPage, itemsPerPage),
    initializeWithFilters,
    updateLocalProduct,
    removeLocalProduct,
    addLocalProduct,
  };
};
