import React, { FC } from 'react';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  json,
  javascript,
} from 'react-syntax-highlighter/dist/esm/languages/hljs/';

SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage(
  'javascript',
  javascript,
);

interface Props {
  code: string;
  language?: string;
}

export const CodeHighlighter: FC<Props> = ({
  code,
  language = 'json',
}) => {
  return (
    <div className="font-mono text-xs subpixel-antialiased">
      <SyntaxHighlighter
        language={language}
        style={nord}
        customStyle={{
          padding: '2rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
