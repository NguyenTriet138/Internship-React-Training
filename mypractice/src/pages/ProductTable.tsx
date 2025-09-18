import React, { useState, useCallback } from 'react';
import { Product, ProductFilter, ProductStatus, ProductType } from '../types/product.types';
import ProductRow from './ProductRow';
import FilterInput from '../components/FilterInput';
import FilterSelect from '../components/FilterSelect';
import TableEmptyState from '../components/TableEmptyState';
import TableLoading from '../components/TableLoading';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onFilter: (filters: ProductFilter) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRowClick: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  onFilter,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  const [filters, setFilters] = useState<ProductFilter>({});
  const [filterTimeout, setFilterTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleFilterChange = useCallback(
    (field: keyof ProductFilter, value: string) => {
      const newFilters = {
        ...filters,
        [field]: value === '' || value === 'All' ? undefined : value,
      };
      setFilters(newFilters);

      if (filterTimeout) clearTimeout(filterTimeout);

      const timeout = setTimeout(() => {
        onFilter(newFilters);
      }, 300);

      setFilterTimeout(timeout);
    },
    [filters, filterTimeout, onFilter]
  );

  const handleSelectChange = useCallback(
    (field: keyof ProductFilter, value: string) => {
      const newFilters = {
        ...filters,
        [field]: value === 'All' ? undefined : value,
      };
      setFilters(newFilters);
      onFilter(newFilters);
    },
    [filters, onFilter]
  );

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>
              <FilterInput
                id="product-search"
                label="Product"
                value={filters.name || ''}
                placeholder="Search"
                onChange={(val) => handleFilterChange('name', val)}
              />
            </th>
            <th>
              <FilterSelect
                id="status-filter"
                label="Status"
                value={filters.status || 'All'}
                options={[
                  { value: 'All', label: 'All' },
                  { value: ProductStatus.Available, label: 'Available' },
                  { value: ProductStatus.SoldOut, label: 'Sold out' },
                ]}
                onChange={(val) => handleSelectChange('status', val)}
              />
            </th>
            <th>
              <FilterSelect
                id="type-filter"
                label="Type"
                value={filters.type || 'All'}
                options={[
                  { value: 'All', label: 'All' },
                  { value: ProductType.Bravo, label: 'Bravo' },
                  { value: ProductType.Alfa, label: 'Alfa' },
                  { value: ProductType.Gold, label: 'Gold' },
                ]}
                onChange={(val) => handleSelectChange('type', val)}
              />
            </th>
            <th>
              <div className="title-group">
                <label className="text text-title title-space">Quantity</label>
              </div>
            </th>
            <th>
              <FilterInput
                id="brand-search"
                label="Brand"
                value={filters.brand || ''}
                placeholder="Search"
                onChange={(val) => handleFilterChange('brand', val)}
              />
            </th>
            <th>
              <div className="title-group">
                <label className="text text-title title-space">Price</label>
              </div>
            </th>
            <th>
              <div className="title-group">
                <div className="text text-title title-space">Action</div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="product-display">
          {loading ? (
            <TableLoading colSpan={7} />
          ) : products.length === 0 ? (
            <TableEmptyState colSpan={7} message="No products found" />
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
                onRowClick={onRowClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
