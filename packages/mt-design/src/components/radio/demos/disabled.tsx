import { Radio, Space } from '@mlkty/mt-design';

export default function Demo() {
  return (
    <Space>
      <Radio disabled>disabled</Radio>
      <Radio checked disabled>
        disabled
      </Radio>
    </Space>
  );
}
