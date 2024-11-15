import elasticClient from '../../search-video-services/elastic/elasticClient.js';

export const search = async (query) => {
  const searchParams = {
    index: 'videos',
    size: 30,
    // from: 1,
    query: {},
  };

  if (query) {
    searchParams.query = {
      multi_match: {
        query,
        fields: ['title', 'description', 'category', 'uploader']
      }
    };
  } else {
    searchParams.query = {
      // random_score: { seed: 'random' },
      match_all: {}
    };
  }

  try {
    const response = await elasticClient.search(searchParams);

    // Log respons dari Elasticsearch untuk memastikan `body` ada
    console.log(response);

    // Cek apakah `body` dan `hits` tersedia di dalam response
    if (response && response.hits) {
      return response.hits.hits.map(hit => hit._source);
    } else {
      // Jika tidak ada hits, kembalikan array kosong
      return [];
    }
  } catch (error) {
    console.error("Elasticsearch query error:", error);
    throw new Error("Error querying Elasticsearch");
  }
};

export const searchByTitleForRecommendation = async (query) => {
  console.log(query);
  
  const searchParams = {
    index: 'videos',
    size: 30,
    // from: 1,
    query: {},
  };
  if (query) {
    searchParams.query = {
      match_phrase_prefix: {
        title: query
      }
    };
  }

  try {
    const response = await elasticClient.search(searchParams);

    // Log respons dari Elasticsearch untuk memastikan `body` ada
    console.log(response, "bejir");
    return response.hits.hits.map(hit => hit._source);
  } catch (error) {
    console.error("Elasticsearch query error:", error);
    throw new Error("Error querying Elasticsearch");
  }
}

export const searchById = async (id) => {
  try {
    const response = await elasticClient.get({ index: 'videos', id });
    console.log({ response });

    return response._source;
  } catch (error) {
    console.error("Elasticsearch query error:", error);
    return null;
  }
};

