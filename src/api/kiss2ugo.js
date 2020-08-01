import wretch from 'wretch';

let wr = wretch();

//export function setBaseURL(url = '') {
//  wr = wr.url(url.replace(/\/$/, ''), true);
//}

//let confProm;
/** @returns {Promise<SDWC.Config>} */
export function getPkgs() {
  //if (confProm) return confProm;
  //return confProm = wr.url('/config.json')
  return wr.url('https://build.archlinuxcn.org/api/v2/packages')
    .get()
    .json();
}
