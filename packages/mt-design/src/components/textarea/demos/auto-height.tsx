import {Textarea} from '@mlkty/mt-design';

export default function Demo() {
    return (
        <>
            <Textarea autoSize placeholder="please input" />
            <br />
            <Textarea autoSize={{minRows: 3, maxRows: 5}} placeholder="minRows: 3, maxRows: 5" />
        </>
    );
}
