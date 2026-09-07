type ApiOk<T> = { ok: true; data: T };
type ApiFail = { ok: false; error: { code?: string; message?: string } };
type ApiResult<T> = ApiOk<T> | ApiFail;

export class ApiError extends Error {
    code?: string;
    constructor(message: string, code?: string) {
        super(message);
        this.code = code;
    }
}

async function request<T>(
    method: "GET" | "POST",
    path: string,
    body?: unknown,
): Promise<T> {
    const res = await fetch(path, {
        method,
        credentials: "include", // 固定带上，页面不用管
        headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const json = (await res.json()) as ApiResult<T>;
    if (!json.ok) {
        throw new ApiError(json.error?.message ?? "请求失败", json.error?.code);
    }
    return json.data;
}

/** GET：只传路径，可选 query */
export function getRequest<T>(
    path: string,
    query?: Record<string, string | number | undefined | null>,
) {
    let url = path;
    if (query) {
        const qs = new URLSearchParams();
        for (const [k, v] of Object.entries(query)) {
            if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
        }
        const s = qs.toString();
        if (s) url += (path.includes("?") ? "&" : "?") + s;
    }
    return request<T>("GET", url);
}

/** POST：只传路径 + 参数对象 */
export function postRequest<T>(path: string, data?: Record<string, unknown>) {
    return request<T>("POST", path, data ?? {});
}