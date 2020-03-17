import {useEffect,useLayoutEffect, useRef} from "react"
import Move3d from "../utils/move3d"
const WrapScale = ({children, width, height,deg}) => {

    const getDom = useRef()
    useEffect(() => {
        new Move3d(getDom.current.firstChild,deg);
        return () => {
        }
    })
    return (
        <div
            className="scaleWrap"
            ref={getDom}
            style={{
            width:width,
            height:height
        }}>
            {children}

            <style jsx>
                {
                    ` .scaleWrap {
                        position: relative;
                        height: 3rem;
                        width: 2rem;
                        margin: 0 auto 0.1rem;
                    }
                    .scaleTarget {
                        display: block;
                        width: 100%;
                        cursor: pointer;
                        z-index: 1000;
                        position: relative;
                        margin: 0 auto;
                        will-change: transform;
                        transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
                    }
                    .scaleTarget:hover {
                        transform: scale(1.2, 1.2);
                    }
                     `
                }</style>

        </div>
    )
}
WrapScale.defaultProps={
 width:"auto",
 height:"auto",
 deg:1
}

export default WrapScale
