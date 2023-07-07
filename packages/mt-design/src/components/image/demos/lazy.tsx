import {Image} from '@mlkty/mt-design';
import {useState} from 'react';

export default function Demo() {
    const [random] = useState<number>(Math.random());

    return (
        <Image
            src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?type=lazy&random=${random}`}
            width={200}
            height={200}
            lazy
            onLoad={() => console.info('lazy load')}
            onError={() => console.info('lazy error')}
        />
    );
}
