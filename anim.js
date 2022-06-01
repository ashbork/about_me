

let typewriter = () => {
    let el = document.getElementById("hi");
    let delay = 100;
    let text = el.innerHTML;
    el.innerHTML = "";
    let n = 0;
    let iv = setInterval(
        () => {
            el.innerHTML = el.innerHTML + text[n];
            n += 1;
            if (n == text.length) {
                clearInterval(iv);
                setTimeout(() => {
                    el.innerHTML = el.innerHTML.replace("Ash", "<span id='name'>Ash</span>");
                }, 200)
            }

        }, delay)
}
document.onload = typewriter();

Pts.namespace(window);
let space = new CanvasSpace("#bganim").setup({ bgcolor: "#191724" });
let form = space.getForm();

(function () {
    let world;
    space.add({
        start: (bound, space) => {
            world = new World(space.innerBound, 1, 0);
            let pts = Create.distributeRandom(space.innerBound, 20)
            for (let i = 0; i < pts.length; i++) {
                let p = new Particle(pts[i]).size(Num.randomRange(space.innerBound[1][0] / 40, space.innerBound[1][0] / 30));
                p.hit(Num.randomRange(-50, 50), Num.randomRange(-50, 50))
                world.add(p)
            }

        },
        animate: (time, ftime) => {
            world.drawParticles((p, i) => {
                let color = ["#eb6f92", "#f6c177", "#ea9a97", "#3e8fb0", "#9ccfd8", "#c4a7e7"][i % 6];
                form.fillOnly(color).point(p, p.radius, "circle")
                // hit the particle with a random force every 2 seconds
                if (time % 5000 < 100) {
                    if (space.isPlaying) {
                        p.hit(Num.randomRange(-5, 5), Num.randomRange(-2, 2))
                    }
                }
            })
            world.update(ftime)
        },
        action: (type, px, py) => {
            if (type == "drag") {
                world.particle(0).lock = true;
                if (world) { world.particle(0).position = new Pt(px, py) }
            }
            if (type == "drop") {
                world.particle(0).lock = false;
                world.particle(0).hit(px / 2, py / 2)
            }
        }
    })

    space.play();
    space.bindMouse().bindTouch();
})();

