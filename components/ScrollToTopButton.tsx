import { useEffect, useState } from 'react';
import { ChevronDoubleUpIcon } from '@heroicons/react/20/solid'

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given amount
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed right-2 bottom-2 z-10">
            {isVisible &&
                <div onClick={scrollToTop}>
                    <button className='sr-only'>Scroll to Top</button>
                    <ChevronDoubleUpIcon className='h-8 w-8 p-1 rounded-md cursor-pointer bg-gray-900 text-white' />
                </div>}
        </div>
    );
}

export default ScrollToTopButton;
