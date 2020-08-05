import wretch from 'wretch';

let wr = wretch();

export function setBaseURL(url = '') {
  wr = wr.url(url.replace(/\/$/, ''), true);
}

export function getPkgs() {
  return wr.url('/api/v2/packages')
    .get()
    .json();
}

export function getPkg(name) {
  return wr.url(`/api/v2/packages/${name}`)
    .get()
    .json();
}

export function getPkgLog(name, timestamp) {
  return wr.url(`/api/v2/packages/${name}/logs/${timestamp}`)
    .get()
    .text();
}

