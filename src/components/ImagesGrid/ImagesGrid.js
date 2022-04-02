import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import css from './ImagesGrid.module.scss';

import { getAllFilesAsync } from 'utils/file.utils';

const cx = classNames.bind(css);

const ImagesGrid = ({ onSelect, selectedImagePath }) => {
  const [imagesUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    const getImagesUrls = async () => {
      const images = await getAllFilesAsync('categoriesSvgs');
      setImagesUrls(images);
    };
    getImagesUrls();
  }, []);

  return (
    <div className={css['container']}>
      {imagesUrls.map(({ url, path }) => {
        return (
          <div
            key={path}
            onClick={() => onSelect(path)}
            className={cx('image-container', {
              'selected-image': path === selectedImagePath,
            })}
          >
            <img src={url} className={css['image']} alt={path} />
          </div>
        );
      })}
    </div>
  );
};

export default ImagesGrid;
