import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './card.jsx';
import useIsMobile from '../hooks/useIsMobile';
import ABCbackground from '../static/ABCbackground.svg';
import YCPbackground from '../static/YCPbackground.svg';
import GESbackground from '../static/GESbackground.svg';
import GARAGEbackground from '../static/GARAGEbackground.svg';
import TSARITSYNOvackground from '../static/TSARITSYNOvackground.svg';
import MOSKWARIUMbackground from '../static/MOSKWARIUMbackground.svg';
import MOSKOUZOObackground from '../static/MOSKOUZOObackground.svg';
import ZOTOVbackground from '../static/ZOTOVbackground.svg';
import DESIGNbackground from '../static/DESIGNbackground.svg';
import APTEKAbackground from '../static/APTEKAbackground.svg';
import BOTGARDMSUbackground from '../static/BOTGARDMSUbackground.svg';
import BOTGARDRSAbackground from '../static/BOTGARDRSAbackground.svg';
import ERNAbackground from '../static/ERNAbackground.svg';
import STORYbackground from '../static/STORYbackground.svg';
import ZARYADJEbackground from '../static/ZARYADJEbackground.svg';
import REDOCTOBERbackground from '../static/REDOCTOBERbackground.svg';
import AIRPLANEbackground from '../static/AIRPLANEbackground.svg';
import TAKENGObackground from '../static/TAKENGObackground.svg';
import RSLbackground from '../static/RSLbackground.svg';
import SRTbackground from '../static/SRTbackground.svg';
import MRIbackground from '../static/MRIbackground.svg';
import AHEGAObackground from '../static/AHEGAObackground.svg';
import LABbackground from '../static/LABbackground.svg';

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
        type: 'дом культуры',
        importance: 'важно',
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
    {
        id: 6,
        background: MOSKWARIUMbackground,
        title: 'Москвариум',
        description: 'действующий океанариум, построенный в Москве на территории ВДНХ и расположенный у павильона «Космос»',
        address: 'проспект Мира 119с23',
        metroStation: '6 ВДНХ',
        type: 'окенариум',
        importance: 'важно',
        coords: [55.832985, 37.618413],
    },
    {
        id: 7,
        background: MOSKOUZOObackground,
        title: 'Московский зоопарк',
        description: 'зоологический парк в центре Москвы. один из старейших зоопарков в Европе и пятый по площади зоопарк России',
        address: 'Большая Грузинская 1с1',
        metroStation: '5 Краснопресненская',
        type: 'зоопарк',
        importance: 'важно',
        coords: [55.761092, 37.578303],
    },
    {
        id: 8,
        background: ZOTOVbackground,
        title: 'Центр Зотов',
        description: 'культурное пространство, которое знакомит аудиторию с конструктивизмом',
        address: 'Ходынская 2с1',
        metroStation: '2 Белорусская',
        type: 'культурный центр',
        importance: 'важно',
        coords: [55.770294, 37.564705],
    },
    {
        id: 9,
        background: DESIGNbackground,
        title: 'Дизай Завод',
        description: 'торгово-выставочный в Бутырском районе Москвы на территории бывшего Хрустального завода',
        address: 'Большая Новодмитровская 36с2',
        metroStation: '11 Савёловская',
        type: 'арт-пространство',
        importance: 'важно',
        coords: [55.805073, 37.585289],
    },
    {
        id: 10,
        background: APTEKAbackground,
        title: 'Аптекарский огород',
        description: 'ботанический сад Петра I биологического факультета МГУ имени М.В.Ломоносова',
        address: 'Проспект Мира 26с1',
        metroStation: '5 Проспект Мира',
        type: 'ботанический сад',
        importance: 'важно',
        coords: [55.777600, 37.635061],
    },
    {
        id: 11,
        background: BOTGARDMSUbackground,
        title: 'Ботанический сад МГУ',
        description: 'ботанический сад Петра I биологического факультета МГУ имени М.В.Ломоносова',
        address: 'Ленинские горы 1/12',
        metroStation: '8А Ломоносовский проспект',
        type: 'ботанический сад',
        importance: 'важно',
        coords: [55.705596, 37.524197],
    },
    {
        id: 12,
        background: BOTGARDRSAbackground,
        title: 'Ботанический сад РАН',
        description: 'главный ботанический сад имени Н.В. Цицина РАН основан в 1945г. и является одним из крупнейших ботанических садов в Европе',
        address: 'Ботаническая 4',
        metroStation: '14 Владыкино',
        type: 'ботанический сад',
        importance: 'важно',
        coords: [55.840851, 37.605434],
    },
    {
        id: 13,
        background: ERNAbackground,
        title: 'Эрна',
        description: 'названа в честь легенды американской кофейной индустрии Эрны Натсен. здесь работают на зерне московского обжарщика Silky Drum',
        address: 'Большая Полянка 44/2',
        metroStation: '9 Полняка',
        type: 'кофейня',
        importance: 'можно сходить',
        coords: [55.732873, 37.618307],
    },
    {
        id: 14,
        background: STORYbackground,
        title: 'Сказка',
        description: 'здесь есть как экстремальные горки для любителей адреналина, так и более спокойные аттракционы для детей',
        address: 'Тверской бульвар 3',
        metroStation: '4 Крылатское',
        type: 'парк аттракционов',
        importance: 'можно сходить',
        coords: [55.771473, 37.434686],
    },
    {
        id: 15,
        background: ZARYADJEbackground,
        title: 'Зарядье',
        description: 'это уникальное место, где современный дизайн гармонично сочетается с природными ландшафтами',
        address: 'Варварка 6',
        metroStation: '7 Китай-город',
        type: 'парк',
        importance: 'можно сходить',
        coords: [55.751188, 37.627940],
    },
    {
        id: 16,
        background: REDOCTOBERbackground,
        title: 'Красный Октябрь',
        description: 'это бывшая кондитерская фабрика, превратившаяся в эпицентр творческой жизни, где сливаются история, искусство и модные тренды',
        address: 'Берсеневская набережная 6с3',
        metroStation: '1 Кропоткинская',
        type: 'арт-пространство',
        importance: 'можно сходить',
        coords: [55.740390, 37.609056],
    },
    {
        id: 17,
        background: AIRPLANEbackground,
        title: 'Аэроплан',
        description: 'это стильное место с минималистичным интерьером и видом из окон на усадьбу фон Рекк',
        address: 'Пятницкая 65/10',
        metroStation: '5 Добрынинская',
        type: 'кофейня',
        importance: 'необязательно',
        coords: [55.732674, 37.627408],
    },
    {
        id: 18,
        background: TAKENGObackground,
        title: 'Take&Go',
        description: 'магазин товаров из Европы и США',
        address: 'Маросейка 9/2',
        metroStation: '7 Китай-город',
        type: 'магазин',
        importance: 'необязательно',
        coords: [55.757690, 37.634712],
    },
    {
        id: 19,
        background: RSLbackground,
        title: 'РГБ',
        description: 'это одна из крупнейших библиотек в мире, где хранится около 47 миллионов книг и документов на 367 языках',
        address: 'Воздвиженка 3/5',
        metroStation: '4 Александровский сад',
        type: 'библиотека',
        importance: 'необязательно',
        coords: [55.751347, 37.609428],
    },
    {
        id: 20,
        background: SRTbackground,
        title: 'Южный речной вокзал',
        description: 'транспортный узел и общественное пространство Москвы',
        address: 'проспект Андропова 11к2',
        metroStation: '2 Технопарк',
        type: 'вокзал',
        importance: 'необязательно',
        coords: [55.689527, 37.675163],
    },
    {
        id: 21,
        background: MRIbackground,
        title: 'МРИ',
        description: 'это современный музей, расположенный в здании бывшей фабрики «Большевик». он предлагает посетителям постоянную экспозицию и временные выставки',
        address: 'Ленинградской проспект 15с11',
        metroStation: '2 Белорусская',
        type: 'кофейня',
        importance: 'можно сходить',
        coords: [55.780328, 37.570409],
    },
    {
        id: 22,
        background: AHEGAObackground,
        title: 'Ахегао',
        description: '02.08 18:30 Eclipse',
        address: 'Переведеновский переулок 21с11',
        metroStation: '4 Электрозаводская',
        type: 'концерт',
        importance: 'необязательно',
        coords: [55.781160, 37.691809],
    },
    {
        id: 23,
        background: LABbackground,
        title: 'LAB',
        description: '07.08 20:00 МТС Live Лето',
        address: 'Северная площадь 37',
        metroStation: '14 Лужники',
        type: 'концерт',
        importance: 'необязательно',
        coords: [55.717381, 37.550899],
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
                            width: isMobile ? '100%' : isOpen ? 1740 : 385,
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