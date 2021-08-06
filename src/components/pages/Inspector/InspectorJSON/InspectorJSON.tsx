import React, { FC } from 'react';
import { CodeHighlighter } from '../../../../utils/CodeHighlighter';

export const InspectorJSON = ({ features }) => {
  const spreadOriginals = features.map((feature) => {
    return feature.original;
  });
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
