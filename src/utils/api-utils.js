const getClientOptions = (serverOptions) => {
  let clientOptions = [];

  if (serverOptions.length === 0) {
    return clientOptions;
  }

  for (let serverItem of serverOptions) {
    let clientItem = {
      name: serverItem.title,
      price: serverItem.price,
    };
    clientOptions.push(Object.assign({}, clientItem));
  }

  return clientOptions;
};


const getServerOptions = (clientOptions) => {

};


const getClientPhotos = (serverPhotos) => {

};


export {getClientOptions, getClientPhotos};
