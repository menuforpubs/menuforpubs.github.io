import React, { useState } from 'react';
import set from 'lodash/fp/set';
import filter from 'lodash/fp/filter';
import get from 'lodash/fp/get';
import flow from 'lodash/fp/flow';
import findIndex from 'lodash/fp/findIndex';
import size from 'lodash/fp/size';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';

import css from './ProductEditor.module.scss';

import { ReactComponent as TrashIcon } from 'assets/images/trash.svg';
import { ReactComponent as HideIcon } from 'assets/images/hide.svg';

const cx = classNames.bind(css);

const ProductEditor = ({
  product: { product, productIndex, subSection },
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price);
  const [salePrice, setSalePrice] = useState(product.salePrice || '');

  const handleSave = () => {
    const productToSaveIndex =
      product.id === 'new'
        ? flow([get('products'), size])(subSection)
        : flow([get('products'), findIndex(({ id }) => product.id === id)])(
            subSection
          );

    const updatedSubSection = set(
      ['products', productToSaveIndex],
      {
        name,
        description,
        price,
        id: product.id === 'new' ? uuidv4() : product.id,
        salePrice,
      },
      subSection
    );
    onSave(updatedSubSection);
  };

  const handleDelete = () => {
    const updatedProducts = flow([
      get('products'),
      filter(({ id }) => product.id !== id),
    ])(subSection);
    const updatedSubSection = set('products', updatedProducts, subSection);
    onSave(updatedSubSection);
  };

  const toggleIsHidden = () => {
    const productToHideIndex = flow([
      get('products'),
      findIndex(({ id }) => product.id === id),
    ])(subSection);

    const updatedSubSection = set(
      ['products', productToHideIndex, 'isHidden'],
      !product.isHidden,
      subSection
    );
    onSave(updatedSubSection);
  };

  return (
    <div className={css['container']}>
      {product.id !== 'new' && (
        <div className={css['footer']}>
          <TrashIcon className={css['trash-icon']} onClick={handleDelete} />
          <HideIcon className={css['hide-icon']} onClick={toggleIsHidden} />
        </div>
      )}
      <div className={css['field-container']}>
        <div className={css['field-label']}>שם המוצר:</div>
        <input
          value={name}
          type="text"
          className={css['input']}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={css['field-container']}>
        <div className={css['field-label']}>תיאור:</div>
        <textarea
          value={description}
          className={css['textarea']}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
      </div>
      <div className={css['field-container']}>
        <div className={css['field-label']}>מחיר:</div>
        <input
          value={price}
          className={css['input']}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
        />
      </div>
      <div className={css['field-container']}>
        <div className={css['field-label']}>מחיר מבצע:</div>
        <input
          value={salePrice}
          className={css['input']}
          onChange={(e) => setSalePrice(e.target.value)}
          type="text"
        />
      </div>
      <div className={css['footer']}>
        <div className={css['cancel-button']} onClick={onCancel}>
          ביטול
        </div>
        <div
          className={cx('save-button', { 'disabled-button': !name || !price })}
          onClick={handleSave}
        >
          שמור
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
