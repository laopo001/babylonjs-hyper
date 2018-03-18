export function sleep(time) {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time)
    })
}

// export function setTimeout(time) {
//     new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(true);
//         }, time)
//     })
// }

export const util = {
    sleep(time) {
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time)
        })
    },
    setTimeout(time) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            let oldValue = descriptor.value;
            let b = false;
            let newValue = function () {
                if (!b) {
                    b = true;
                    setTimeout(() => { b = false }, time)
                    return oldValue.apply(this, arguments);
                }
            }
            descriptor.value = newValue;
        }

    }
}