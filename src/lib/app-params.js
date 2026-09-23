
const isNode = typeof window === 'undefined';

const getAccessToken = () => {
	if (isNode) return null;
	try {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get("access_token");
		if (token) return token;
		return window.localStorage.getItem('base44_access_token') || window.localStorage.getItem('token') || null;
	} catch (e) {
		return null;
	}
};

const isClearAccessTokenRequested = () =>
	!isNode && new URLSearchParams(window.location.search).get("clear_access_token") === 'true';

const clearStoredAccessToken = () => {
	if (isNode) return;
	try {
		window.localStorage.removeItem('base44_access_token');
		window.localStorage.removeItem('token');
	} catch (e) {}
}

const getAppParams = () => {
	if (isClearAccessTokenRequested()) {
		clearStoredAccessToken();
	}
	return {
		appId: import.meta.env.VITE_BASE44_APP_ID,
		token: getAccessToken(),
		functionsVersion: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION,
		appBaseUrl: import.meta.env.VITE_BASE44_APP_BASE_URL,
	}
}

export const appParams = {
	...getAppParams()
}
