import {useState} from 'react';
import {Overlay, Button} from '@mlkty/mt-design';

export default function Demo() {

    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button onClick={() => setVisible(v => !v)}>toggle</Button>
            <Overlay visible={visible} getContainer={() => document.body} onClick={() => setVisible(false)} />
        </>
    );
}
