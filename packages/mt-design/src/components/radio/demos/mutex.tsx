import {Radio} from '@mlkty/mt-design';

export default function Demo() {
    return (
        <Radio.Group>
            <Radio value="1" role="radio1">Radio 1</Radio>
            <Radio value="2" disabled role="radio2">
                Radio 2
            </Radio>
            <Radio value="3" role="radio3">Radio 3</Radio>
        </Radio.Group>
    );
}
