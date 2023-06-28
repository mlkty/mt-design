import {Space, Radio, type SpaceSize} from '@mlkty/mt-design';
import {useState} from 'react';

export default function Demo() {
    const [size, setSize] = useState<SpaceSize>('small');

    const [sizes] = useState(['small', 'middle', 'large'] as const);

    return (
        <>
            <Space block>
                <Radio.Group onChange={value => setSize(value as SpaceSize)}>
                    {sizes.map(item => (
                        <Radio key={item} value={item}>
                            {item}
                        </Radio>
                    ))}
                </Radio.Group>
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
