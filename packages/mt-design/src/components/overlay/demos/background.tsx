import {useState} from 'react';
import {Overlay, Button, Radio, Divider, Space} from '@mlkty/mt-design';

export default function Demo() {

    const [bgColor, setBgColor] = useState('rgba(0, 0, 0, .5)');

    const [visible, setVisible] = useState(false);

    return (
        <>
            <Radio.Group value={bgColor} onChange={v => setBgColor(v)}>
                <Space direction="vertical">
                    <Radio value="rgba(0, 0, 0, .5)">default: rgba(0, 0, 0, .5)</Radio>
                    <Radio value="rgba(255, 255, 255, 0.8)">white: rgba(255, 255, 255, 0.8)</Radio>
                </Space>
            </Radio.Group>
            <Divider />
            <Button onClick={() => setVisible(v => !v)}>toggle</Button>
            <Overlay
                style={{'--background-color': bgColor}}
                visible={visible}
                onClick={() => setVisible(false)}
            />
        </>
    );
}
