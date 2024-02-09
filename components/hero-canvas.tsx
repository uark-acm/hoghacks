'use client';

import { useRef, useEffect } from 'react';

const useCanvas = (draw: (context: CanvasRenderingContext2D, frameCount: number, animationState: Record<string, any>) => void) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas != null) {
            const context = canvas.getContext('2d');
            if (context != null) {
                let frameCount = 0;
                let animationFrameID: number;

                let animationState = {};

                const render = () => {
                    frameCount++;
                    draw(context, frameCount, animationState);
                    animationFrameID = window.requestAnimationFrame(render);
                }

                const resize = () => {
                    const { width, height } = canvas.getBoundingClientRect();

                    if (canvas.width !== width || canvas.height !== height) {
                        const ratio = window.devicePixelRatio;
                        canvas.width = width * ratio;
                        canvas.height = height * ratio;
                        context.scale(ratio, ratio);
                    }
                }

                resize();
                render();

                window.addEventListener('resize', resize)

                return () => {
                    window.cancelAnimationFrame(animationFrameID);
                }
            }
        }
    }, [draw]);

    return canvasRef;
}

const HeroCanvas = (props: Record<string, any>) => {
    const canvasRef = useCanvas((context: CanvasRenderingContext2D, frameCount: number, animationState: Record<string, any>) => {
        context.fillStyle = '#111111';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        const columns = 75;

        if (!animationState.positions) {
            animationState.positions = [];
            for (let i = 0; i < columns; i++) {
                animationState.positions.push(Math.random());
            }
        }

        const lineSpacing = 3;
        const speed = 6;
        const size = Math.round(context.canvas.width / (columns * lineSpacing + 1));
        const width = context.canvas.width / size, height = context.canvas.height / size;
        const colors = ['#418e84', '#26544e', '#1c3d38'];
        const alphaBuffer = 5;
        for (let i = 0; i < width; i += lineSpacing) {
            const random = animationState.positions[Math.floor(i / lineSpacing)];
            const startY = (Math.floor(random * height) + Math.floor(frameCount / speed)) % height;
            const tailLength = (1 - random) * 10 + 15;
            
            for (let j = 0; j < tailLength; j++) {
                let y = startY - j;
                if (y < 0) y += height;

                let index = 0;
                if (j >= ((random > 0.5) ? 1 : 2)) index++;
                if (j > ((random * 5) + 5)) index++;

                let alpha = 1;
                if (y < alphaBuffer) {
                    alpha = y / alphaBuffer;
                } else if (y > height - alphaBuffer) {
                    alpha = (height - y) / alphaBuffer;
                }

                context.save();
                context.globalAlpha = alpha;
                context.fillStyle = colors[index];
                context.fillRect(i * size, y * size, size, size);
                context.restore();
            }
        }
    });

    return <>
        <canvas ref={canvasRef} className={'w-full h-[85vh] absolute top-0 left-0 z-[-1]'} {...props}></canvas>
    </>
}

export default HeroCanvas;