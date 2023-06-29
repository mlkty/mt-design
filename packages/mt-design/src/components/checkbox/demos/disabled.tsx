import {Checkbox, Space} from '@mlkty/mt-design';

export default function Demo() {
    return (
        <Space>
            <Checkbox disabled>Disabled</Checkbox>
            <Checkbox defaultChecked disabled>Disabled by checked</Checkbox>
        </Space>
    );
}
