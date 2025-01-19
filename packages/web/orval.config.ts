import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:5001/api/swagger/v1/swagger.json',
      validation: false,
    },
    output: {
      mode: 'split',
      target: './src/api/hooks',
      schemas: './src/api/models',
      client: 'react-query',
      prettier: true,
      override: {
        mutator: {
          path: './src/api/client.ts',
          name: 'customClient',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'pageNumber',
          options: {
            staleTime: 10000,
          }
        },
        components: {
          schemas: {
            suffix: 'DTO'
          }
        }
      },
    },
  },
});