/**
 * @author dadigua
 */
export function sleep(time) {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}
export function debounce(time) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        let oldValue = descriptor.value;
        let b = false;
        let newValue = function () {
            if (!b) {
                b = true;
                setTimeout(() => { b = false; }, time);
                return oldValue.apply(this, arguments);
            }
        };
        descriptor.value = newValue;
    };
}

export function randomEnum<T = any>(...arg): T {
    let len = arg.length;
    let random = Math.random() * len;
    for (let i = 0; i < len; i++) {
        if (random >= i && random < i + 1) {
            return arg[i];
        }
    }
}
export function randomRange(a, b): number {
    let min = a, max = b;
    if (a > b) {
        max = a; min = b;
    }
    let subtraction = max - min;
    return min + subtraction * Math.random();
}
