import React, { FC } from 'react';
import { Store } from '../../../store';

const ConfigModalBody: FC = () => {
  const servers = [
    '/data-story/api',
    'http://localhost:3000',
    'https://data-story-server.herokuapp.com',
  ];

  return (
    <div>
      <div className="w-full bg-gray-100 px-6 py-2">
        <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
          {/* <String_
							key={'server'}
							handleChange={() => {}}
							options={{
								name: 'Server URL',
								description: 'leave blank for local server',
							}}
						/> */}
          <div className="mb-2">
            Reboot to connect to a API server
          </div>
          <ul className="text-indigo-500">
            {servers.map((server) => {
              return (
                <div
                  className="cursor-pointer hover:text-indigo-600"
                  ref={server}
                  key={server}
                  onClick={() => {
                    window.location.href =
                      window.location.hostname +
                      '?client=APIClient&server=' +
                      server;
                  }}
                >
                  <li>{server}</li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfigModalBody;
