import {useState} from 'react';
import {Checkbox, Divider, Space} from '@mlkty/mt-design';

const options = [
    {id: '1', name: 'Apple'},
    {id: '2', name: 'Pear'},
    {id: '3', name: 'Peach'},
    {id: '4', name: 'Cherry'},
];

export default function Demo() {

    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (value: string[]) => {
        setSelected(value);
    };

    const handleAllChange = (checked: boolean) => {
        const newValue = checked ? options.map(opt => opt.id) : [];
        setSelected(newValue);
    };

    const isSelectedAll = selected.length === options.length;

    return (
        <>
            <Checkbox checked={isSelectedAll} onChange={handleAllChange}>Check All</Checkbox>
            <Divider />

            <Checkbox.Group value={selected} onChange={handleChange}>
                <Space>
                    {
                        options.map(opt => (
                            <Checkbox key={opt.id} value={opt.id}>{opt.name}</Checkbox>
                        ))
                    }
                </Space>
            </Checkbox.Group>
        </>
    );
}
