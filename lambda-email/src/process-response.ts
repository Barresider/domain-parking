export function processResponse(isCors: boolean, body?: string | object, statusCode?: number) {
  const status = statusCode || (body ? 200 : 204);
  const headers: any = { 'Content-Type': 'application/json' };
  if (isCors) {
    Object.assign(headers, {
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,POST',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Max-Age': '86400'
    });
  }
  return {
    statusCode: status,
    body: JSON.stringify(body) || '',
    headers: headers
  };
};