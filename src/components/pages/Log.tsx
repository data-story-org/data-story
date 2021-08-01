import React, { FC } from 'react';
import { observer } from 'mobx-react';

const Log: FC = () => {
  return (
    <div className="">
      <div className="p-4">HOHOHO this is the log</div>
    </div>
  );
}

export default observer(Log);
