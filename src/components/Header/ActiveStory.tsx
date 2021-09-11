import React, { FC } from 'react';
import { Store } from '../../store';
import { withLoadingProps } from '../../utils/isLoadingHOC';

interface Props extends withLoadingProps {
  store: Store;
}

const ActiveStory: FC<Props> = ({store}) => {
	return (<span className="ml-2 text-sm text-gray-400 font-normal subpixel-antialiased">
		{store.metadata.activeStory ? store.metadata.activeStory : 'untitled'}
	</span>)
}

export default ActiveStory