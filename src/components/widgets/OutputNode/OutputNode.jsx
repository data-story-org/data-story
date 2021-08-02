import React, { useState } from 'react';
import Modal from 'react-modal';
import { modalStyle } from '@data-story-org/core';
import { withStore } from '../../../store';

import OutputNodeWidgetHeader from './OutputNodeHeader';

const OutputNodeWidget = ({ engine, node, store }) => {  
  return (
    <div
      className={'flex text-xxs text-gray-200'}
    >
      <div className="flex-grow-0 max-w-md rounded-full">
        <OutputNodeWidgetHeader node={node} className="rounded-full"/>
      </div>
    </div>
  );
};

export default withStore(OutputNodeWidget);
