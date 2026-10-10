const API_BASE_URL = 'https://api.api-store.workers.dev/api/bazardor';

export async function fetchBazarCollection(resource) {
    const res = await fetch(`${API_BASE_URL}/${resource}`, {
        next: { revalidate: 300 },
    });

    if (res.status === 429) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Failed to load ${resource}: ${res.status}`);
    }

    if (!res.headers.get('content-type')?.includes('application/json')) {
        throw new Error(`The ${resource} API returned a non-JSON response.`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
        throw new Error(`The ${resource} API returned an invalid response.`);
    }

    return data;
}
