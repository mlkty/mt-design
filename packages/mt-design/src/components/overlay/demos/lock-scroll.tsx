import {useState} from 'react';
import {Overlay, Button} from '@mlkty/mt-design';

export default function Demo() {

    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);

    return (
        <>
            <Button onClick={() => setVisible(v => !v)}>toggle</Button>
            <Overlay visible={visible} lockScroll onClick={() => setVisible(false)}>
                <Button
                    onClick={e => {
                        e.stopPropagation();
                        setVisible1(v => !v);
                    }}
                >
                    inner toggle
                </Button>
                <Overlay
                    visible={visible1}
                    lockScroll
                    onClick={e => {
                        e.stopPropagation();
                        setVisible1(false);
                    }}
                />
            </Overlay>
        </>
    );
}
