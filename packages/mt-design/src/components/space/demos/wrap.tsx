import { Space } from '@mlkty/mt-design';

export default function Demo() {
  const arr = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <Space wrap>
      {arr.map((item) => (
        <button key={item} type="button">
          button {item}
        </button>
      ))}
    </Space>
  );
}
