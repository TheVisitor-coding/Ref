function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Partial<T> {
    const out: Partial<T> = {};
    for (const k of keys) out[k] = obj[k];
    return out;
}

function diffChanges<T extends Record<string, any>>(before: T, after: T, keys: (keyof T)[]) {
    const old_values: Record<string, any> = {};
    const new_values: Record<string, any> = {};
    for (const k of keys) {
        const b = before[k as string];
        const a = after[k as string];
        const changed =
            (b === null || typeof b === 'undefined') && (a === null || typeof a === 'undefined')
                ? false
                : JSON.stringify(b) !== JSON.stringify(a);
        if (changed) {
            old_values[k as string] = b;
            new_values[k as string] = a;
        }
    }
    return { old_values, new_values };
}
export { diffChanges, pick };