import {Button} from '@mlkty/mt-design';
import {Overlay, type TransitionStatus} from '@mlkty/mt-design-headless';
import {useState} from 'react';

const transitionCls: Record<string, string> = {
    'enter': 'w-full h-full fixed top-0 left-0 z-10 opacity-0 bg-black/0 transition duration-300',
    'entering': 'w-full h-full fixed top-0 left-0 z-10 opacity-100 bg-black/50 transition duration-300',
    'entered': 'w-full h-full fixed top-0 left-0 z-10 opacity-100 bg-black/50',
    'exit': 'w-full h-full fixed top-0 left-0 z-10 opacity-100 bg-black/50 transition duration-300',
    'exiting': 'w-full h-full fixed top-0 left-0 z-10 opacity-100 bg-black/0 transition duration-300',
    'exited': 'w-full h-full fixed top-0 left-0 z-10 opacity-0 bg-black/0',
};

export default function Demo() {
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState<TransitionStatus | ''>('');

    return (
        <div>
            <Button onClick={() => setVisible(true)}>open</Button>
            <Overlay
                className={transitionCls[state] || ''}
                visible={visible}
                onClick={() => setVisible(false)}
                onTransition={setState}
            />
        </div>
    );
}
