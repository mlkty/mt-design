import { Radio, type RadioValue } from '@mlkty/mt-design-headless';
import { useState } from 'react';

export default function Demo() {
  const [value1, setValue1] = useState<RadioValue>('2');

  return (
    <>
      <Radio.Group>
        <Radio value="1">默认(非受控)</Radio>
        <Radio value="2">2</Radio>
        <Radio value="3">3</Radio>
      </Radio.Group>

      <Radio.Group value={value1} onChange={setValue1}>
        <Radio value="1">受控</Radio>
        <Radio value="2">2</Radio>
        <Radio value="3">3</Radio>
      </Radio.Group>

      <Radio.Group defaultValue="3">
        <Radio value="1">只设置默认值</Radio>
        <Radio value="2">2</Radio>
        <Radio value="3">3</Radio>
      </Radio.Group>
    </>
  );
}
