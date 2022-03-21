import React, { useContext, useState, useEffect } from 'react';
import find from 'lodash/fp/find';
import findIndex from 'lodash/fp/findIndex';
import get from 'lodash/fp/get';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import noop from 'lodash/fp/noop';
import size from 'lodash/fp/size';
import Modal from 'react-modal';

import css from './EditorSection.module.scss';

import { MenuContext } from 'components/MenuProvider/MenuProvider';

import ProductEditor from 'components/ProductEditor/ProductEditor';
import SubSectionEditor from 'components/SubSectionEditor/SubSectionEditor';
import AdminUser from 'components/AdminUser/AdminUser';
import SubSections from 'components/SubSections/SubSections';
import { MenuLoader } from 'components/Loader/Loader';

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

const EditorSection = ({ match = {} }) => {
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectSubSection, setSelectedSubSection] = useState();

  const pagePath = get('params.path', match);
  const pubName = get('params.pubName', match);

  const { menuData, getInitialMenuData, updateMenuData } =
    useContext(MenuContext);

  useEffect(() => {
    getInitialMenuData(pubName);
  }, [getInitialMenuData, pubName]);

  const subSections = flow([
    get('sections'),
    find(({ path }) => path === pagePath),
    get('subSections'),
  ])(menuData);

  const handleSave = async (updatedSubSection, updatedSubSectionIndex) => {
    const sectionIndex = flow([
      get('sections'),
      findIndex(({ path }) => path === pagePath),
    ])(menuData);

    const updatedSection = set(
      ['sections', sectionIndex, 'subSections', updatedSubSectionIndex],
      updatedSubSection,
      menuData
    );

    updateMenuData(pubName, updatedSection);
  };

  const addEmptySubSection = () => {
    const emptySubSection = { products: [], title: '', id: 'new' };

    setSelectedSubSection({
      subSection: emptySubSection,
      subSectionIndex: size(subSections),
    });
  };

  return (
    <div className={css['container']}>
      <MenuLoader>
        <AdminUser fallback={<SubSections subSections={subSections} />}>
          <SubSections
            subSections={subSections}
            onSelectProduct={setSelectedProduct}
            onSelectSubSection={setSelectedSubSection}
            onSave={handleSave}
          />
        </AdminUser>
        <AdminUser>
          <div className={css['add-category-button-container']}>
            <div
              className={css['add-category-button']}
              onClick={addEmptySubSection}
            >
              + הוספת קטגוריה
            </div>
          </div>
        </AdminUser>
        <Modal
          isOpen={!!selectedProduct}
          onAfterOpen={noop}
          onRequestClose={() => setSelectedProduct()}
          style={customStyles}
          contentLabel="עריכת מוצר"
        >
          {!!selectedProduct && (
            <ProductEditor
              product={selectedProduct}
              onCancel={() => setSelectedProduct()}
              onSave={(updatedSubSection) => {
                handleSave(updatedSubSection, selectedProduct.subSectionIndex);
                setSelectedProduct();
              }}
            />
          )}
        </Modal>
        <Modal
          isOpen={!!selectSubSection}
          onAfterOpen={noop}
          onRequestClose={() => setSelectedSubSection()}
          style={customStyles}
          contentLabel="עריכת מוצר"
        >
          {!!selectSubSection && (
            <SubSectionEditor
              subSection={selectSubSection}
              onCancel={() => setSelectedSubSection()}
              onSave={(updatedSubSection) => {
                handleSave(updatedSubSection, selectSubSection.subSectionIndex);
                setSelectedSubSection();
              }}
            />
          )}
        </Modal>
      </MenuLoader>
    </div>
  );
};

export default EditorSection;
