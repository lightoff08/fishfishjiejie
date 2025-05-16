document.addEventListener('DOMContentLoaded', () => {
    // 葉片飄落特效
    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -50px;
            font-size: 24px;
            pointer-events: none;
            animation: leafFall ${Math.random() * 3 + 5}s linear infinite;
        `;
        leaf.innerHTML = '🍂';
        document.querySelector('.heart-container').appendChild(leaf);
        setTimeout(() => leaf.remove(), 8000);
    }
    setInterval(createLeaf, 800);

    // 展開信件功能 (核心修复部分)
    const readMoreBtn = document.querySelector('.read-more');
    const hiddenContent = document.querySelector('.hidden-content');
    let isExpanded = false;

    if (readMoreBtn && hiddenContent) {
        readMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            
            // GSAP 动画控制
            gsap.to(hiddenContent, {
                duration: 0.8,
                maxHeight: isExpanded ? '2000px' : '0',
                ease: "power4.inOut",
                onStart: () => {
                    hiddenContent.classList.toggle('visible', isExpanded);
                    readMoreBtn.textContent = isExpanded ? '收合信件 ▲' : '展開完整信件 ▼';
                }
            });

            // 段落逐行浮现效果
            if (isExpanded) {
                gsap.fromTo('.hidden-content p',
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: "sine.out",
                        delay: 0.3
                    }
                );
            }

            // 自动滚动定位
            if (isExpanded) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: hiddenContent,
                        offsetY: 100
                    },
                    ease: "power2.inOut"
                });
            }
        });
    }


gsap.fromTo('.fade-in',
    { // 起始狀態 (FROM)
        opacity: 0,
        y: -50
    },
    { // 結束狀態 (TO)
        opacity: 1,
        y: 0, // 假設最終 Y 軸位置是 0
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
    }
);

// 添加葉片飄落動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes leafFall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
    }
`;
document.head.appendChild(style);
});