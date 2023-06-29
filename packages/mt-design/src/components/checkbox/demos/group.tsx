import {Checkbox, Divider} from '@mlkty/mt-design';

export default function Demo() {
    return (
        <>
            <Checkbox.Group defaultValue={['1', '2']}>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </Checkbox.Group>

            <Divider align="left">禁用</Divider>

            <Checkbox.Group name="id" disabled defaultValue={['1', '2']}>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </Checkbox.Group>
        </>
    );
}
