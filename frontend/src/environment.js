let IS_PROD = true;
const server = IS_PROD ?
    "https://video-conferencing-appbackend.onrender.com" :

    "http://localhost:8000"


export default server;