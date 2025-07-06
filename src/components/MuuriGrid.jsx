import React, { useEffect, useRef } from 'react';
import Muuri from 'muuri';
import '../App.css';

export default function MuuriGrid({ children }) {
    const gridRef = useRef(null);
    const muuriRef = useRef(null);

    useEffect(() => {
        if (!gridRef.current) return;

        muuriRef.current = new Muuri(gridRef.current, {
            items: '.grid-item',
            layoutOnResize: true,
            layoutDuration: 400,
            layoutEasing: 'ease',
        });

        return () => {
            muuriRef.current.destroy();
        };
    }, []);

    useEffect(() => {
        muuriRef.current?.refreshItems().layout();
    }, [children]);

    return (
        <div ref={gridRef} className="muuri-grid">
            {React.Children.map(children, child => (
                <div className={`grid-item ${child.props.isOpen ? 'fullwidth' : ''}`}>
                    {child}
                </div>
            ))}
        </div>
    );
}
