import {useState} from 'react';
import {Overlay, Button, Radio, Divider} from '@mlkty/mt-design';

export default function Demo() {

    const [duration, setDuration] = useState<number>(500);

    const [visible, setVisible] = useState(false);

    return (
        <>
            <Radio.Group value={duration} onChange={v => setDuration(v)}>
                <Radio value={500}>500ms</Radio>
                <Radio value={1000}>1000ms</Radio>
                <Radio value={2000}>2000ms</Radio>
            </Radio.Group>
            <Divider />
            <Button onClick={() => setVisible(v => !v)}>toggle</Button>
            <Overlay duration={duration} visible={visible} onClick={() => setVisible(false)} />
        </>
    );
}
