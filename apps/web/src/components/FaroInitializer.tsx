"use client";

import { useEffect } from "react";
import { initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export default function FaroInitializer() {
    useEffect(() => {
        if (
            process.env.NEXT_PUBLIC_FARO_URL &&
            process.env.NEXT_PUBLIC_FARO_APP_ID
        ) {
            initializeFaro({
                url: process.env.NEXT_PUBLIC_FARO_URL,
                app: {
                    name: "ref-web",
                    version: "1.0.0",
                    environment: process.env.NODE_ENV,
                },
                instrumentations: [
                    // Mandatory, instigates the core web-vitals instrumentation
                    // ...getWebInstrumentations(),

                    // Optional, instigates the tracing instrumentation
                    new TracingInstrumentation(),
                ],
            });
        }
    }, []);

    return null;
}
