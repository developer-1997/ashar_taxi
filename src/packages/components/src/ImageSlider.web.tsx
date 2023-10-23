import React, { useState, useEffect } from 'react';
import "./ImageSlider.web.css";

interface Props {
    images: string[];
    hideNavigation?: boolean;
}

const ImageSlider = ({ images, hideNavigation = true }: Props) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((index + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    });

    const slideRight = () => {
        setIndex((index + 1) % images.length);
    };

    const slideLeft = () => {
        const nextIndex = index - 1;
        if (nextIndex < 0) {
            setIndex(images.length - 1);
        } else {
            setIndex(nextIndex);
        }
    };
    return (
        images.length > 0 ? (
            <div className="image-slider">
                {!hideNavigation && <button onClick={slideLeft}>{'<'}</button>}
                <div className="slider-item"><img src={images[index]} /></div>
                {!hideNavigation && <button onClick={slideRight}>{'>'}</button>}
                <ul className="slider-dots">
                    {images.map((_, i) => (
                        <li
                            key={i}
                            className={i === index ? 'active' : ''}
                            onClick={() => setIndex(i)}
                        >
                            <img src={images[i]} />
                        </li>
                    ))}
                </ul>
            </div>
        ) : <></>
    );
};

export default ImageSlider;
