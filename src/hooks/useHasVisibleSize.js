import { useEffect, useRef, useState } from 'react';

export default function useHasVisibleSize() {
    const ref = useRef(null);
    const [hasSize, setHasSize] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                if (height > 0) {
                    setHasSize(true);
                }
            }
        });

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return [ref, hasSize];
}
