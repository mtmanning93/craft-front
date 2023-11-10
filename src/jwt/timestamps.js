import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
    const refreshToken = data?.refresh_token;
    if (refreshToken) {
        const refreshTokenTimestamp = jwtDecode(refreshToken).exp;
        localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
    }
}

export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp")
}

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp")
}