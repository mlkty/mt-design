import {Link, Space} from '@mlkty/mt-design';

export default function Demo() {
    return (
        <Space>
            <Link type="primary" underline="none">none</Link>
            <Link type="primary">default</Link>
            <Link type="primary" underline="always">always</Link>
        </Space>
    );
}
