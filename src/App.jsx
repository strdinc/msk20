import React from 'react';
import CardsGrid from './components/CardsGrid.jsx';
import TextPressure from './components/TextPressure/TextPressure.jsx';
import './App.css'
import useIsMobile from './hooks/useIsMobile';


function App() {

    const isMobile = useIsMobile();

    return (
        <>
            <div className="centercontainer">
                <div style={{position: 'relative', height: isMobile ? '120px' : '400px'}}>
                    <TextPressure
                        text="MOSCOW2.0"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#ffffff"
                        strokeColor="#ff0000"
                        minFontSize={36}
                    />
                </div>
                <CardsGrid/>
            </div>
        </>
    );
}

export default App;
