/**
 * components/hero-canvas.tsx
 * 
 * An animation that plays when the website is initially loaded
 * 
 * Author: Alex Prosser
 * Date: 2/25/2025
 */

'use client';

import { col } from 'motion/react-client';
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
        const columns = 225;
        const size = Math.round(context.canvas.width / columns);
        const rows = Math.round(context.canvas.height / size);
        const branchCount = 12;

        const getColor = (mode: string, highlight: number) => {
            const values: Record<string, number> = { DARK: 20, LIGHT: 30, LIGHTEST: 40 };
            return `hsl(230, 38%, ${values[mode] + highlight}%)`;
        }

        const generateCircuitBranch = (beginning: { x: number, y: number }, flipped: boolean) => {
            const current = structuredClone(beginning);
            const pixels: { x: number, y: number, color: string }[] = [ { ...beginning, color: 'DARK' } ];
            let chance = Math.random();
            let count = 0;
            while (chance > 0.01 || count < 8) {
                if (count > columns / 2) break;
                count++;

                current.x = current.x + (flipped ? -1 : 1);
                chance = Math.random();

                // generate some amount of height
                if (chance < 0.05) {
                    let height = Math.floor(Math.random() * 11) - 5;
                    if (height === 0) height = (Math.random() > 0.5) ? 1 : -1;
                    const direction = Math.sign(height);

                    for (let i = 0; i < Math.abs(height); i++) {
                        if (current.y <= 0 || current.y >= rows - 1) break;

                        current.y += direction;
                        pixels.push({ x: current.x, y: current.y, color: (direction === -1) ? 'DARK' : 'LIGHT' });
                        current.y += Math.sign(height);
                        pixels.push({ x: current.x, y: current.y, color: (direction === -1) ? 'LIGHT' : 'DARK' });
                        current.x = current.x + (flipped ? -1 : 1);
                        count++;
                    }
                    current.y += Math.sign(height);
                }

                pixels.push({ x: current.x, y: current.y, color: 'LIGHT' });
                chance = Math.random();
            }

            // place final pixels
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let color = 'LIGHTEST';
                    if (i === 0 && j === 0) color = 'DARK';
                    pixels.push({ x: current.x + i, y: current.y + j, color });
                }   
            }

            return pixels;
        }

        if (!animationState.branches) {
            animationState.branches = [];
            
            for (let i = 0; i < branchCount; i++) {
                let y = Math.round(rows * (i / branchCount));
                animationState.branches.push(generateCircuitBranch({ x: 0, y }, false));
                animationState.branches.push(generateCircuitBranch({ x: columns - 1, y }, true));
            }
        } else {
            context.fillStyle = '#111111';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);

            for (let i = 0; i < branchCount * 2; i++) {
                for (let j = 0; j < animationState.branches[i].length; j++) {
                    let highlight = 0;
                    let dist = Math.max(0, j - (Math.floor(frameCount / 5) % animationState.branches[i].length));

                    if (dist <= 5) highlight = dist * 8;

                    context.fillStyle = getColor(animationState.branches[i][j].color, highlight);
                    context.fillRect(animationState.branches[i][j].x * size, animationState.branches[i][j].y * size, size, size);
                }
            }
        }
    });

    return <>
        <canvas ref={canvasRef} className={'w-full h-[85vh] absolute top-0 left-0 z-[-1]'} {...props}></canvas>
    </>
}

export default HeroCanvas;