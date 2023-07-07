import {Image, Space} from '@mlkty/mt-design';

export default function Demo() {
    const fitTypes = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const;
    return (
        <Space>
            {
                fitTypes.map(item => {
                    return (
                        <div key={item}>
                            <p style={{textAlign: 'center'}}>{item}</p>
                            <Image
                                fit={item}
                                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                                width={150}
                                height={150}
                            />
                        </div>
                    );
                })
            }
        </Space>
    );
}
