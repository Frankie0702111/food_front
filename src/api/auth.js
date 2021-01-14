import request from '@/utils/request';

export function captcha() {
    return request({
      url: '/captcha/math',
      method: 'get',
    });
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data,
  });
}

export function getInfo() {
  return request({
    url: '/auth',
    method: 'get',
  });
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  });
}

export function refresh() {
  return request({
    url: '/refresh',
    method: 'get',
  });
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data: data,
  });
}

export function change_password(data) {
  return request({
    url: '/change_password',
    method: 'put',
    data: data,
  });
}