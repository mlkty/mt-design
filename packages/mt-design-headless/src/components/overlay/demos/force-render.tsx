import {Button} from '@mlkty/mt-design';
import {Overlay} from '@mlkty/mt-design-headless';
import {useState} from 'react';

export default function Demo() {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>open</Button>
            <Overlay
                visible={visible}
                className="mth-demo-overlay"
                classNames="mth-demo-overlay"
                forceRender
                onClick={() => setVisible(false)}
            />
        </div>
    );
}
