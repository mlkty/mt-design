import {Radio, Space} from '@mlkty/mt-design';

export default function Demo() {
    return (
        <Radio.Group>
            <Space direction="vertical">
                <Radio value="1">Radio 1</Radio>
                <Radio value="2" disabled>
                    Radio 2
                </Radio>
                <Radio value="3">Radio 3</Radio>
            </Space>
        </Radio.Group>
    );
}
