// import { mixUrl } from './request';

// class Wechat {
//   constructor(appid) {
//     this.appid = appid;
//   }
//   authorize() {
//     const wxPrefix = 'https://open.weixin.qq.com/connect/oauth2/authorize';
//     const wxParams = {
//       appid: this.appid,
//       redirect_uri: encodeURIComponent(location.href),
//       response_type: 'code',
//       // scope: 'snsapi_base'
//       scope: 'snsapi_login',
//       // state: ''
//     };
//     const wxSuffix = '#wechat_redirect';
//     const wxUrl = `${mixUrl(wxPrefix, wxParams, true)}${wxSuffix}`;
//     location.href = wxUrl;
//   }
//   accessToken() {

//   }


// }
