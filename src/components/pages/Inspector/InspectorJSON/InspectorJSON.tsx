import React, { FC, useCallback } from 'react';
import { CodeHighlighter } from '../../../../utils/CodeHighlighter';

export const InspectorJSON = ({ features }) => {
  const spreadOriginals = useCallback(
    features.map((feature) => {
      return feature.original;
    }),
    [features],
  );
  const prettyJSON = JSON.stringify(
    spreadOriginals,
    null,
    4,
  );

  return (
    <div className="p-4 w-full h-full ">
      <CodeHighlighter code={prettyJSON} />
    </div>
  );
};

export default InspectorJSON;
