import {
  useState, useEffect
} from 'react';
import { fromEvent, interval, operators } from 'rxjs';

const {
  map,
  bufferCount,
  distinctUntilChanged,
  throttle,
  filter
} = operators;


const useScrollDirection = ($dom = document) => {
  const [dir, setDir] = useState('up');
  const scroll$  = fromEvent($dom || window, 'scroll', {
    capture: true
  });
  const scrollDirChanged$ = scroll$.pipe(
    map(e => e.target.scrollTop),
    bufferCount(2),
    filter(([pre, nxt]) => Math.abs(pre - nxt) > 50),
    map(([pre, nxt]) => pre - nxt > 0 ? 'UP' : 'DOWN'),
    distinctUntilChanged(),
    throttle(() => interval(300))
);

  useEffect(() => {
    const sub = scrollDirChanged$.subscribe(d => {
      setDir(d)
    });
    return () => sub.unsubscribe();
  }, []);
  return [dir];
};

export default useScrollDirection;