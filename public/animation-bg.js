window.onload = function () {
    let c = init("canvas-bg").c,
        canvas = init("canvas-bg").canvas,
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight);
    //initiation

    function cc(A, B, C) {
        let D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
        let S = {
            x: (1 / D) * ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y)),
            y: (1 / D) * ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x))
        }
        return S;
    }

    function inWindow(A) {
        if (A.x > 0 && A.x < w && A.y > 0 && A.y < h) {
            return true;
        }
        return false;
    }
    function isFirefox(){
        const ua = window.navigator.userAgent.toLowerCase();
        return ua.includes('firefox');
    }
    class point {
        constructor(x, y) {
            this.x = x || Math.random() * w;
            this.y = y || Math.random() * h;
        }
        ccc(o, ind) {
            const theme = window.theme ? window.theme.themeColor : 0;
            let color = '#fff';
            if (theme == 0) {
                color = "rgba(200,0,255,0.3)";
            } else if (theme == 1) {
                color = "rgba(0,255,0,0.3)";
            } else if (theme == 2) {
                color = "rgba(255,0,0,0.3)";
            } else if (theme == 3) {
                color = "rgba(50,255,255,0.3)";
            }
            for (let i = 0; i < o.length; i++) {
                c.globalCompositeOperation = "lighter";
                c.beginPath();
                for (let j = i; j < o.length; j++) {
                    if (i != ind && j != ind && i != j) {
                        this.s = cc(this, o[i], o[j]);

                        if (inWindow(this.s)) {
                            // c.beginPath();
                            // c.arc(this.s.x,this.s.y,1,0,2*Math.PI);
                            // c.fillStyle="green";
                            // c.fill();
                            // c.globalCompositeOperation="lighter";

                            c.fillStyle = color

                            c.fillRect(this.s.x - 1, this.s.y - 1, 2, 2);
                            c.lineTo(this.s.x, this.s.y);
                            //c.globalCompositeOperation="source-over";

                            //             c.lineWidth=0.01;
                            //             // c.beginPath();
                            //             // c.lineTo(this.x,this.y);
                            //             // c.lineTo(this.s.x,this.s.y);
                            //             // c.strokeStyle="red";
                            //             // c.stroke();

                            //             c.beginPath();
                            //             c.lineTo(o[i].x,o[i].y);
                            //             c.lineTo(this.s.x,this.s.y);
                            //             c.strokeStyle="green";
                            //             c.stroke();

                            //             c.beginPath();
                            //             c.lineTo(o[j].x,o[j].y);
                            //             c.lineTo(this.s.x,this.s.y);
                            //             c.strokeStyle="blue";
                            //             c.stroke();
                            //             c.lineWidth=1;
                        }
                    }
                }
                c.strokeStyle = color;
                c.lineWidth = isFirefox()?0.5:0.05;
                c.stroke();
                c.globalCompositeOperation = "source-over";
            }
        }
        move(m) {
            this.x = m.x;
            this.y = m.y;
        }
        show() {
            c.beginPath();
            c.arc(this.x, this.y, 4, 0, 2 * Math.PI);
            c.fillStyle = "white";
            c.fill();
        }
    }

    let p = [],
        s = [],
        i = 0,
        num = 100;

    for (i = 0; i < num - 1; i++) {
        p.push(new point());
    }

    function draw() {
        if (p.length < num) {
            p.push(new point(mouse.x, mouse.y));
        }
        //animation
        p[p.length - 1].move(mouse);
        p[p.length - 1].ccc(p, p.length - 1);
        for (i = 0; i < p.length; i++) {
            // p[i].ccc(p,i);
            // p[i].show();
        }
    }

    let mouse = {
        x: w / 2,
        y: h / 2
    };
    let last_mouse = {};

    window.addEventListener(
        "mousemove",
        function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - canvas.offsetLeft;
            mouse.y = e.pageY - canvas.offsetTop;

        },
        false
    );
    function init(elemid) {
        let canvas = document.getElementById(elemid),
            c = canvas.getContext("2d"),
            w = (canvas.width = window.innerWidth),
            h = (canvas.height = window.innerHeight);
        c.fillStyle = "rgba(30,30,30,1)";
        c.fillRect(0, 0, w, h);
        return { c: c, canvas: canvas };
    }

    function loop() {
        window.requestAnimationFrame(loop);
        c.fillStyle = "rgba(0,0,0,1)";
        c.fillRect(0, 0, w, h);
        draw();
    }

    window.addEventListener("resize", function () {
        (w = canvas.width = window.innerWidth),
            (h = canvas.height = window.innerHeight);
    });

    loop();
}