import { Button, Space } from '@mlkty/mt-design';

export default function Demo() {
  const arr = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <Space wrap>
      {arr.map((item) => (
        <Button key={item} type="button">
          button {item}
        </Button>
      ))}
    </Space>
  );
}
