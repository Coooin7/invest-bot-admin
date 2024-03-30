import { type Directive, type DirectiveBinding, type Plugin } from 'vue'
const elements: HTMLElement[] = [];

export const animateInOut: Plugin = {
    install(app) {
        app.directive('inout', directive);
    },
}

const directive: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        el.setAttribute('data-class', binding.value);
        elements.push(el);
    },
    beforeUnmount(el: HTMLElement) {
        elements.forEach((e, i) => {
            if (e === el) {
                elements.splice(i, 1);
                return;
            }
        })
    }
}

export async function scrollHandler() {
    for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const className = el.getAttribute('data-class');

        if (!className) {
            continue;
        }
        if (rect.y < window.innerHeight && rect.y > 0) {
            el.classList.add(className);
        } else if (rect.y < rect.height * -1 || rect.y > window.innerHeight) {
            el.classList.remove(className);
        }

    }
}