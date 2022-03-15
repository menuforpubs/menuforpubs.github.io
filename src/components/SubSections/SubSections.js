import React, { useContext } from 'react';
import noop from 'lodash/fp/noop';

import ProductsSection from 'components/ProductsSection/ProductsSection';

const Section = ({
  subSections,
  pubName,
  onSelectProduct = noop,
  onSelectSubSection = noop,
  handleSave = noop,
}) => {
  return subSections
    ? subSections.map((subSection, i) => (
        <ProductsSection
          subSection={subSection}
          index={i}
          key={i}
          pubName={pubName}
          onSave={handleSave}
          onSelectProduct={onSelectProduct}
          onSelectSubSection={onSelectSubSection}
        />
      ))
    : null;
};

export default Section;
