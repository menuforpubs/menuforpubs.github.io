import React, { useState } from 'react';
import set from 'lodash/fp/set';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';

import css from './SectionEditor.module.scss';

import { ReactComponent as HideIcon } from 'assets/images/hide.svg';

import ImagesGrid from 'components/ImagesGrid/ImagesGrid';

const cx = classNames.bind(css);

const SectionEditor = ({ section: { section }, onCancel, onSave }) => {
  const [title, setTitle] = useState(section.title);
  const [path, setPath] = useState(section.path);
  const [imagePath, setImagePath] = useState(section.imagePath);

  const handleSave = async () => {
    const sectionObject = {
      ...section,
      title,
      path,
      imagePath,
      subSections: section.subSections || [],
    };

    await onSave({
      ...sectionObject,
      id: section.id === 'new' ? uuidv4() : section.id,
    });
  };

  const toggleIsHidden = async () => {
    const updatedSection = set('isHidden', !section.isHidden, section);
    await onSave(updatedSection);
  };

  return (
    <div className={css['container']}>
      {section.id !== 'new' && (
        <div className={css['header']}>
          <HideIcon className={css['hide-icon']} onClick={toggleIsHidden} />
        </div>
      )}
      <div className={css['field-container']}>
        <div className={css['field-label']}>שם הקטגוריה:</div>
        <input
          type="text"
          value={title}
          className={css['input']}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={css['field-container']}>
        <div className={css['field-label']}>שם הקטגוריה באנגלית:</div>
        <input
          type="text"
          value={path}
          className={css['input']}
          onChange={(e) => setPath(e.target.value)}
        />
      </div>
      <div className={css['field-container']}>
        <div className={css['field-label']}>תמונה:</div>
        <ImagesGrid onSelect={setImagePath} selectedImagePath={imagePath} />
      </div>
      <div className={css['footer']}>
        <div className={css['cancel-button']} onClick={onCancel}>
          ביטול
        </div>
        <div
          className={cx('save-button', {
            'disabled-button':
              !title || !path || !imagePath || !/^[a-zA-Z]+$/.test(path),
          })}
          onClick={handleSave}
        >
          שמור
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
