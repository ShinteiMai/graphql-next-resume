export interface PaginationResult<T> {
  data: T[];
  cursor: {
    afterCursor?: string;
    beforeCursor?: string;
  };
}