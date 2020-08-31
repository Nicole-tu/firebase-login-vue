export const url = {
  baseUrl: process.env.BASEURL
};

export const apiVer = {
  ver: process.env.APIVER || "api/v1"
};

const constants = {
  url,
  apiVer
};

export {
  constants as
    default
};
