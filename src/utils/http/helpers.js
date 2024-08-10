// const isConfirming = false;
export function resolveResError(code, message) {
  switch (code) {
    case 401:
      return false;
    case 11007:
    case 11008:
      return false;
    case 403:
      message = '请求被拒绝';
      break;
    case 404:
      message = '请求资源或接口不存在';
      break;
    case 500:
      message = message ?? '服务器发生异常';
      break;
    default:
      message = message ?? `【${code}】: 未知异常!`;
      break;
  }
  return message;
}
