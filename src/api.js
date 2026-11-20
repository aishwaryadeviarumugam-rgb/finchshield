const API_BASE = "http://127.0.0.1:8000/api";

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}

export const api = {
    health: () => request("/health"),

    overview: () => request("/overview"),

    integrations: () => request("/integrations"),

    risks: () => request("/risks"),

    alerts: () => request("/alerts"),

    timeline: () => request("/timeline"),

    harden: (id) =>
        request(`/integrations/${encodeURIComponent(id)}/harden`, {
            method: "POST"
        }),

    hardenAll: () =>
        request("/integrations/harden-all", {
            method: "POST"
        }),

    simulateAttack: () =>
        request("/simulate-attack", {
            method: "POST"
        }),

    detect: (record) =>
        request("/detect", {
            method: "POST",
            body: JSON.stringify({ record })
        })
};