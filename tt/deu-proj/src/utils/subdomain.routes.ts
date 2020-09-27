import { MAIN_DOMAIN, PROTOCOL } from "./constants";

type CommonOptions = {
  path?: string,
  scheme?: string,
};

type OptionsGet = {
  action: 'getUrl';
} & CommonOptions;

type OptionsPush = {
  action: 'pushUrl';
} & CommonOptions;

function subDomainUrl(opt: OptionsGet): string;
function subDomainUrl(opt: OptionsPush): void;
function subDomainUrl(opt: any): any {
  const {
    action,
    path,
    scheme,
  } = opt;
  let url = `${PROTOCOL}://${MAIN_DOMAIN}${path}`;
  if (scheme) {
    url = `${PROTOCOL}://${scheme.toLowerCase()}.${MAIN_DOMAIN}${path}`
  }
  if (action === 'getUrl') {
    return url
  }
  if (action === 'pushUrl') {
    window.location.href = url;
  }
}

export default subDomainUrl;
