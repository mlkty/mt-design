import { Divider, Space, Button } from '@mlkty/mt-design';

export default function Demo() {
  const arr = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <Space split={<Divider type="vertical" />}>
      {arr.map((item) => (
        <Button key={item} type="button">
          button {item}
        </Button>
      ))}
    </Space>
  );
}
