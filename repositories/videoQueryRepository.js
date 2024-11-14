import elasticClient from '../elastic/elasticClient.js';

export const search = async (query) => {
  const { body } = await elasticClient.search({
    index: 'videos',
    query: {
      multi_match: {
        query,
        fields: ['title', 'description', 'category', 'uploader']
      }
    }
  });

  return body.hits.hits.map(hit => hit._source);
};
