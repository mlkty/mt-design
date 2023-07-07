import {Avatar, Space} from '@mlkty/mt-design';
import {UserOutlined} from '@ant-design/icons';

export default function Demo() {

    return (
        <>
            <Space block size="large">
                <Avatar icon={<UserOutlined />} size={64} />
                <Avatar icon={<UserOutlined />} size="large" />
                <Avatar icon={<UserOutlined />} />
                <Avatar icon={<UserOutlined />} size="small" />
            </Space>
            <br />
            <Space block size="large">
                <Avatar icon={<UserOutlined />} shape="square" size={64} />
                <Avatar icon={<UserOutlined />} shape="square" size="large" />
                <Avatar icon={<UserOutlined />} shape="square" />
                <Avatar icon={<UserOutlined />} shape="square" size="small" />
            </Space>
        </>
    );
}
