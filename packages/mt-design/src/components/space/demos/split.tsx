import { Divider, Space } from '@mlkty/mt-design';

export default function Demo() {
  const arr = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <Space split={<Divider type="vertical" />}>
      {arr.map((item) => (
        <button key={item} type="button">
          button {item}
        </button>
      ))}
    </Space>
  );
}
