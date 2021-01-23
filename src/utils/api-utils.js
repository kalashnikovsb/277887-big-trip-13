const getClientOptions = (serverOptions) => {
  const clientOptions = [];

  if (serverOptions.length === 0) {
    return clientOptions;
  }

  for (const serverOption of serverOptions) {
    const clientOption = {
      name: serverOption.title,
      price: serverOption.price,
    };
    clientOptions.push(Object.assign({}, clientOption));
  }

  return clientOptions;
};


const getServerOptions = (clientOptions) => {
  const serverOptions = [];

  if (clientOptions.length === 0) {
    return serverOptions;
  }

  for (const clientOption of clientOptions) {
    const serverOption = {
      title: clientOption.name,
      price: clientOption.price,
    };
    serverOptions.push(Object.assign({}, serverOption));
  }

  return serverOptions;
};


export {getClientOptions, getServerOptions};
