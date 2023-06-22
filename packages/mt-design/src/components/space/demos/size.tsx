import { Space, Button, type SpaceSize } from '@mlkty/mt-design';
import { useState } from 'react';

export default function Demo() {
  const [size, setSize] = useState<SpaceSize>('small');

  const [sizes] = useState(['small', 'middle', 'large'] as const);

  return (
    <>
      <Space block>
        {sizes.map((item) => (
          <Button key={item} onClick={() => setSize(item)}>
            {item}
          </Button>
        ))}
      </Space>
      <Space size={size}>
        block1
        <>block2</>
        <div>block3</div>
        <span>block4</span>
      </Space>
    </>
  );
}
