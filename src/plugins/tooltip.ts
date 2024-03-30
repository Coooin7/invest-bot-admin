import { type Directive, type DirectiveBinding, type Plugin } from 'vue'
const RootFontSize = 16;
export const tooltip: Plugin = {
    install(app) {
        app.directive('tip', directive);
    },
}

const directive: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        el.setAttribute('data-title', binding.value);
        el.addEventListener('mouseenter', mouseHandler.mouseEnter);
        el.addEventListener('mouseleave', mouseHandler.mouseleave);
        const child = window.document.createElement('span');
        child.className = 'tooltip';
        child.innerText = binding.value;
        el.appendChild(child);
    },
    beforeUpdate(el: HTMLElement, binding: DirectiveBinding) {
        el.setAttribute('data-title', binding.value);
        const child = el.querySelector('.tooltip') as HTMLElement;
        if (!child) {
            return
        }
        child.innerText = binding.value;
    },
    beforeUnmount(el: HTMLElement) {
        el.removeEventListener('mouseenter', mouseHandler.mouseEnter);
        el.removeEventListener('mouseleave', mouseHandler.mouseleave);
    }
}

const mouseHandler = {
    mouseEnter(e: MouseEvent) {
        const el = e.target as HTMLElement;
        if (!el) {
            return
        }
        const child = el.querySelector('.tooltip') as HTMLElement;
        if (!child) {
            return
        }
        child.classList.add('theme-scroll-3')
        const rect = child.getBoundingClientRect();
        const tip = String(el.getAttribute('data-title'));
        let x = '0';
        let y = '-100%'
        // if (e.x > window.innerWidth - rect.width) {
        //     x = '-100%'
        // }
        if (e.y < window.innerHeight / 2 ) {
            y = '2em'
        }
        if (el.offsetWidth > tip.length * RootFontSize) {
            child.style.display = 'none';
        } else {
            child.style.display = 'block';
        }
        child.style.transform = `translate(${x}, ${y})`;
    },
    mouseleave(e: MouseEvent) {
        const el = e.target as HTMLElement;
        if (!el) {
            return
        }
        const child = el.querySelector('.tooltip') as HTMLElement;
        if (!child) {
            return
        }
        child.style.display = 'none';
    }
}