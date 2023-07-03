import {useState} from 'react';
import {Overlay, Button, Space} from '@mlkty/mt-design';

export default function Demo() {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    return (
        <>
            <Space>
                <Button onClick={() => setVisible1(v => !v)}>scene1</Button>
                <Button onClick={() => setVisible2(v => !v)}>scene2</Button>
                <Button onClick={() => setVisible3(v => !v)}>scene3</Button>
            </Space>

            <Overlay
                mountOnEnter={false}
                unmountOnExit={false}
                visible={visible1}
                onClick={() => setVisible1(false)}
                data-scene="1"
            />

            <Overlay
                unmountOnExit={false}
                visible={visible2}
                onClick={() => setVisible2(false)}
                data-scene="2"
            />

            <Overlay
                mountOnEnter={false}
                visible={visible3}
                onClick={() => setVisible3(false)}
                data-scene="3"
            />
        </>
    );
}
