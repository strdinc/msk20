import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './card.jsx';
import useIsMobile from '../hooks/useIsMobile';
import ABCbackground from '../static/ABCbackground.svg';
import YCPbackground from '../static/YCPbackground.svg';
import GESbackground from '../static/GESbackground.svg';
import GARAGEbackground from '../static/GARAGEbackground.svg';
import TSARITSYNOvackground from '../static/TSARITSYNOvackground.svg';

const cardsData = [
    {
        id: 1,
        background: ABCbackground,
        title: 'ABC',
        description: 'это сеть кофеен, которая предлагает широкий выбор кофе и авторских напитков, а также выпечку и десерты',
        address: 'Милютинский переулок 3',
        metroStation: '1 Лубянка',
        type: 'кофейня',
        importance: 'важно',
        coords: [55.761394, 37.631576],
    },
    {
        id: 2,
        background: YCPbackground,
        title: 'YCP',
        description: 'замысел нового кофе-плейса, спрятанного в глубине дворов на Мясницкой, родился в городе Орле и отчасти реализован орловскими мастерами по дереву',
        address: 'Мясницкая 13с21',
        metroStation: '6 Тургеневская',
        type: 'кофейня',
        importance: 'важно',
        coords: [55.763213, 37.633405],
    },
    {
        id: 3,
        background: GESbackground,
        title: 'ГЭС-2',
        description: 'это дом культуры, расположенный в здании одной из старейших электростанций в Москве. он был открыт после реконструкции в 2021',
        address: 'Болотная набережная 15',
        metroStation: '1 Кропоткинская',
        type: 'кофейня',
        importance: 'дом культуры',
        coords: [55.742651, 37.612730],
    },
    {
        id: 4,
        background: GARAGEbackground,
        title: 'Garage',
        description: 'музей современного искусства «Гараж» основан в 2008. Первоначально «Гараж» располагался в здании Бахметьевского гаража, откуда и получил свое название',
        address: 'Крымский Вал 9с32',
        metroStation: '5 Октябрьская',
        type: 'музей',
        importance: 'важно',
        coords: [55.727774, 37.601526],
    },
    {
        id: 5,
        background: TSARITSYNOvackground,
        title: 'Царицыно',
        description: 'дворцово-парковый ансамбль на юге Москвы. заложен по повелению императрицы Екатерины II в 1776 году',
        address: 'Царицыно',
        metroStation: 'D2 Царицыно',
        type: 'музей-заповедник',
        importance: 'важно',
        coords: [55.616409, 37.683216],
    },
];

export default function CardsGrid() {
    const isMobile = useIsMobile();
    const [cardsOrder, setCardsOrder] = useState([...Array(cardsData.length).keys()]);
    const [openCardId, setOpenCardId] = useState(null);

    const handleToggle = (id) => {
        if (openCardId === id) {
            setOpenCardId(null);
            if (!isMobile) {
                setCardsOrder([...Array(cardsData.length).keys()]);
            }
        } else {
            setOpenCardId(id);

            if (!isMobile) {
                const currentIndex = cardsData.findIndex(c => c.id === id);
                const currentPos = cardsOrder.indexOf(currentIndex);
                const currentRow = Math.floor(currentPos / 4);
                const newOrder = [...cardsOrder];
                newOrder.splice(currentPos, 1);
                newOrder.splice(currentRow * 4, 0, currentIndex);
                setCardsOrder(newOrder);
            }
        }
    };

    const cardsToRender = isMobile
        ? cardsData
        : cardsOrder.map(i => cardsData[i]);

    return (
        <div
            className="cards-grid"
            style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: isMobile ? 'nowrap' : 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
        >
            {cardsToRender.map((card) => {
                const isOpen = openCardId === card.id;

                const CardWrapper = isMobile ? 'div' : motion.div;

                return (
                    <CardWrapper
                        key={card.id}
                        {...(!isMobile && {
                            layout: true,
                            transition: { type: 'spring', stiffness: 300, damping: 30 },
                        })}
                        style={{
                            width: isMobile ? '100%' : isOpen ? 1920 : 385,
                            flexShrink: 0,
                            boxSizing: 'border-box',
                        }}
                    >
                        <Card
                            {...card}
                            isOpen={isOpen}
                            onToggle={() => handleToggle(card.id)}
                        />
                    </CardWrapper>
                );
            })}
        </div>
    );
}
