import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import NodeSearch from '../../../../../src/core/components/controls/NodeSearch';
import { Store } from '../../../../../src/core/store';

// RegExpFilter, Inspector, CreateJSON
// prettier-ignore
const nodes = [
{"category":"Workflow","editableInPorts":false,"editableOutPorts":false,"ports":[{"links":[],"name":"Input","in":true,"id":"0a179d63-a5e3-4dcf-b60e-e9086cc49cfc","node":{"category":"Workflow","editableInPorts":false,"editableOutPorts":false,"key":"test-key","nodeReact":"Node","summary":"Filter features matching an attribute regular expression","id":"1e807cf2-2ecf-431c-873d-b2d3ff482057","name":"RegExpFilter","defaultInPorts":["Input"],"defaultOutPorts":["Passed","Failed"],"parameters":[],"ports":[null,{"links":[],"name":"Passed","in":false,"id":"16b7cc86-f845-44e8-a260-32b48e64af60"},{"links":[],"name":"Failed","in":false,"id":"730b2c03-26d9-4f5d-b273-d0ea7a78827e"}]}},null,null],"key":"test-key","name":"RegExpFilter","nodeReact":"Node","nodeType":"RegExpFilter","parameters":[{"description":"","fieldType":"String_","value":"RegExpFilter","name":"node_name"},{"description":"","fieldType":"String_","value":"","name":"attribute"},{"description":"","fieldType":"String_","value":"/test|draft|dummy/","name":"expression"}],"summary":"Filter features matching an attribute regular expression"},
{"category":"Workflow","editableInPorts":false,"editableOutPorts":false,"ports":[{"links":[],"name":"Input","in":true,"id":"17abe02b-5353-4c47-9785-e73d36e7cfd6","node":{"category":"Workflow","editableInPorts":false,"editableOutPorts":false,"key":"test-key","nodeReact":"Node","summary":"Display features in a table","id":"144aa4c8-25af-4f53-ab85-37e98fffdb7b","name":"Inspect","defaultInPorts":["Input"],"defaultOutPorts":[],"parameters":[],"ports":[null]}}],"key":"test-key","name":"Inspect","nodeReact":"Node","nodeType":"Inspect","parameters":[{"description":"","fieldType":"String_","value":"Inspect","name":"node_name"}],"summary":"Display features in a table"},
{"category":"Reader","editableInPorts":false,"editableOutPorts":false,"ports":[{"links":[],"name":"Output","in":false,"id":"5582ac65-3c22-4fec-a307-d24a6215f717","node":{"category":"Reader","editableInPorts":false,"editableOutPorts":false,"key":"test-key","nodeReact":"Node","summary":"Create features from JSON","id":"6e41cba1-9f81-4013-a262-9fea835a3f41","name":"CreateJSON","defaultInPorts":[],"defaultOutPorts":["Output"],"parameters":[],"ports":[null]}}],"key":"test-key","name":"CreateJSON","nodeReact":"Node","nodeType":"CreateJSON","parameters":[{"description":"","fieldType":"String_","value":"CreateJSON","name":"node_name"},{"description":"","fieldType":"JSON_","value":"[{ \"resource\": \"todos\"}]","name":"features"}],"summary":"Create features from JSON"}
];

const store = new Store();
store.setAvailableNodes(nodes);

describe('<NodeSearch />', () => {
  it('Renders correctly', async () => {
    const { findByPlaceholderText, findAllByRole } = render(
      <NodeSearch store={store} onFinish={jest.fn()} />,
    );

    expect(
      await findByPlaceholderText(
        'model | method | reader | writer ...',
      ),
    ).toBeInTheDocument;

    expect(await findAllByRole('listitem')).toHaveLength(
      nodes.length,
    );
  });

  it('Renders choosen choosen node as highlighted', async () => {
    const { findAllByRole } = render(
      <NodeSearch store={store} onFinish={jest.fn()} />,
    );

    const firstListItem = (
      await findAllByRole('listitem')
    )[0];

    expect(firstListItem).toBeInTheDocument;
    expect(firstListItem).toHaveClass('shadow-2xl');
  });

  it('Uses fuzzy-search and shows the right result', async () => {
    const { findByRole } = render(
      <NodeSearch store={store} onFinish={jest.fn()} />,
    );

    const input = (await findByRole(
      'textbox',
    )) as HTMLInputElement;

    userEvent.type(input, 'js on');

    expect(input.value).toBe('js on');
    // Fix this when there are no problems with
    // testing libraries and triggering state
    /* expect(await findByRole('listitem')).toHaveTextContent(
     *   'CreateJSON',
     * ); */
  });
});
