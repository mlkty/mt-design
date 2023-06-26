import { CheckBox } from '@mlkty/mt-design-headless';
import { useState } from 'react';

export default function Demo() {
  const [controll, setControll] = useState(true);

  return (
    <>
      <CheckBox>default no-controll</CheckBox>
      <br />
      <CheckBox checked>controll</CheckBox>
      <br />
      <CheckBox checked={controll} onChange={setControll}>
        controll-change
      </CheckBox>
      <br />
      <CheckBox defaultChecked>default-checked</CheckBox>
      <br />
    </>
  );
}
