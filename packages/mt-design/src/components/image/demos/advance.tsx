import {Button, Image, Space} from '@mlkty/mt-design';
import {useState} from 'react';


export default function Demo() {
    const [random, setRandom] = useState<number>();
    return (
        <Space>
            <Image
                width={200}
                height={200}
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
                placeholder={
                    <Image
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                        width={200}
                        height={200}
                    />
                }
                onLoad={() => console.info('loaded')}
                onError={() => console.info('error')}
            />
            <Button
                onClick={() => setRandom(Date.now())}
            >
                Reload
            </Button>
        </Space>
    );
}
