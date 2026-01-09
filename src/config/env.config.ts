type EnvConfig = {
  baseUrl: string;
};
 
const env = process.env.ENV || "qa";
 
const config: Record<string, EnvConfig> = {
  qa: {
    baseUrl: "https://devbscdocs.elexon.co.uk/"
  },
  uat: {
    baseUrl: "https://testbscdocs.elexon.co.uk"
  },
  prod: {
    baseUrl: "https://bscdocs.elexon.co.uk/"
  }
};
 
export const envConfig = config[env];