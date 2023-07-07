import {Avatar, Space} from '@mlkty/mt-design';
import {UserOutlined} from '@ant-design/icons';

export default function Demo() {

    return (
        <Space block>
            <Avatar icon={<UserOutlined />} />
            <Avatar>U</Avatar>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            <Avatar style={{backgroundColor: '#fde3cf', color: '#f56a00'}}>U</Avatar>
        </Space>
    );
}
