import {Link, Space} from '@mlkty/mt-design';

export default function Demo() {
    return (
        <Space>
            <Link href="/">default</Link>
            <Link type="primary" href="https://www.baidu.com" target="_blank">primary</Link>
        </Space>
    );
}
