type ValueMap = Record<string, unknown>;

function pick<T extends ValueMap, K extends keyof T>(obj: T, keys: ReadonlyArray<K>): Pick<T, K> {
    const out = {} as Pick<T, K>;
    for (const key of keys) {
        out[key] = obj[key];
    }
    return out;
}

function diffChanges<T extends ValueMap, K extends keyof T>(before: Pick<T, K>, after: Pick<T, K>, keys: ReadonlyArray<K>) {
    const old_values: ValueMap = {};
    const new_values: ValueMap = {};
    for (const key of keys) {
        const previous = before[key];
        const next = after[key];
        const changed =
            (previous === null || typeof previous === 'undefined') && (next === null || typeof next === 'undefined')
                ? false
                : JSON.stringify(previous) !== JSON.stringify(next);
        if (changed) {
            old_values[String(key)] = previous;
            new_values[String(key)] = next;
        }
    }
    return { old_values, new_values };
}
export { diffChanges, pick };