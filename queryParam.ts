// Example usage:
interface BaseEntity {
  id: number;
  ts: Date;
}

interface MyEntity extends BaseEntity {
  name: string;
  active: boolean;
  DateCreated: Date;
}

type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
// Type for query parameters now requires at least one key from MyEntity
type QueryParams<Entity extends BaseEntity> = AtLeastOne<Entity>;

/**
 * Converts an object of query parameters into a query string.
 * @param params - The object containing the query parameters.
 * @returns The generated query string.
 */
function toQueryString<T extends BaseEntity>(params: Partial<QueryParams<T>>): string {
  if (Object.keys(params).length === 0) {
    return ''; // Early return for empty input
  }

  return Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null) // Filter out undefined values
      .map(([key, value]) => {
          const stringValue = value instanceof Date ? value.toISOString() : value.toString();
          return `${encodeURIComponent(key)}=${encodeURIComponent(stringValue)}`;
      })
      .join('&');
}


const queryParams: QueryParams<MyEntity> = {
  id: 1,
  name: "R2-D2",
};



// Using the queryParams object from above
const queryString = toQueryString(queryParams);
console.log(queryString);

