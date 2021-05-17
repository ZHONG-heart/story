import { useDebounce } from 'ahooks';
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react';
import './index.scss'


enum BROWSER_MODE {
    上下滑动 = 1,
    左右滑动 = 2
}

interface IProps {
    onPrev?: () => void;
    onNext?: () => void;
    content: string;
}

const checkEventZone = (eventPos: { x: number; y: number }, screenWidth: number) => {
    const partWidth = screenWidth / 3;
    if (eventPos.x >= 0 && eventPos.x < partWidth) {
        return 'left'
    } else if (eventPos.x >= partWidth && eventPos.x < partWidth * 2) {
        return 'center'
    } else {
        return 'right'
    }

}

export default function Reader(props: IProps) {
    const { onPrev, onNext, content } = props
    const articleClassNames = classNames('reader-article custom-reader-article', {})
    const sectionRef = useRef<HTMLElement>(null)
    const screenWidth = useRef(0)
    const pagination = useRef({ currentPage: 1, totalPage: 1, isTail: false })
    const [watch, setWatch] = useState(false);
    const debouncedWatch = useDebounce(watch, { wait: 100 });

    const translate = () => {
        if (!sectionRef.current) return;
        sectionRef.current.style.transition = '0.4s';
        const translateX = -(screenWidth.current - 16) * (pagination.current.currentPage - 1);
        sectionRef.current.style.transform = `translateX(${translateX}px)`;
    }

    const onClick = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const eventZone = checkEventZone({ x: ev.clientX, y: ev.clientY }, screenWidth.current)
        const { currentPage, totalPage } = pagination.current
        if (!sectionRef.current) return;
        if (eventZone === 'center') {
            return;
        }
        if (eventZone === 'left' && currentPage <= 1) {
            pagination.current.isTail = true;
            onPrev && onPrev()
            return;
        }
        if (eventZone === 'right' && currentPage >= totalPage) {
            pagination.current.isTail = false;
            onNext && onNext()
            return;
        }

        if (eventZone === 'left' && currentPage > 1) {
            pagination.current.currentPage -= 1
        }

        if (eventZone === 'right' && currentPage < totalPage) {
            pagination.current.currentPage += 1
        }
        translate()
    }

    const onMouseDown = (ev: Event) => {
        console.log(ev, 'down')
    }

    const onMouseMove = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        console.log(ev, 'move')
    }

    const onMouseUp = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        console.log(ev, 'up')
    }

    useEffect(() => {
        sectionRef.current?.addEventListener('onmousedown', onMouseDown)
    }, [])

    useEffect(() => {
        window.onresize = () => {
            setWatch(!watch)
        }
    }, [setWatch, watch]);

    useEffect(() => {
        screenWidth.current = document.body.offsetWidth

    }, [watch, screenWidth])
    useEffect(() => {
        const totalWidth = sectionRef.current?.scrollWidth || 0
        pagination.current.totalPage = Math.ceil(totalWidth / screenWidth.current)
        pagination.current.currentPage = pagination.current.isTail ? pagination.current.totalPage : 1

        if (!sectionRef.current) return;
        sectionRef.current.style.transition = '0s';
        const translateX = -(screenWidth.current - 16) * (pagination.current.currentPage - 1);
        sectionRef.current.style.transform = `translateX(${translateX}px)`;
    }, [content, debouncedWatch]);

    return <article className={articleClassNames} onClick={onClick}>
        <section ref={sectionRef} className="reader-section custom-reader-section" dangerouslySetInnerHTML={{ __html: content }}>

        </section>
    </article>
}