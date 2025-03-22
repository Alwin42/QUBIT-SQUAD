
const n = 25;
const rots = [
    { ry: 270, rx: 0, a: 0.6 },
    { ry: 0, rx: 0, a: 0.9 },
    { ry: 90, rx: 0, a: 0.3 },
    { ry: 180, rx: 0, a: 0.0 }
];

gsap.set(".face", {
    z: 200,
    rotateY: i => rots[i].ry,
    transformOrigin: "50% 50% -200px"
});

for (let i = 0; i < n; i++) {
    let die = document.querySelector('.die');
    let cube = die.querySelector('.cube');
    
    if (i > 0) {    
        let clone = document.querySelector('.die').cloneNode(true);
        document.querySelector('.tray').append(clone);
        cube = clone.querySelector('.cube');
    }
    
    gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power3.inOut', duration: 1 } })
        .fromTo(cube, {
            rotateY: -90
        }, {
            rotateY: 90,
            ease: 'power1.inOut',
            duration: 2
        })
        .fromTo(cube.querySelectorAll('.face'), {
            background: (j) => 'hsl(270, 50%,' + (20 * [rots[3].a, rots[0].a, rots[1].a][j]) + '%)', // Dark purple
            color: (j) => 'hsl(' + (330 - (i/n*30)) + ', 80%,' + (70 * [rots[3].a, rots[0].a, rots[1].a][j]) + '%)' // Neon pink
        }, {
            background: (j) => 'hsl(200, 50%,' + (20 * [rots[0].a, rots[1].a, rots[2].a][j]) + '%)', // Dark blue
            color: (j) => 'hsl(' + (200 + (i/n*30)) + ', 80%,' + (70 * [rots[0].a, rots[1].a, rots[2].a][j]) + '%)' // Neon blue
        }, 0)
        .to(cube.querySelectorAll('.face'), {
            background: (j) => 'hsl(270, 50%,' + (20 * [rots[1].a, rots[2].a, rots[3].a][j]) + '%)', // Dark purple again
            color: (j) => 'hsl(' + (330 - (i/n*30)) + ', 80%,' + (70 * [rots[1].a, rots[2].a, rots[3].a][j]) + '%)' // Neon pink
        }, 1)
        .progress(i / n);
}

gsap.from('.die', { display: 'none', stagger: 0.06 });

gsap.timeline({ defaults: { ease: 'power1.inOut', repeat: -1, yoyo: true } })
    .fromTo('.tray', { yPercent: -4, scale: 1.2 }, { scale: 0.9, yPercent: 4, duration: 2 })
    .fromTo('.tray', { rotate: -15 }, { rotate: 15, duration: 4 }, 0);

window.onload = window.onresize = () => {
    const h = n * 45;
    gsap.set('.tray', { perspective: 800, height: h });
    gsap.set('.pov', { scale: gsap.utils.clamp(0.5, 1, innerHeight / h) });
};
