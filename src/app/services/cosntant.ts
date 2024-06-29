
let IsPrerelase = 0;
const PreReleaaseURL = "https://1228-148-255-191-208.ngrok-free.app";
const LocalHostURL = "http://localhost:5000";

export const BaseUrl = `${(IsPrerelase === 1? PreReleaaseURL:LocalHostURL)}/api/v1`;