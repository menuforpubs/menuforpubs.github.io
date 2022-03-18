import React from 'react';
import classNames from 'classnames/bind';

import css from './Product.module.scss';

import { usePermissons } from 'hooks/usePermissions';

const cx = classNames.bind(css);

const Product = ({ product, onSelect }) => {
  const { name, description, price, isHidden, salePrice } = product;

  const { isAdmin } = usePermissons();

  return (
    <div
      key={product.name}
      onClick={() => onSelect(product)}
      className={cx('row', {
        'line-through': isHidden,
        hidden: isHidden && !isAdmin,
      })}
    >
      <div className={css['product-info-container']}>
        <div
          className={cx('product-name', {
            link: isAdmin,
            sale: salePrice,
          })}
        >
          {name}
        </div>
        <div className={css['product-description']}>{description}</div>
      </div>
      <div className={css['price-container']}>
        {salePrice && <div className={cx('price', 'sale')}>{salePrice}</div>}
        <div className={cx('price', { 'line-through': salePrice })}>
          {price}
        </div>
      </div>
    </div>
  );
};

export default Product;
