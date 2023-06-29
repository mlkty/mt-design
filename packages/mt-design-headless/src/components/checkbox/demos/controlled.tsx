import {Checkbox} from '@mlkty/mt-design-headless';
import {useState} from 'react';

export default function Demo() {
    const [controll, setControll] = useState(true);

    return (
        <>
            <Checkbox>default no-controll</Checkbox>
            <br />
            <Checkbox checked>controll</Checkbox>
            <br />
            <Checkbox checked={controll} onChange={setControll}>
                controll-change
            </Checkbox>
            <br />
            <Checkbox defaultChecked>default-checked</Checkbox>
            <br />
        </>
    );
}
