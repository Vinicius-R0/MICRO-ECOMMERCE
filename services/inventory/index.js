import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import products from '.products.json';

const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
  keepCase: true,//manter estilo case original do .proto
  longs: String,//converte valores longos para string
  enums: String,//converte valores enums para string
  arrays: true,//garante que campos repetidos sejam arrays
});

//constroi o objeto do pacote grpc a partir da defiunição carregada
const inventoryProto = grpc.loadPackageDefinition(packageDefinition).inventory;

//cria um novo servidor gRPC
const server = new grpc.Server();

//registra o serviço de inventário(InventoryService) no servidor
server.addService(inventoryProto.InventoryService.service, {
  //implementa o método serachAllProducts, ignora o request(_) e retorna lista de produtos
  searchAllProducts: (_, callback) => {
    callback(null, { 
      products: products,
     });
  },
});

//inicia o servidor gRPC na porta 3002 e exibe mensagem de status
server.bindAsync('127.0.0.1:3002', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Inventory Service running on port 3002');
  server.start();
});