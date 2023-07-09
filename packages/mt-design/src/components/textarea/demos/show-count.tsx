import {Textarea} from '@mlkty/mt-design';

export default function Demo() {
    return (
        <>
            <Textarea showCount placeholder="please input" />
            <br />
            <Textarea showCount maxLength={100} placeholder="please input & max length 100" />
        </>
    );
}
