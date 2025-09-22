import React from 'react';
import { Product } from '../../types/product.types';
import ImageInfo from '../../components/ImageInfo/index';
import StatusBadge from '../../components/StatusBadge/index';
import ActionMenu from '../../share/Components/ActionMenu/index';

interface ProductRowProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRowClick: (product: Product) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  return (
    <tr onClick={() => onRowClick(product)}>
      <td>
        <ImageInfo
          imageSrc={product.productImage}
          fallbackSrc="/placeholder-product.png"
          alt={product.name}
          text={product.name}
          variant="product"
        />
      </td>
      <td>
        <StatusBadge status={product.status} />
      </td>
      <td>
        <span className="product-type">{product.type}</span>
      </td>
      <td>
        <span className="product-quantity">{product.quantity}</span>
      </td>
      <td>
        <ImageInfo
          imageSrc={product.brandImage}
          fallbackSrc="/placeholder-brand.png"
          alt={product.brand}
          text={product.brand}
          variant="brand"
        />
      </td>
      <td>
        <span className="product-price">{product.formatPrice()}</span>
      </td>
      <td>
        <ActionMenu
          onEdit={() => onEdit(product.id)}
          onDelete={() => onDelete(product.id)}
        />
      </td>
    </tr>
  );
};

export default ProductRow;
