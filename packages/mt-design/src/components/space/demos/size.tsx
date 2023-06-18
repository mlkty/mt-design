import { Space, type SpaceSize } from '@mlkty/mt-design';
import { useState } from 'react';

export default function Demo() {
  const [size, setSize] = useState<SpaceSize>('small');

  const [sizes] = useState(['small', 'middle', 'large'] as const);

  return (
    <>
      <div>
        {sizes.map((item) => (
          <button key={item} type="button" onClick={() => setSize(item)}>
            {item}
          </button>
        ))}
      </div>
      <Space size={size}>
        block1
        <>block2</>
        <div>block3</div>
        <span>block4</span>
      </Space>
    </>
  );
}
