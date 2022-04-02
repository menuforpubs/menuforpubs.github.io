import React, { useEffect, useContext, useState } from 'react';
import head from 'lodash/fp/head';
import get from 'lodash/fp/get';
import noop from 'lodash/fp/noop';
import size from 'lodash/fp/size';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import Modal from 'react-modal';

import css from './CategoriesGrid.module.scss';

import { MenuContext } from 'components/MenuProvider/MenuProvider';
import Notification from 'components/Notification/Notification';
import { MenuLoader } from 'components/Loader/Loader';

import { usePermissons } from 'hooks/usePermissions';
import Category from 'components/Category/Category';
import SectionEditor from 'components/SectionEditor/SectionEditor';
import Loader from 'components/Loader/Loader';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CategoriesGrid = ({ match = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [numOfImagesLoaded, setNumOfImagesLoaded] = useState(0);

  const {
    menuData = {},
    getInitialMenuData,
    updateMenuData,
  } = useContext(MenuContext);

  const { sections, notifications } = menuData;

  const pubName = get('params.pubName', match);

  const { isAdmin } = usePermissons();

  useEffect(() => {
    getInitialMenuData(pubName);
  }, [getInitialMenuData, pubName]);

  const handleSave = (section, sectionIndex) => {
    const updatedSections = flow([
      set(sectionIndex, section),
      map(({ imageUrl, ...rest }) => ({ ...rest })),
    ])(sections);
    console.log(updatedSections, sectionIndex);
    updateMenuData(pubName, { sections: updatedSections });
  };

  return (
    <div className={css['container']}>
      <MenuLoader>
        <Loader
          isFetching={numOfImagesLoaded < size(sections)}
          shouldRenderInTheBackground={true}
        >
          {notifications && (
            <Notification
              notification={head(notifications)}
              isAdmin={isAdmin}
              pubName={pubName}
            />
          )}
          <div className={css['categories-container']}>
            {sections &&
              sections.map((section, i) => {
                return (
                  <Category
                    key={section.id || i}
                    pubName={pubName}
                    onSelectEdit={() =>
                      setSelectedCategory({ section, sectionIndex: i })
                    }
                    onLoadImage={() => setNumOfImagesLoaded((prev) => prev + 1)}
                    {...section}
                  />
                );
              })}
            {isAdmin && (
              <div
                className={css['add-new-section-container']}
                onClick={() =>
                  setSelectedCategory({
                    section: {
                      id: 'new',
                      path: '',
                      title: '',
                      subSections: [],
                    },
                    sectionIndex: size(sections),
                  })
                }
              >
                <div className={css['add-new-section-button']}>
                  <div className={css['add-new-section-icon']}>+</div>
                  <div className={css['label']}>הוספה</div>
                </div>
              </div>
            )}
          </div>
          <Modal
            isOpen={!!selectedCategory}
            onAfterOpen={noop}
            onRequestClose={() => setSelectedCategory()}
            style={customStyles}
            contentLabel="עריכת קטגוריה"
          >
            {!!selectedCategory && (
              <SectionEditor
                section={selectedCategory}
                onCancel={() => setSelectedCategory()}
                onSave={(updatedSection) => {
                  handleSave(updatedSection, selectedCategory.sectionIndex);
                  setSelectedCategory();
                }}
              />
            )}
          </Modal>
        </Loader>
      </MenuLoader>
    </div>
  );
};

export default CategoriesGrid;
