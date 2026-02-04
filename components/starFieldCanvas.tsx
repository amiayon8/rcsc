'use client';

import { useEffect, useRef } from 'react';

const StarfieldCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number, height: number;
        let entities: Entity[] = [];
        let comets: Comet[] = [];
        let telescopeSprite: HTMLCanvasElement | null = null;
        let isMobile = window.innerWidth < 768;
        let stars: Entity[] = [];
        const connectDistance = isMobile ? 80 : 150;
        let mouseX = 0;
        let mouseY = 0;
        let animationFrameId: number;

        function createOffscreenCanvas(w: number, h: number) {
            const c = document.createElement('canvas');
            c.width = w;
            c.height = h;
            return { c, ctx: c.getContext('2d')! };
        }

        function createBlackHoleSprite(size: number) {
            const res = size * 25;
            const { c, ctx } = createOffscreenCanvas(res, res);
            const cx = res / 2, cy = res / 2;
            const horizonR = size * 2.2;

            const spaceGlow = ctx.createRadialGradient(cx, cy, horizonR, cx, cy, horizonR * 6);
            spaceGlow.addColorStop(0, 'rgba(255, 69, 0, 0.08)');
            spaceGlow.addColorStop(0.4, 'rgba(255, 140, 0, 0.02)');
            spaceGlow.addColorStop(1, 'rgba(100, 0, 0, 0)');
            ctx.fillStyle = spaceGlow;
            ctx.fillRect(0, 0, res, res);

            function drawDiskRing(offsetY: number, radiusX: number, radiusY: number, colors: string[]) {
                const grad = ctx.createLinearGradient(cx - radiusX * horizonR, cy, cx + radiusX * horizonR, cy);
                colors.forEach((color, i) => {
                    grad.addColorStop(i / (colors.length - 1), color);
                });
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.ellipse(cx, cy + offsetY, radiusX * horizonR, radiusY * horizonR, 0, Math.PI, Math.PI * 2);
                ctx.fill();
            }

            ctx.shadowColor = "#FF4500";
            ctx.shadowBlur = size * 0.3;

            drawDiskRing(size * 0.5, 4.2, 1.3, ['rgba(100, 0, 0, 0.8)', '#8B0000', '#FF0000', '#8B0000', 'rgba(100, 0, 0, 0.8)']);
            drawDiskRing(size * 0.42, 3.8, 1.15, ['rgba(160, 20, 0, 0.85)', '#FF4500', '#FF6347', '#FF4500', 'rgba(160, 20, 0, 0.85)']);
            drawDiskRing(size * 0.35, 3.4, 1.0, ['rgba(200, 50, 0, 0.9)', '#FF8C00', '#FFA500', '#FF8C00', 'rgba(200, 50, 0, 0.9)']);
            ctx.shadowBlur = 0;

            const horizonGrad = ctx.createRadialGradient(cx, cy, horizonR * 0.85, cx, cy, horizonR);
            horizonGrad.addColorStop(0, '#000000');
            horizonGrad.addColorStop(0.8, '#000000');
            horizonGrad.addColorStop(1, 'rgba(100, 0, 0, 1)');
            ctx.fillStyle = horizonGrad;

            ctx.shadowColor = "#FFD700";
            ctx.shadowBlur = size * 0.2;
            ctx.beginPath();
            ctx.arc(cx, cy, horizonR, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = res * 0.015;
            ctx.shadowColor = '#FFFFFF';
            ctx.shadowBlur = size * 0.3;
            ctx.beginPath();
            ctx.arc(cx, cy, horizonR, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = res * 0.012;
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = size * 0.5;
            ctx.beginPath();
            ctx.arc(cx, cy, horizonR * 0.93, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;

            function drawFrontDiskRing(offsetY: number, radiusX: number, radiusY: number, colors: string[], opacity = 1) {
                const grad = ctx.createLinearGradient(cx - radiusX * horizonR, cy, cx + radiusX * horizonR, cy);
                colors.forEach((color, i) => {
                    grad.addColorStop(i / (colors.length - 1), color);
                });
                ctx.fillStyle = grad;
                ctx.globalAlpha = opacity;
                ctx.beginPath();
                ctx.ellipse(cx, cy + offsetY, radiusX * horizonR, radiusY * horizonR, 0, 0, Math.PI);
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            ctx.shadowColor = "#FFD700";
            ctx.shadowBlur = size * 0.3;
            drawFrontDiskRing(-size * 0.5, 4.2, 1.3, ['rgba(200, 50, 0, 0.75)', '#FF4500', '#FFD700', '#FF4500', 'rgba(200, 50, 0, 0.75)']);
            drawFrontDiskRing(-size * 0.42, 3.8, 1.15, ['rgba(255, 100, 0, 0.8)', '#FFD700', '#FFFF00', '#FFD700', 'rgba(255, 100, 0, 0.8)']);
            drawFrontDiskRing(-size * 0.28, 3.0, 0.85, ['#FFD700', '#FFFFE0', '#FFFFFF', '#FFFFE0', '#FFD700'], 1.0);
            ctx.shadowBlur = 0;

            return c;
        }

        function createTelescopeSprite(size: number) {
            const res = size * 3;
            const { c, ctx } = createOffscreenCanvas(res, res);

            const cx = res / 2;
            const cy = res / 2;

            const darkMetal = "#2c3e50";
            const lightBody = "#ecf0f1";
            const accentCyan = "#00d2ff";
            const lensBlue = "#34495e";
            const outlineWhite = "#ffffff";
            const outlineWidth = res * 0.02;

            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            ctx.strokeStyle = outlineWhite;
            ctx.lineWidth = outlineWidth;
            ctx.fillStyle = darkMetal;

            const legBaseY = res * 0.85;

            ctx.beginPath();
            ctx.moveTo(cx - size * 0.4, legBaseY);
            ctx.lineTo(cx, cy + size * 0.2);
            ctx.lineTo(cx - size * 0.1, cy + size * 0.2);
            ctx.lineTo(cx - size * 0.5, legBaseY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(cx + size * 0.4, legBaseY);
            ctx.lineTo(cx, cy + size * 0.2);
            ctx.lineTo(cx + size * 0.1, cy + size * 0.2);
            ctx.lineTo(cx + size * 0.5, legBaseY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cx, cy + size * 0.2, size * 0.15, 0, Math.PI * 2);
            ctx.fillStyle = "#95a5a6";
            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.translate(cx, cy + size * 0.15);
            ctx.rotate(-Math.PI / 4);

            const tubeLen = size * 1.8;
            const tubeW = size * 0.6;

            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.beginPath();

            // @ts-ignore - roundRect is modern but TS might complain depending on version
            if (ctx.roundRect) ctx.roundRect(-tubeLen * 0.45, -tubeW * 0.35 + 10, tubeLen, tubeW, 20);
            else ctx.rect(-tubeLen * 0.45, -tubeW * 0.35 + 10, tubeLen, tubeW);
            ctx.fill();

            ctx.fillStyle = lightBody;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(-tubeLen * 0.5, -tubeW * 0.5, tubeLen, tubeW, 15);
            else ctx.rect(-tubeLen * 0.5, -tubeW * 0.5, tubeLen, tubeW);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = accentCyan;
            ctx.beginPath();
            ctx.rect(-tubeLen * 0.2, -tubeW * 0.5, tubeLen * 0.15, tubeW);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-tubeLen * 0.2, -tubeW * 0.5);
            ctx.lineTo(-tubeLen * 0.2, tubeW * 0.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-tubeLen * 0.05, -tubeW * 0.5);
            ctx.lineTo(-tubeLen * 0.05, tubeW * 0.5);
            ctx.stroke();

            ctx.fillStyle = darkMetal;
            ctx.beginPath();
            ctx.rect(-tubeLen * 0.65, -tubeW * 0.2, tubeLen * 0.15, tubeW * 0.4);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = darkMetal;
            ctx.beginPath();
            ctx.rect(tubeLen * 0.48, -tubeW * 0.55, tubeLen * 0.1, tubeW * 1.1);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = lensBlue;
            ctx.beginPath();
            ctx.ellipse(tubeLen * 0.52, 0, tubeLen * 0.02, tubeW * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#85c1e9";
            ctx.beginPath();
            ctx.ellipse(tubeLen * 0.52, -tubeW * 0.15, tubeLen * 0.015, tubeW * 0.1, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            return c;
        }

        class Comet {
            x: number = 0;
            y: number = 0;
            speedX: number = 0;
            speedY: number = 0;
            size: number = 0;
            trail: { x: number, y: number }[] = [];
            active: boolean = false;

            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = -50;
                this.speedX = (Math.random() - 0.5) * 3;
                this.speedY = Math.random() * 4 + 4;
                this.size = Math.random() * 3 + 2;
                this.trail = [];
                this.active = Math.random() < 0.008;
            }
            update() {
                if (!this.active) {
                    if (Math.random() < 0.008) this.active = true;
                    return;
                }
                this.x += this.speedX;
                this.y += this.speedY;
                this.trail.push({ x: this.x, y: this.y });
                if (this.trail.length > 15) this.trail.shift();
                if (this.y > height + 50 || this.x < -50 || this.x > width + 50) this.reset();
            }
            draw() {
                if (!this.active || this.trail.length < 2) return;
                const head = this.trail[this.trail.length - 1];
                const tail = this.trail[0];
                const grad = ctx!.createLinearGradient(tail.x, tail.y, head.x, head.y);
                grad.addColorStop(0, 'rgba(0, 210, 255, 0)');
                grad.addColorStop(1, 'rgba(0, 210, 255, 0.8)');

                ctx!.beginPath();
                ctx!.moveTo(tail.x, tail.y);
                for (let i = 1; i < this.trail.length; i++) ctx!.lineTo(this.trail[i].x, this.trail[i].y);
                ctx!.lineWidth = this.size;
                ctx!.strokeStyle = grad;
                ctx!.lineCap = 'round';
                ctx!.stroke();

                ctx!.fillStyle = '#fff';
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
                ctx!.fill();
                ctx!.shadowColor = "#00d2ff";
                ctx!.shadowBlur = 10;
                ctx!.fill();
                ctx!.shadowBlur = 0;
            }
        }

        class Entity {
            type: string;
            x: number = 0;
            y: number = 0;
            size: number = 0;
            vx: number = 0;
            vy: number = 0;
            sprite?: HTMLCanvasElement;
            time: number = 0;

            constructor(type: string) {
                this.type = type;
                this.reset();
            }
            reset() {
                const scale = isMobile ? 0.6 : 1;
                this.time = Math.random() * 100;

                if (this.type === 'star') {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.size = Math.random() * 2 + 0.5;
                    this.vx = (Math.random() - 0.5) * 0.4;
                    this.vy = (Math.random() - 0.5) * 0.4;
                } else if (this.type === 'blackhole') {
                    this.size = 110 * scale;
                    this.sprite = createBlackHoleSprite(this.size);
                    this.x = width * 0.8;
                    this.y = height * 0.4;
                }
            }

            update() {
                if (this.type === 'star') {
                    this.x += this.vx;
                    this.y += this.vy;
                    let dx = this.x - mouseX,
                        dy = this.y - mouseY;
                    if (Math.sqrt(dx * dx + dy * dy) < 120) {
                        this.x += dx * 0.03;
                        this.y += dy * 0.03;
                    }
                    if (this.x < 0) this.x = width;
                    if (this.x > width) this.x = 0;
                    if (this.y < 0) this.y = height;
                    if (this.y > height) this.y = 0;
                }
            }

            draw() {
                if (this.type === 'star') {
                    ctx!.fillStyle = "rgba(255,255,255,0.8)";
                    ctx!.beginPath();
                    ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx!.fill();
                } else if (this.sprite) {
                    const off = this.sprite.width / (window.devicePixelRatio > 1 ? 20 : 10);
                    ctx!.drawImage(this.sprite, this.x - off, this.y - off, off * 2, off * 2);
                }
            }
        }

        function init() {
            entities = [];
            stars = [];
            comets = [];
            for (let i = 0; i < 80; i++) {
                let s = new Entity('star');
                stars.push(s);
                entities.push(s);
            }
            // entities.push(new Entity('blackhole'));
            for (let i = 0; i < 4; i++) comets.push(new Comet());

            // telescopeSprite = createTelescopeSprite(isMobile ? 120 : 200);
        }

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;

            if (canvas) {
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';

                canvas.width = Math.floor(width * dpr);
                canvas.height = Math.floor(height * dpr);

                ctx!.scale(dpr, dpr);
                isMobile = window.innerWidth < 768;

                if (entities.length === 0) init();
            }
        }

        function animate() {
            ctx!.clearRect(0, 0, width, height);

            ctx!.strokeStyle = `rgba(0, 210, 255, 0.15)`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    let dx = stars[i].x - stars[j].x,
                        dy = stars[i].y - stars[j].y;
                    if (Math.sqrt(dx * dx + dy * dy) < connectDistance) {
                        ctx!.moveTo(stars[i].x, stars[i].y);
                        ctx!.lineTo(stars[j].x, stars[j].y);
                    }
                }
            }
            ctx!.stroke();

            const bh = entities.find(e => e.type === 'blackhole');
            if (bh) bh.draw();

            entities.filter(e => e.type !== 'blackhole' && e.type !== 'star').forEach(e => {
                e.update();
                e.draw();
            });

            stars.forEach(s => {
                s.update();
                s.draw();
            });

            comets.forEach(c => {
                c.update();
                c.draw();
            });

            if (telescopeSprite) {
                const tWidth = telescopeSprite.width / (window.devicePixelRatio > 1 ? 2 : 1) / 2.2;
                const tHeight = telescopeSprite.height / (window.devicePixelRatio > 1 ? 2 : 1) / 2.2;

                const tx = isMobile ? -10 : 20;
                const baseTy = height - tHeight + 10;
                const wiggle = Math.sin(Date.now() / 1500) * 4;
                const ty = baseTy + wiggle;

                ctx!.drawImage(telescopeSprite, 0, 0, telescopeSprite.width, telescopeSprite.height, tx, ty, tWidth, tHeight);
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        };

        const handleResize = () => {
            resize();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="starfield"
            className="top-0 left-0 z-0 fixed w-full h-full pointer-events-auto will-change-transform"
            style={{ background: 'transparent' }}
        />
    );
};

export default StarfieldCanvas;