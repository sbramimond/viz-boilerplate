import {Button} from 'antd';

import useIndexStroe from '@/store/useIndexStroe';

export default function Count() {
    let count = useIndexStroe((state) => state.count);
    let increment = useIndexStroe((state) => state.increment);

    return <Button onClick={increment}>[{count}]</Button>;
}
