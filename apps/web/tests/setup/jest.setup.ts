import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextEncoder, TextDecoder });

if (typeof global.Request === 'undefined') {
    global.Headers = class Headers {
        private map = new Map<string, string>();
        constructor(init?: any) {
            if (init) {
                if (typeof init.forEach === 'function') {
                    init.forEach((v: string, k: string) => this.map.set(k.toLowerCase(), v));
                } else {
                    Object.entries(init).forEach(([k, v]) => {
                        this.map.set(k.toLowerCase(), String(v));
                    });
                }
            }
        }
        get(name: string) { return this.map.get(name.toLowerCase()) || null; }
        set(name: string, value: string) { this.map.set(name.toLowerCase(), value); }
        has(name: string) { return this.map.has(name.toLowerCase()); }
        delete(name: string) { this.map.delete(name.toLowerCase()); }
        forEach(callback: (value: string, key: string) => void) { this.map.forEach(callback); }
    } as any;

    global.Request = class Request {
        url: string;
        headers: Headers;
        constructor(input: string | Request, init?: any) {
            this.url = typeof input === 'string' ? input : input.url;
            this.headers = new Headers(init?.headers);
        }
    } as any;
}
