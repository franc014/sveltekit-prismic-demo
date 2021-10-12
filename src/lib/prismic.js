import prismic from '@prismicio/client';
const apiEndpoint = "https://blogfunvidasuperior.cdn.prismic.io/api/v2";

const Client = prismic.client(apiEndpoint);

export default Client;
