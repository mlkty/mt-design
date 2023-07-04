import {useState} from 'react';
import {Overlay, Button} from '@mlkty/mt-design';

export default function Demo() {

    const [visible1, setVisible1] = useState(false);

    return (
        <>
            <Button onClick={() => setVisible1(v => !v)}>toggle1</Button>
            <Overlay visible={visible1} forceRender onClick={() => setVisible1(false)} />
        </>
    );
}
