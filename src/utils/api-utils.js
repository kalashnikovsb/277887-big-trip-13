const getClientOptions = (serverOptions) => {
  let clientOptions = [];

  if (serverOptions.length === 0) {
    return clientOptions;
  }

  for (let serverOption of serverOptions) {
    let clientOption = {
      name: serverOption.title,
      price: serverOption.price,
    };
    clientOptions.push(Object.assign({}, clientOption));
  }

  return clientOptions;
};


const getServerOptions = (clientOptions) => {
  let serverOptions = [];

  if (clientOptions.length === 0) {
    return serverOptions;
  }

  for (let clientOption of clientOptions) {
    let serverOption = {
      title: clientOption.name,
      price: clientOption.price,
    };
    serverOptions.push(Object.assign({}, serverOption));
  }

  return serverOptions;
};


export {getClientOptions, getServerOptions};
